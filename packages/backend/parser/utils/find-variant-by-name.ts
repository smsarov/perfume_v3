import { db } from "../../common/db";
import { inArray } from "drizzle-orm";
import { productVariants as pvTable } from "@db/schema";

export async function findProductVariantsByNames(names: string[]) {
  if (names.length === 0) return [];

  const existing = await db
    .selectDistinct({
      name: pvTable.rawName,
      price: pvTable.price,
      isInStock: pvTable.isInStock,
    })
    .from(pvTable)
    .where(inArray(pvTable.rawName, names));

  return existing;
}
