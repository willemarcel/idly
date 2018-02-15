import { Identity as I } from 'monet';
import { mapFilterValuesIntoArray, setAddIterable, setCreate } from '../helper';
import { Table, tableGet, tableRemove, tableUpdate } from '../table/regular';

export type OneToManyTable<T> = Table<Set<T>>;
export const oneToManyTableCreate = <T>(): OneToManyTable<T> => new Map();

export const oneToManyTableRemove = <T>(
  table: OneToManyTable<T>,
  index: string
) => tableRemove(index, table);

export const oneToManyTableRemoveIndex = <T>(
  table: OneToManyTable<T>,
  index: string,
  value: T
): boolean | undefined =>
  I(tableGet(index, table))
    .map(s => s && s.delete(value))
    .get();

export const oneToManyTableInsert = <T>(
  table: OneToManyTable<T>,
  index: string,
  value: T
): OneToManyTable<T> =>
  tableUpdate((s = setCreate()) => s.add(value), index, table);

export const oneToManyTableUpdateIndex = <T>(
  table: OneToManyTable<T>,
  index: string,
  value: T[]
): OneToManyTable<T> =>
  tableUpdate((s = setCreate()) => setAddIterable(value, s), index, table);

export const oneToManyTableFilter = <T>(
  foo: ((v: Set<T>, k: string) => boolean),
  table: OneToManyTable<T>
) => mapFilterValuesIntoArray(foo, table);
