import { parseBool } from './functions.js';
var ElementVisibilityStateStorage = /** @class */ (function () {
    function ElementVisibilityStateStorage() {
    }
    ElementVisibilityStateStorage.getBoolIfExists = function (elementId) {
        var stringifiedBool = this.getIsVisibleString(elementId);
        if (stringifiedBool === null) {
            return null;
        }
        return parseBool(stringifiedBool);
    };
    ElementVisibilityStateStorage.getIsVisibleString = function (elementId) {
        return localStorage.getItem(elementId + "IsVisible");
    };
    ElementVisibilityStateStorage.setBool = function (elementId, isVisible) {
        this.setIsVisibleString(elementId, isVisible);
    };
    ElementVisibilityStateStorage.setIsVisibleString = function (elementId, isVisible) {
        localStorage.setItem(elementId + "IsVisible", "" + isVisible);
    };
    ElementVisibilityStateStorage.toggleBool = function (elementId) {
        var previousStringifiedBool = this.getIsVisibleString(elementId);
        if (previousStringifiedBool === null) {
            throw "Cannot toggle localstorage '" + elementId + "IsVisible' value because no value exists";
        }
        var invertedBool = !(parseBool(previousStringifiedBool));
        this.setIsVisibleString(elementId, invertedBool);
    };
    return ElementVisibilityStateStorage;
}());
export default ElementVisibilityStateStorage;
