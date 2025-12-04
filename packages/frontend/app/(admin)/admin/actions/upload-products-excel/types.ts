import { products } from "@db/schema"
import type { Insertable, InsertableDb, Selectable } from "@db/types/utils"


export type InsertableProduct = Insertable<typeof products>;
export type InsertableProductDb = InsertableDb<typeof products>;
export type SelectedProduct = Selectable<typeof products>;

export type ParsedProduct = Omit<InsertableProduct, 'productId'>
