import ExcelUploader from "./components/ExcelInputForm/ExcelInputForm";
import { uploadProducts } from "@app/actions/upload-products-excel";
import { uploadProductVariants } from "@app/actions/upload-product-variants-excel";

export default function page() {
  return (
    <div>
      <ExcelUploader
        label="Загрузить Products"
        action={uploadProducts}
      ></ExcelUploader>
      <ExcelUploader
        label="Загрузить Products Variants"
        action={uploadProductVariants}
      ></ExcelUploader>
    </div>
  );
}
