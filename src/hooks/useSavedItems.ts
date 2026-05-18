import { useState, useEffect, useCallback } from 'react';
import { getSavedProductIds, saveProduct, unsaveProduct } from '../lib/supabase';

export function useSavedItems() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const ids = await getSavedProductIds();
      setSavedIds(new Set(ids));
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggleSave = useCallback(async (productId: string) => {
    const isSaved = savedIds.has(productId);
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
    return !isSaved;
  }, [savedIds]);

  return { savedIds, toggleSave, loading, refresh };
}
