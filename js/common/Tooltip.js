var Tooltip = /** @class */ (function () {
    function Tooltip(iconElement, titleText, bodyText) {
        this.backgroundElement = document.createElement("div");
        this.panelElement = document.createElement("div");
        this.headerElement = document.createElement("div");
        this.titleElement = document.createElement("div");
        this.closeButtonElement = document.createElement("div");
        this.bodyElement = document.createElement("div");
        this.iconElement = iconElement;
        this.titleText = titleText;
        this.bodyText = bodyText;
        this.isVisible = false;
        this.addIconClickEventListener();
    }
    Tooltip.prototype.addIconClickEventListener = function () {
        var _this = this;
        this.iconElement.addEventListener("click", function () {
            if (!_this.isVisible) {
                _this.show();
            }
        });
    };
    Tooltip.prototype.show = function () {
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
    };
    Tooltip.hideAnyVisibleInstances = function () {
        if (this.visibleInstances.length === 0) {
            return;
        }
        this.visibleInstances.forEach(function (expandedInstance) {
            expandedInstance.closeButtonElement.dispatchEvent(new Event("click"));
        });
        this.visibleInstances = [];
    };
    Tooltip.prototype.showBackgroundElement = function () {
        this.backgroundElement.classList.add("tooltip-background");
        document.body.appendChild(this.backgroundElement);
    };
    Tooltip.prototype.showPanelElement = function () {
        this.panelElement.classList.add("tooltip-panel");
        document.body.appendChild(this.panelElement);
    };
    // shiftPanelDownwardIfNavbarisVisible() {
    //   if (navbar.isVisible()) {
    //     this.panelElement.classList.add("shifted-down");
    //   }
    // }
    Tooltip.prototype.showHeaderElement = function () {
        this.headerElement.classList.add("tooltip-header");
        this.panelElement.appendChild(this.headerElement);
    };
    Tooltip.prototype.showTitleElement = function () {
        this.titleElement.classList.add("tooltip-title");
        this.titleElement.innerText = this.titleText;
        this.headerElement.appendChild(this.titleElement);
    };
    Tooltip.prototype.showCloseButtonElement = function () {
        this.closeButtonElement.classList.add("tooltip-close-button");
        this.closeButtonElement.innerText = "🗙";
        this.headerElement.appendChild(this.closeButtonElement);
    };
    Tooltip.prototype.showBodyElement = function () {
        this.bodyElement.classList.add("tooltip-body");
        this.bodyElement.innerText = this.bodyText;
        this.panelElement.appendChild(this.bodyElement);
    };
    Tooltip.prototype.addCloseButtonClickEventListener = function () {
        var _this = this;
        this.closeButtonElement.addEventListener("click", function () {
            _this.hide();
        });
    };
    Tooltip.prototype.hide = function () {
        var _this = this;
        var nonIconElementsInReversedOrderAdded = [
            this.bodyElement,
            this.closeButtonElement,
            this.titleElement,
            this.headerElement,
            this.panelElement,
            this.backgroundElement
        ];
        nonIconElementsInReversedOrderAdded.forEach(function (element) {
            _this.hideElement(element);
        });
        this.isVisible = false;
    };
    Tooltip.prototype.hideElement = function (element) {
        element.removeAttribute("class");
        element.innerText = "";
    };
    Tooltip.visibleInstances = [];
    return Tooltip;
}());
export default Tooltip;
