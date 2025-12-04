//@ts-nocheck

import ExcelJS from "exceljs";
import { processRow } from "./process-row";
import { getDbToJsMap } from "../db/helpers/columns-map";
import { productVariants } from "../drizzle/schema";

import { db } from "../db/db";
import { and, eq, sql } from "drizzle-orm";
import { upsert } from "../db/helpers";

const dbToJsMap = getDbToJsMap(productVariants);

export async function uploadVariantsExcel(file: File) {
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

    const headers = headerRow.values.slice(1).map(String);

    worksheet.eachRow({ includeEmpty: true }, async (row, index) => {
      if (index === 1) return;

      if (!Array.isArray(row.values)) {
        return;
      }

      let rowData = {};
      row.values?.slice(1).forEach((value, idx) => {
        const dbName = headers[idx];

        // @ts-ignore
        const jsName = dbToJsMap[dbName];

        if (dbName === "product_id" || dbName === "raw_name") {
          value = String(value);
        } else {
          value = Number(value);
        }
        if (typeof value === "string") value = value.trim();

        // @ts-ignore
        if (jsName && value) rowData[jsName] = value;
      });

      if (!rowData.rawName) return;

      await upsert(
        productVariants,
        [rowData],
        ["rawName"]
      );
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
