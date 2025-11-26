import { productVariants } from "@db/schema";
import type { Insertable } from "@db/types/utils";

export interface ParsedProduct {
  name: string;
  price: number;
}

export type InsertableProductVariant = Insertable<typeof productVariants>;
export type ProcessedProductVariant = Omit<InsertableProductVariant, 'isInStock'>;
