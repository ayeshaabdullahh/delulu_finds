export function sourceBadgeClass(source: string): string {
  const s = source.toLowerCase();
  if (s.includes('awin')) return 'source-awn';
  if (s.includes('impact')) return 'source-imp';
  if (s.includes('mavrly')) return 'source-mvr';
  if (s.includes('daraz')) return 'source-drz';
  return 'source-drz';
}

export function sourceLabel(source: string): string {
  const s = source.toLowerCase();
  if (s.includes('awin')) return 'AWN';
  if (s.includes('impact')) return 'IMP';
  if (s.includes('mavrly')) return 'MVR';
  if (s.includes('daraz')) return 'DRZ';
  return source;
}
