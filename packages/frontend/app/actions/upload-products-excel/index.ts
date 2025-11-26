"use server";

import { uploadProductExcel } from "./upload";

export async function uploadProducts(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) return null;
  
  const result = await uploadProductExcel(file);
  return result;
}
