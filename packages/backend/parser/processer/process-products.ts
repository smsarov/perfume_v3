import type { ParsedProduct } from "../types";
import { processProduct } from "./process-product";

type ProcessedProduct = ReturnType<typeof processProduct>;

export function processProducts(products: ParsedProduct[]) {
  const lowestPrices = products.reduce<Map<string, ProcessedProduct>>(
    (map, product) => {
      const existing = map.get(product.name);

      if (!existing) {
        const processed = processProduct(product);
        map.set(product.name, processed);
      } else {
        existing.price = Math.min(existing.price, product.price);
      }

      return map;
    },
    new Map()
  );

  return Array.from(lowestPrices.values());
}
