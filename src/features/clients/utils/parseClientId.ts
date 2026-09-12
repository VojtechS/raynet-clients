export function parseClientId(value: string | null): number | null {
  const id = Number(value);

  return Number.isInteger(id) && id > 0 ? id : null;
}
