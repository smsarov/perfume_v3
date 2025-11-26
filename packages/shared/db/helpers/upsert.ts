import { getTableColumns, sql, type SQL } from "drizzle-orm";
import type { PgTable, PgDatabase } from "drizzle-orm/pg-core";

export async function upsert<
  T extends PgTable,
  K extends keyof T["$inferSelect"] = keyof T["$inferSelect"]
>(
  db: PgDatabase<any>,
  table: T,
  values: T["$inferInsert"][],
  conflictTarget: K | K[]
) {
  const columns = getTableColumns(table);

  const set: Record<string, SQL> = {};
  const targets = Array.isArray(conflictTarget)
    ? conflictTarget
    : [conflictTarget];

  for (const [prop, col] of Object.entries(columns)) {
    if (!targets.includes(prop as K)) {
      set[prop] = sql`excluded.${sql.identifier(col.name)}`;
    }
  }

  const targetCols = targets.map((t) => columns[t as string]);

  return db
    .insert(table)
    .values(values)
    .onConflictDoUpdate({
      target: targetCols.length === 1 ? targetCols[0] : targetCols,
      set,
    });
}
