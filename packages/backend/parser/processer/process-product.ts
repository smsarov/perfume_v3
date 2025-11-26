import { extractFeatures, extractVolume, extractWeight } from "./utils";
import type { ParsedProduct, ProcessedProductVariant } from "../types";

export function processProduct(
  product: ParsedProduct
): ProcessedProductVariant {
  const { name, price } = product;

  const features = extractFeatures(name);
  const volume = extractVolume(name);
  const weight = extractWeight(name);

  return {
    rawName: name,
    price,
    isRefill: Number(features.isRefill),
    isTester: Number(features.isTester),
    isRefillTester: Number(features.isTesterRefill),
    isBlackList: Number(features.isBlackList),
    weight,
    volume,
  };
}
