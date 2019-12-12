export const normalizeMinutes = (n: number) => {
  const h = n / 60;
  return `${Math.floor(h)}h ${Math.round((h - Math.floor(h)) * 60)}min`;
};
