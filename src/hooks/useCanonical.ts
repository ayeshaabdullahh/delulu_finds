import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://delulufinds.me';

export function useCanonical() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const canonicalUrl = SITE_URL + pathname + search;
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);
  }, [pathname, search]);
}
