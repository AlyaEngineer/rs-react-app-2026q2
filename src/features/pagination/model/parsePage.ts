export function parsePage(raw: string | null | undefined): number {
  const page = Number(raw);
  return Number.isFinite(page) && page > 0 ? page : 1;
}
