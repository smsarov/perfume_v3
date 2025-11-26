import { upsert } from "@db/helpers/upsert";
import { productVariants as pvTable } from "@db/schema";
import { db } from "packages/backend/common/db";
import type { InsertableProductVariant } from "../types";


export async function upsertProductVariants(items: InsertableProductVariant[]) {
  if(!items.length) return;
  return await upsert(db, pvTable, items, "rawName");
}
