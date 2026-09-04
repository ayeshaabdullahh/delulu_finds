// Parses price strings into a number, handling formats such as:
//  - "$49", "49.99", "49"
//  - European "1.299,00" / "1299,00"
//  - Multiple-dot thousands "1.299.00"
// Falls back to stripping non-numeric chars if the format is ambiguous.
export function parsePrice(raw: string | null | undefined): number {
  if (!raw) return 0;
  const trimmed = String(raw).trim();
  if (!trimmed) return 0;

  // If there's a comma but no dot, treat comma as decimal separator (EU format)
  if (trimmed.includes(',') && !trimmed.includes('.')) {
    const n = parseFloat(trimmed.replace(/[^0-9,]/g, '').replace(',', '.'));
    return isNaN(n) ? 0 : n;
  }

  // Multiple dots: keep the last dot as decimal, strip the rest (thousands)
  const numericPart = trimmed.replace(/[^0-9.]/g, '');
  const dots = numericPart.split('.');
  if (dots.length > 2) {
    const last = dots.pop() ?? '';
    const joined = dots.join('') + '.' + last;
    const n = parseFloat(joined);
    return isNaN(n) ? 0 : n;
  }

  const n = parseFloat(numericPart);
  return isNaN(n) ? 0 : n;
}
