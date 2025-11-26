import { HTMLElement } from "node-html-parser";

export function getTotalPages(document: HTMLElement): number{
    const bottomNav = document.querySelector('.pagenav');

    const lastLink = bottomNav?.querySelector('a:last-child');
    const pagesTotal = lastLink ? parseInt(lastLink.textContent?.trim() || '0') : 1;

    return pagesTotal;
}
