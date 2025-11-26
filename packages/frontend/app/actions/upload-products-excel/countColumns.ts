import type { InsertableProduct } from "./types";

const columnsToCount: (keyof InsertableProduct)[] = [
  "brand",
  "productLine",
  "productType",
  "segment",
  "manufacturer",
  "perfumer",
  "year",
  "gender",
  "topNotes",
  "heartNotes",
  "baseNotes",
  "description",
  "photoUrl",
  "aromaNotes",
];

export function countColumns(row: any): number {
  return columnsToCount.reduce(
    (acc, name) => row[name] === undefined || row[name] === null ? acc + 1 : acc,
    0
  );
}
