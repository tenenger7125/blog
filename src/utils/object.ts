export const omitObjectEmptyValues = <T extends object>(obj: T): Partial<T> =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== '' && v !== undefined && v !== null)) as Partial<T>;
