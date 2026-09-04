import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { getSavedProductIds, saveProduct, unsaveProduct } from '../lib/supabase';

interface SavedItemsContextValue {
  savedIds: Set<string>;
  toggleSave: (productId: string) => Promise<boolean | undefined>;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SavedItemsContext = createContext<SavedItemsContextValue | null>(null);

export function SavedItemsProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const pendingOps = useRef<Map<string, Promise<void>>>(new Map());

  const refresh = useCallback(async () => {
    try {
      const ids = await getSavedProductIds();
      setSavedIds(new Set(ids));
    } catch {
      setSavedIds(new Set());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggleSave = useCallback(async (productId: string) => {
    const existing = pendingOps.current.get(productId);
    if (existing) {
      await existing;
      return;
    }

    const isSaved = savedIds.has(productId);
    const op = (async () => {
      if (isSaved) {
        await unsaveProduct(productId);
        setSavedIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      } else {
        await saveProduct(productId);
        setSavedIds((prev) => {
          const next = new Set(prev);
          next.add(productId);
          return next;
        });
      }
    })();

    pendingOps.current.set(productId, op);
    try {
      await op;
    } finally {
      pendingOps.current.delete(productId);
    }
    return !isSaved;
  }, [savedIds]);

  return (
    <SavedItemsContext.Provider value={{ savedIds, toggleSave, loading, refresh }}>
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems(): SavedItemsContextValue {
  const ctx = useContext(SavedItemsContext);
  if (!ctx) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return ctx;
}
