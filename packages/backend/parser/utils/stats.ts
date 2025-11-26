const NEW_PRODUCTS_TO_SHOW = 20;
const HALF_PRODUCTS = Math.floor(NEW_PRODUCTS_TO_SHOW / 2);

export class ParsingStats {
  totalPages = 0;
  totalProducts = 0;
  updatedProducts = 0;

  newProducts = 0;
  private newProductsToShowFirst: string[] = [];
  private newProductsToShowLast: string[] = [];

  private readonly startTime = Date.now();

  addNewProducts(names: string[]) {
    this.newProducts += names.length;
    
    for (const name of names) {
      if (this.newProductsToShowFirst.length < HALF_PRODUCTS) {
        this.newProductsToShowFirst.push(name);
      } else {
        this.newProductsToShowLast.push(name);
        if (this.newProductsToShowLast.length > HALF_PRODUCTS) {
          this.newProductsToShowLast.shift();
        }
      }
    }
  }

  private createNewProductsMessage() {
    if (this.newProducts === 0) return "(нет новых продуктов)";

    const firstIndexed = this.newProductsToShowFirst.map(
      (name, index) => `${index + 1}. ${name}`
    );
    const lastCount = this.newProductsToShowLast.length;
    const lastIndexed = this.newProductsToShowLast.map((name, i) => {
      const globalIndex = this.newProducts - (lastCount - i - 1);
      return `${globalIndex}. ${name}`;
    });

    if (firstIndexed.length === 0) return lastIndexed.join("\n");
    if (lastIndexed.length === 0) return firstIndexed.join("\n");
    return [firstIndexed.join("\n"), "...", lastIndexed.join("\n")].join("\n");
  }

  createReportMessage() {
    const endTime = Date.now();
    const durationMinutes = Math.round((endTime - this.startTime) / 1000 / 60);

    return [
      `Начало парсинга: ${new Date(this.startTime).toLocaleString()}`,
      `Конец парсинга: ${new Date(endTime).toLocaleString()}`,
      `Времени заняло: ${durationMinutes} минут`,
      "",
      `Страниц найдено: ${this.totalPages}`,
      `Всего продуктов: ${this.totalProducts}`,
      "",
      `Обновлено продуктов: ${this.updatedProducts}`,
      `Новых продуктов: ${this.newProducts}`,
      "",
      this.createNewProductsMessage(),
    ].join("\n");
  }
}
