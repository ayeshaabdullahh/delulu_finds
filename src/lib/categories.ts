export const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All', value: 'All' },
  { label: 'Clothes', value: 'Clothing' },
  { label: 'Shoes', value: 'Shoes' },
  { label: 'Bags', value: 'Bags' },
  { label: 'Beauty', value: 'Beauty' },
  { label: 'Scarves', value: 'Scarves' },
];

export const NAV_CATEGORIES = CATEGORIES.filter((c) => c.value !== 'All');
