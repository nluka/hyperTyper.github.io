import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import { game_input } from "./page-elements.js";
var GameInput = /** @class */ (function () {
    function GameInput() {
        this.element = game_input;
        this.completedCharacters = [];
        this.currentCharacterCount = 0;
        this.previousCharacterCount = 0;
        this.charactersTypedCount = 0;
        this.containsMistakes = false;
        this.totalMistakeCount = 0;
        GameInput.instanceCount++;
        if (GameInput.instanceCount > GameInput.instanceCountLimit) {
            throwExceededClassInstanceLimitException("GameInput", GameInput.instanceCountLimit);
        }
    }
    GameInput.prototype.getElement = function () {
        return this.element;
    };
    GameInput.prototype.clearElementValue = function () {
        this.element.value = "";
    };
    GameInput.prototype.getElementValue = function () {
        return this.element.value;
    };
    GameInput.prototype.getElementContentsAsArray = function () {
        return this.getElementValue().split("");
    };
    GameInput.prototype.getElementContentsLength = function () {
        return this.getElementContentsAsArray().length;
    };
    GameInput.prototype.initialize = function () {
        this.resetPublicFields();
        this.element.removeAttribute("placeholder");
        this.element.focus();
    };
    GameInput.prototype.resetPublicFields = function () {
        this.completedCharacters = [];
        this.currentCharacterCount = 0;
        this.previousCharacterCount = 0;
        this.charactersTypedCount = 0;
        this.containsMistakes = false;
        this.totalMistakeCount = 0;
    };
    GameInput.prototype.setPageFocusToElement = function () {
        this.element.focus();
    };
    GameInput.prototype.checkForCheating = function () {
        return (this.currentCharacterCount - this.previousCharacterCount) > 1;
    };
    GameInput.prototype.markElementAsIncorrect = function () {
        this.element.classList.add("player-input-incorrect");
    };
    GameInput.prototype.unmarkElementAsIncorrect = function () {
        this.element.classList.remove("player-input-incorrect");
    };
    GameInput.prototype.updateCompletedCharacters = function () {
        var _this = this;
        var elementContents = this.getElementContentsAsArray();
        var lastElementContentsIndex = this.getElementContentsLength() - 1;
        if (this.containsMistakes || elementContents[lastElementContentsIndex] !== " ") {
            return;
        }
        elementContents.forEach(function (character) {
            _this.completedCharacters.push(character);
        });
        this.clearElementValue();
    };
    GameInput.prototype.cleanup = function () {
        this.clearElementValue();
        this.unmarkElementAsIncorrect();
    };
    GameInput.prototype.showDisqualificationPlaceholderText = function () {
        console.log(1);
        this.element.setAttribute("placeholder", "Disqualified (instant death was on)");
    };
    GameInput.instanceCountLimit = 1;
    GameInput.instanceCount = 0;
    return GameInput;
}());
export default GameInput;
