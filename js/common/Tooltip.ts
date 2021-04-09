export default class Tooltip {
  private static visibleInstances: Tooltip[] = [];

  private readonly iconElement: HTMLElement;
  private readonly backgroundElement = document.createElement("div");
  private readonly panelElement = document.createElement("div");
  private readonly headerElement = document.createElement("div");
  private readonly titleElement = document.createElement("div");
  private readonly closeButtonElement = document.createElement("div");
  private readonly bodyElement = document.createElement("div");
  // Text
  private readonly titleText: string;
  private readonly bodyText: string;
  // State
  private isVisible: boolean;

  constructor(iconElement: HTMLElement, titleText: string, bodyText: string) {
    this.iconElement = iconElement;
    this.titleText = titleText;
    this.bodyText = bodyText;
    this.isVisible = false;
    this.addIconClickEventListener();
  }

  private addIconClickEventListener() {
    this.iconElement.addEventListener("click", () => {
      if (!this.isVisible) {
        this.show();
      }
    });
  }

  private show() {
    Tooltip.hideAnyVisibleInstances();
    Tooltip.visibleInstances.push(this);
    this.isVisible = true;
    this.showBackgroundElement();
    this.showPanelElement();
    //this.shiftPanelDownwardIfNavbarisVisible();
    this.showHeaderElement();
    this.showTitleElement();
    this.showCloseButtonElement();
    this.showBodyElement();
    this.addCloseButtonClickEventListener();
  }

  private static hideAnyVisibleInstances() {
    if (this.visibleInstances.length === 0) {
      return;
    }
    this.visibleInstances.forEach((expandedInstance) => {
      expandedInstance.closeButtonElement.dispatchEvent(new Event("click"));
    });
    this.visibleInstances = [];
  }

  private showBackgroundElement() {
    this.backgroundElement.classList.add("tooltip-background");
    document.body.appendChild(this.backgroundElement);
  }

  private showPanelElement() {
    this.panelElement.classList.add("tooltip-panel");
    document.body.appendChild(this.panelElement);
  }

  // shiftPanelDownwardIfNavbarisVisible() {
  //   if (navbar.isVisible()) {
  //     this.panelElement.classList.add("shifted-down");
  //   }
  // }

  private showHeaderElement() {
    this.headerElement.classList.add("tooltip-header");
    this.panelElement.appendChild(this.headerElement);
  }

  private showTitleElement() {
    this.titleElement.classList.add("tooltip-title");
    this.titleElement.innerText = this.titleText;
    this.headerElement.appendChild(this.titleElement);
  }

  private showCloseButtonElement() {
    this.closeButtonElement.classList.add("tooltip-close-button");
    this.closeButtonElement.innerText = "🗙";
    this.headerElement.appendChild(this.closeButtonElement);
  }

  private showBodyElement() {
    this.bodyElement.classList.add("tooltip-body");
    this.bodyElement.innerText = this.bodyText;
    this.panelElement.appendChild(this.bodyElement);
  }

  private addCloseButtonClickEventListener() {
    this.closeButtonElement.addEventListener("click", () => {
      this.hide();
    });
  }

  private hide() {
    const nonIconElementsInReversedOrderAdded: HTMLElement[] = [
      this.bodyElement,
      this.closeButtonElement,
      this.titleElement,
      this.headerElement,
      this.panelElement,
      this.backgroundElement
    ];
    nonIconElementsInReversedOrderAdded.forEach((element) => {
      this.hideElement(element);
    });
    this.isVisible = false;
  }

  private hideElement(element: HTMLElement) {
    element.removeAttribute("class");
    element.innerText = "";
  }
}