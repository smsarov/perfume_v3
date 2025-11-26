import { parse } from "node-html-parser";
import { getEnvVar } from '@shared/env-loader';
import type { HTMLElement } from "node-html-parser";

const url = getEnvVar('SUPPLIER_URL');

export async function getPageContent(
  cookies: string,
  page: number
): Promise<HTMLElement> {
  const pageUrl = `${url}/?nav=${page}`;

  const response = await fetch(pageUrl, {
    method: "GET",
    headers: {
      Cookie: cookies || "",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
    },
  });

  const html = await response.text();
  const document = parse(html);

  return document;
}
