import { getTableColumns } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import type { Column, ColumnDb } from "../types/utils";

export function getJsToDbMap<T extends PgTable>(table: T) {
  const columns = getTableColumns(table);
  const result: Record<string, string> = {};

  for (const [jsName, column] of Object.entries(columns)) {
    result[jsName] = column.name;
  }

  return result as Record<Column<T>, ColumnDb<T>>;
}

export function getDbToJsMap<T extends PgTable>(table: T) {
  const columns = getTableColumns(table);
  const result: Record<string, string> = {};

  for (const [jsName, column] of Object.entries(columns)) {
    result[column.name] = jsName;
  }

  return result as Record<ColumnDb<T>, Column<T>>;
}
