import ExcelUploader from "./components/ExcelInputForm";
import { uploadProducts } from "./actions/upload-products-excel";
import { uploadProductVariants } from "./actions/upload-product-variants-excel";

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
