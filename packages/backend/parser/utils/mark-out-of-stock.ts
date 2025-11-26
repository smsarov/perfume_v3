import { db } from "../../common/db";
import { productVariants } from '@db/schema';

export async function markOutOfStock(){
    await db.update(productVariants).set({ 'isInStock': 0 });
}