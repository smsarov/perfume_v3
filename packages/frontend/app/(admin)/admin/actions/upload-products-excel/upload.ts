import ExcelJS from "exceljs";
import { and, eq, sql } from "drizzle-orm";

import { getDbToJsMap } from "@db/helpers/get-columns-map";
import { upsert } from "@db/helpers/upsert";
import { products } from "@db/schema";
import { db } from "@app/lib/db";

import { countColumns } from "./countColumns";
import { processRow } from "./process-row";

import type {
  InsertableProductDb,
  InsertableProduct,
  SelectedProduct,
  ParsedProduct,
} from "./types";

const dbToJsMap = getDbToJsMap(products);

async function findMaxId() {
  const result = await db
    .select({
      maxId: sql<number>`MAX(${products.productId}::int)`,
    })
    .from(products);

  return result[0]?.maxId ?? 0;
}

async function findExistingProduct(
  brand: string,
  line: string,
  type: string
): Promise<SelectedProduct | undefined> {
  const product = (
    await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.brand, brand),
          eq(products.productLine, line),
          eq(products.productType, type)
        )
      )
      .limit(1)
  )[0];

  return product;
}

export async function uploadProductExcel(file: File) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const workbook = new ExcelJS.Workbook();

    // @ts-ignore
    await workbook.xlsx.load(uint8Array);
    const worksheet = workbook.worksheets[0];
    const headerRow = worksheet.getRow(1);

    if (!Array.isArray(headerRow.values)) {
      return;
    }

    let maxId = await findMaxId();

    const headers = headerRow.values.slice(1).map(String);

    worksheet.eachRow({ includeEmpty: true }, async (row, index) => {
      if (index === 1) return;

      if (!Array.isArray(row.values)) {
        return;
      }

      const rowData: Partial<InsertableProduct> = {};

      row.values?.slice(1).forEach((value, idx) => {
        const dbName = headers[idx] as keyof InsertableProductDb;
        const jsName = dbToJsMap[dbName];

        if (dbName === "product_line") value = String(value);
        if (typeof value === "string") value = value.trim();

        // @ts-ignore
        if (jsName && value) rowData[jsName] = value;
      });

      if (!rowData.brand || !rowData.productLine || !rowData.productType)
        return;

      const existing = await findExistingProduct(
        rowData.brand,
        rowData.productLine,
        rowData.productType
      );

      const insertableProduct = processRow(rowData as ParsedProduct);
      const rowsFilledExisting = existing ? countColumns(existing) : 0;
      const rowsFilledCurrent = countColumns(insertableProduct);

      if (!existing) maxId++;

      if (rowsFilledCurrent > rowsFilledExisting) {
        await upsert(
          db,
          products,
          [
            {
              ...insertableProduct,
              productId: existing ? existing.productId : String(maxId),
            },
          ],
          ["brand", "productLine", "productType"]
        );
      }
    });
  } catch (e) {
    console.error(e);
  }
}
