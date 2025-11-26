import {
  getCookieLogger,
  getPageContentLogger,
  getTotalPagesLogger,
  getProductsOnPageLogger,
} from "./loggers";
import type { ParsedProduct } from "../types";
import { getEnvVar } from '@shared/env-loader';

const pagesToParseEnv = Number(getEnvVar('PAGES_TO_PARSE'));

export async function scrape(
  handleProductsBatch?: (products: ParsedProduct[]) => Promise<void> | void
) {
  const cookies = await getCookieLogger();
  const doc = await getPageContentLogger(cookies, 1);
  const totalPages = getTotalPagesLogger(doc);

  const numberOfPagesToParse = Math.min(totalPages, pagesToParseEnv);

  for (let i = 1; i <= numberOfPagesToParse; i++) {
    const pageDoc = await getPageContentLogger(cookies, i);
    const products = getProductsOnPageLogger(pageDoc);

    await handleProductsBatch?.(products);
  }
}
