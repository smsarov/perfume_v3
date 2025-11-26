import { relations } from "drizzle-orm/relations";
import { products, productVariants } from "./schema";

export const productVariantsRelations = relations(productVariants, ({one}) => ({
	product: one(products, {
		fields: [productVariants.productId],
		references: [products.productId]
	}),
}));

export const productsRelations = relations(products, ({many}) => ({
	productVariants: many(productVariants),
}));