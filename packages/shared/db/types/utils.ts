import { PgTable } from "drizzle-orm/pg-core";
import type { InferInsertModel } from "drizzle-orm";

export type Insertable<T extends PgTable> = T["$inferInsert"];
export type Selectable<T extends PgTable> = T["$inferSelect"];

export type InsertableDb<T extends PgTable> = InferInsertModel<T, {dbColumnNames: true}>

export type Column<T extends PgTable> = keyof InferInsertModel<T>;
export type ColumnDb<T extends PgTable> = keyof InferInsertModel<T, {dbColumnNames: true}>;
