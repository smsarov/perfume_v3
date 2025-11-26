import { InsertableDb, Insertable, Selected } from '../db/types';
import { products } from '../drizzle/schema';

export type InsertableProductDb = InsertableDb<typeof products>
export type InsertableProduct = Insertable<typeof products>
export type SelectedProduct = Selected<typeof products>
export type ParsedProduct = Omit<InsertableProduct, 'productId'>
