import { getCookies } from "./get-cookies";
import { getTotalPages } from "./get-total-pages";
import { getPageContent } from "./get-page-content";
import { getProductsOnPage } from "./get-products-from-page";

import { logger } from "@shared/logger";

export const getCookieLogger = logger(
  getCookies,
  () => "Cookies read successfully"
);

export const getPageContentLogger = logger(
  getPageContent,
  ({ args, timing }) => {
    const page = args[1];
    const durationSec = timing.duration / 1000;

    return `[${timing.end}] Page #${page} read in ${durationSec} seconds`;
  }
);

export const getTotalPagesLogger = logger(
  getTotalPages,
  ({ result: pages }) => `Found ${pages} pages to parse`
);

export const getProductsOnPageLogger = logger(
  getProductsOnPage,
  ({ result: products }) => `Found ${products.length} products`
);
