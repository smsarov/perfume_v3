import { scrape } from "./scraper";
import { processProducts } from "./processer";
import { upsertProductVariants } from "./utils/upsert-product-variants";
import { findProductVariantsByNames } from "./utils/find-variant-by-name";
import { ParsingStats } from "./utils/stats";
import { markOutOfStock } from "./utils/mark-out-of-stock";
import { Mailer } from "./mailer";
import { getEnvVar } from '@shared/env-loader';

const reveiver = getEnvVar('EMAIL_RECEIVER')
const subject = "Отчет о парсинге";

export async function parse() {
  const stats = new ParsingStats();
  await markOutOfStock();

  await scrape(async (products) => {
    stats.totalPages += 1;
    stats.totalProducts += products.length;

    const processed = processProducts(products);

    const existing = await findProductVariantsByNames(
      processed.map((p) => p.rawName)
    );
    
    const existingMap = new Map(existing.map((p) => [p.name, p]));
    stats.newProducts += processed.length - existing.length;
    stats.updatedProducts += existing.length;

    const productsToInsert = processed.map((p) => {
      const existingProduct = existingMap.get(p.rawName);
      const existingInStock = existingProduct?.isInStock;

      if (existingInStock) {
        const price = Math.min(existingProduct.price, p.price);
        return { ...p, price, isInStock: 1 };
      }

      return { ...p, isInStock: 1 };
    });

    const newProducts = processed.filter((p) => !existingMap.has(p.rawName)).map(p => p.rawName);
    stats.addNewProducts(newProducts);

    await upsertProductVariants(productsToInsert);
  });

  const message = stats.createReportMessage();
  await Mailer.sendEmailLogger(reveiver, subject, message);
}
