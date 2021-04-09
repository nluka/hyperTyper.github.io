import { navbarItems_ul, expandNavbarItemsList_button, expandNavbarItemsListButtonStrips_spans } from "./page-elements.js";
import { parseBool, throwExceededClassInstanceLimitException } from './functions.js';

export default class Navbar {
  private itemListElement = navbarItems_ul;
  private expandItemListButtonElement = expandNavbarItemsList_button;
  private expandItemsListButtonLineElements = expandNavbarItemsListButtonStrips_spans;

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    Navbar.instanceCount++;
    if (Navbar.instanceCount > Navbar.instanceCountLimit) {
      throwExceededClassInstanceLimitException("Navbar", Navbar.instanceCountLimit);
    }
  }

  public addToggleItemsListVisibilityButtonClickEventListener() {
    this.expandItemListButtonElement?.addEventListener("click", () => {
      this.itemListElement.classList.toggle("collapsed");
      this.expandItemsListButtonLineElements[0]?.classList.toggle("rotated");
      this.expandItemsListButtonLineElements[1]?.classList.toggle("rotated");
      this.toggleElementExpandedAttribute(this.itemListElement);
      const first_section = document.getElementsByTagName("section")[0];
      first_section?.classList.toggle("shifted-down");
      const tooltipPanel_div = document.querySelector(".tooltip-panel");
      if (tooltipPanel_div === null || tooltipPanel_div === undefined) {
        return;
      }
      if (first_section?.classList.contains("shifted-down")) {
        tooltipPanel_div.classList.add("shifted-down");
      } else {
        tooltipPanel_div.classList.remove("shifted-down");
      }
    });
  }

  private toggleElementExpandedAttribute(element: HTMLElement) {
    element.setAttribute("data-expanded", (!parseBool(element.getAttribute("data-expanded"))).toString());
  }

  public isExpanded() {
    return (this.itemListElement.style.display !== "none") && (parseBool(this.itemListElement.getAttribute("data-expanded")));
  }
}