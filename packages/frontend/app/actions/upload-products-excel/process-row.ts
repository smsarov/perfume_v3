import type { ParsedProduct } from "./types";

export function processRow(row: ParsedProduct): ParsedProduct {
  switch (row.productType) {
    case "парфюмерная вода":
      row.sillage = "заметный ароматный ореол";
      row.longevity = "до 6-8 часов и более";
      row.category = "парфюмерия";
      break;

    case "туалетная вода":
      row.sillage = "летучий ароматный след";
      row.longevity = "до 2-4 часов";
      row.category = "парфюмерия";
      break;

    case "одеколон":
      row.sillage = "интимный шлейф";
      row.longevity = "до 1-2 часов";
      row.category = "парфюмерия";
      break;

    case "духи":
      row.sillage = "плотное ароматное поле";
      row.longevity = "более 12 часов";
      row.category = "парфюмерия";
      break;

    case "мист":
      row.sillage = "интимный шлейф";
      row.longevity = "до 1-2 часов";
      row.category = "парфюмерия";
      break;

    case "вуаль для волос":
      row.sillage = "интимный шлейф";
      row.longevity = "до 1-2 часов";
      row.category = "парфюмерия";
      break;

    case "масляные духи":
      row.sillage = "плотное ароматное поле";
      row.longevity = "до 10-12 часов и более";
      row.category = "парфюмерия";
      break;

    case "душистая вода":
      row.sillage = "интимный шлейф";
      row.longevity = "до 1-2 часов";
      row.category = "парфюмерия";
      break;

    case "сухие духи":
      row.sillage = "летучий ароматный след";
      row.longevity = "до 2-4 часов";
      row.category = "парфюмерия";
      break;

    default:
      break;
  }

  return row;
}
