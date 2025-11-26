import { HTMLElement } from "node-html-parser";
import type { ParsedProduct as Product } from "../types";

export function getProductsOnPage(document: HTMLElement): Product[] {
  const rows = document.querySelectorAll('tr.js-product');
  const products: Product[] = [];

  for (const row of rows) {
    const cols = row.querySelectorAll('td');
    if (cols.length < 2) continue;

    const name = cols[0].text.trim();
    const priceText = cols[1].text.trim()
      .replace(/\s/g, '')
      .replace(',', '.')

    const price = parseFloat(priceText);
    if (!isNaN(price)) {
      products.push({ name, price });
    }
  }

  return products;
}
