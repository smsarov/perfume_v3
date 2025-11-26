import {
  isTesterSign,
  isRefillSign,
  isBlackListSign,
  volumeSigns,
  weightSigns,
} from "./constants";

function extractSignedNumber(name: string, signs: string[]): number | null {
  name = name.toLowerCase();

  for (const sign of signs) {
    const regex = new RegExp(`(\\d+[.,]?\\d*)\\s*${sign}`, "i");
    const match = name.match(regex);
    if (match) {
      return Number(match[1].replace(",", "."));
    }

    const regexAfter = new RegExp(`${sign}\\s*(\\d+[.,]?\\d*)`, "i");
    const matchAfter = name.match(regexAfter);
    if (matchAfter) {
      return Number(matchAfter[1].replace(",", "."));
    }
  }

  return null;
}

export function extractFeatures(name: string): {
  isTester: boolean;
  isRefill: boolean;
  isTesterRefill: boolean;
  isBlackList: boolean;
} {
  name = name.toLocaleLowerCase();
  const isTester = isTesterSign.some((sign) => name.includes(sign));
  const isRefill = isRefillSign.some((sign) => name.includes(sign));
  const isBlackList = isBlackListSign.some((sign) => name.includes(sign));

  const isTesterRefill = isTester && isRefill;

  if (isTesterRefill)
    return {
      isTesterRefill: true,
      isTester: false,
      isRefill: false,
      isBlackList,
    };

  return {
    isRefill,
    isTester,
    isTesterRefill,
    isBlackList,
  };
}

export const extractVolume = (name: string) =>
  extractSignedNumber(name, volumeSigns);

export const extractWeight = (name: string) =>
  extractSignedNumber(name, weightSigns);
