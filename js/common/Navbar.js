import { navbarItems_ul, expandNavbarItemsList_button, expandNavbarItemsListButtonStrips_spans } from "./page-elements.js";
import { parseBool, throwExceededClassInstanceLimitException } from './functions.js';
var Navbar = /** @class */ (function () {
    function Navbar() {
        this.itemListElement = navbarItems_ul;
        this.expandItemListButtonElement = expandNavbarItemsList_button;
        this.expandItemsListButtonLineElements = expandNavbarItemsListButtonStrips_spans;
        Navbar.instanceCount++;
        if (Navbar.instanceCount > Navbar.instanceCountLimit) {
            throwExceededClassInstanceLimitException("Navbar", Navbar.instanceCountLimit);
        }
    }
    Navbar.prototype.addToggleItemsListVisibilityButtonClickEventListener = function () {
        var _this = this;
        var _a;
        (_a = this.expandItemListButtonElement) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            var _a, _b;
            _this.itemListElement.classList.toggle("collapsed");
            (_a = _this.expandItemsListButtonLineElements[0]) === null || _a === void 0 ? void 0 : _a.classList.toggle("rotated");
            (_b = _this.expandItemsListButtonLineElements[1]) === null || _b === void 0 ? void 0 : _b.classList.toggle("rotated");
            _this.toggleElementExpandedAttribute(_this.itemListElement);
            var first_section = document.getElementsByTagName("section")[0];
            first_section === null || first_section === void 0 ? void 0 : first_section.classList.toggle("shifted-down");
            var tooltipPanel_div = document.querySelector(".tooltip-panel");
            if (tooltipPanel_div === null || tooltipPanel_div === undefined) {
                return;
            }
            if (first_section === null || first_section === void 0 ? void 0 : first_section.classList.contains("shifted-down")) {
                tooltipPanel_div.classList.add("shifted-down");
            }
            else {
                tooltipPanel_div.classList.remove("shifted-down");
            }
        });
    };
    Navbar.prototype.toggleElementExpandedAttribute = function (element) {
        element.setAttribute("data-expanded", (!parseBool(element.getAttribute("data-expanded"))).toString());
    };
    Navbar.prototype.isExpanded = function () {
        return (this.itemListElement.style.display !== "none") && (parseBool(this.itemListElement.getAttribute("data-expanded")));
    };
    Navbar.instanceCountLimit = 1;
    Navbar.instanceCount = 0;
    return Navbar;
}());
export default Navbar;
