import ElementVisibilityStateStorage from './ElementVisibilityStateStorage.js';
import { parseBool } from './functions.js';
var VISIBILITY_ATTRIBUTE_NAME = 'data-visible';
var ElementVisibility = /** @class */ (function () {
    function ElementVisibility() {
    }
    ElementVisibility.applyStoredSettings = function (collapsibleElement, collapsibleElementId, toggleVisibilityButtonElement, defaultVisibilityBool) {
        var storedBool = ElementVisibilityStateStorage.getBoolIfExists(collapsibleElementId);
        if (storedBool === null) {
            this.applyDefaultSettings(collapsibleElement, toggleVisibilityButtonElement, defaultVisibilityBool);
            return;
        }
        this.set(collapsibleElement, storedBool);
        this.setToggleVisibilityButtonInnerTextBasedOnVisibilityBool(toggleVisibilityButtonElement, storedBool);
    };
    ElementVisibility.applyDefaultSettings = function (collapsibleElement, toggleVisibilityButtonElement, defaultVisibilityBool) {
        this.set(collapsibleElement, defaultVisibilityBool);
        this.setToggleVisibilityButtonInnerTextBasedOnVisibilityBool(toggleVisibilityButtonElement, defaultVisibilityBool);
    };
    ElementVisibility.setToggleVisibilityButtonInnerTextBasedOnVisibilityBool = function (toggleVisibilityButtonElement, isVisible) {
        if (isVisible) {
            toggleVisibilityButtonElement.innerText = 'Hide';
            return;
        }
        toggleVisibilityButtonElement.innerText = 'Show';
    };
    ElementVisibility.set = function (element, bool) {
        element.setAttribute(VISIBILITY_ATTRIBUTE_NAME, bool.toString());
    };
    ElementVisibility.addToggleButtonClickEventListener = function (collapsibleElement, collapsibleElementId, toggleVisibilityButtonElement) {
        toggleVisibilityButtonElement.addEventListener('click', function () {
            ElementVisibilityToggleButtonClickEventListener(collapsibleElement, collapsibleElementId, toggleVisibilityButtonElement);
        });
    };
    ElementVisibility.toggle = function (collapsibleElement, collapsibleElementId, toggleVisibilityButtonElement) {
        var previousBool = this.getIsVisibleAttributeBool(collapsibleElement);
        var newBool = !previousBool;
        this.setIsVisibleAttribute(collapsibleElement, newBool);
        this.setToggleVisibilityButtonInnerTextBasedOnVisibilityBool(toggleVisibilityButtonElement, newBool);
        ElementVisibilityStateStorage.setBool(collapsibleElementId, newBool);
    };
    ElementVisibility.getIsVisibleAttributeBool = function (element) {
        return parseBool(element.getAttribute('data-visible'));
    };
    ElementVisibility.setIsVisibleAttribute = function (element, bool) {
        element.setAttribute(VISIBILITY_ATTRIBUTE_NAME, bool.toString());
    };
    return ElementVisibility;
}());
export default ElementVisibility;
function ElementVisibilityToggleButtonClickEventListener(collapsibleElement, collapsibleElementId, toggleVisibilityButtonElement) {
    ElementVisibility.toggle(collapsibleElement, collapsibleElementId, toggleVisibilityButtonElement);
}
