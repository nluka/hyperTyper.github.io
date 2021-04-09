import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import { expression_div } from "./page-elements.js";
var Expression = /** @class */ (function () {
    function Expression() {
        this.areThereIncompletedCharacters = true;
        this.element = expression_div;
        this.spanElements = [];
        this.cursorSpanElement = null;
        this.content = null;
        this.author = null;
        this.loadingIntervalId = null;
        Expression.instanceCount++;
        if (Expression.instanceCount > Expression.instanceCountLimit) {
            throwExceededClassInstanceLimitException("Expression", Expression.instanceCountLimit);
        }
    }
    Expression.prototype.startLoadingState = function () {
        var _this = this;
        this.element.classList.remove("error");
        this.setInnerText("Generating expression...");
        this.loadingIntervalId = setInterval(function () {
            switch (_this.element.innerText) {
                case "Generating expression":
                case "Generating expression.":
                case "Generating expression..":
                    _this.element.innerText += ".";
                    break;
                case "Generating expression...":
                default:
                    _this.setInnerText("Generating expression");
                    break;
            }
        }, 300);
    };
    Expression.prototype.setInnerText = function (text) {
        this.element.innerText = text;
    };
    Expression.prototype.renderError = function (text) {
        this.element.classList.add("error");
        this.setInnerText(text);
        this.element.animate([
            // keyframes
            {
                borderColor: "var(--border-color-secondary)"
            },
            {
                borderColor: "red"
            },
            {
                borderColor: "var(--border-color-secondary)"
            }
        ], {
            // timing options
            duration: 150,
            iterations: 1,
            easing: "ease-out"
        });
    };
    Expression.prototype.initialize = function (content, author) {
        this.stopLoadingState();
        this.makeUnselectable();
        this.clear();
        this.content = content;
        this.author = author;
        this.areThereIncompletedCharacters = true;
        this.renderContent(content);
        //this.renderAuthor(author);
    };
    Expression.prototype.stopLoadingState = function () {
        if (this.loadingIntervalId !== null) {
            clearInterval(this.loadingIntervalId);
        }
    };
    Expression.prototype.renderContent = function (content) {
        var _this = this;
        var contentCharacters = content.split("");
        this.spanElements = [];
        contentCharacters.forEach(function (character) {
            _this.renderContentSpanElement(character);
        });
        this.renderNullSpanElement();
    };
    Expression.prototype.renderContentSpanElement = function (character) {
        var characterSpan = this.createSpanElementWithInnerText(character);
        this.element.appendChild(characterSpan);
    };
    Expression.prototype.createSpanElementWithInnerText = function (text) {
        var spanElement = document.createElement("span");
        spanElement.innerText = text;
        this.spanElements.push(spanElement);
        return spanElement;
    };
    Expression.prototype.renderNullSpanElement = function () {
        var nullSpan = this.createSpanElementWithInnerText("");
        nullSpan.classList.add("null");
        this.element.appendChild(nullSpan);
    };
    // private renderAuthor(author: string) {
    //   // not implemented yet
    // }
    Expression.prototype.getSpanElements = function () {
        return this.spanElements;
    };
    Expression.prototype.clear = function () {
        this.element.innerText = "";
        this.content = null;
        this.author = null;
    };
    Expression.prototype.setDefault = function () {
        this.setInnerText(Expression.DEFAULT_TEXT);
    };
    Expression.prototype.makeSelectable = function () {
        this.element.classList.remove("unselectable");
    };
    Expression.prototype.makeUnselectable = function () {
        this.element.classList.add("unselectable");
    };
    Expression.prototype.isCursorSet = function () {
        return (this.cursorSpanElement !== null);
    };
    Expression.prototype.setCursorToToFirstCharacter = function () {
        var firstCharacter_span = this.element.querySelector("span");
        if (firstCharacter_span !== null) {
            this.setCursorTo(firstCharacter_span);
        }
    };
    Expression.prototype.setCursorTo = function (spanElement) {
        spanElement.classList.add("cursor");
        this.cursorSpanElement = spanElement;
    };
    Expression.prototype.clearCursor = function () {
        if (this.cursorSpanElement !== null) {
            this.removeCursorFrom(this.cursorSpanElement);
        }
    };
    Expression.prototype.removeCursorFrom = function (spanElement) {
        spanElement.classList.remove("cursor");
        this.cursorSpanElement = null;
    };
    Expression.prototype.labelElementAsMistake = function (spanElement) {
        spanElement.classList.add("mistake");
    };
    Expression.prototype.isElementLabeledAsMistake = function (spanElement) {
        return spanElement.classList.contains("mistake");
    };
    Expression.prototype.removeElementLabelMistake = function (spanElement) {
        spanElement.classList.remove("mistake");
    };
    Expression.prototype.setElementAsIncompleted = function (spanElement) {
        spanElement.classList.remove("correct");
        spanElement.classList.remove("incorrect-non-whitespace");
        spanElement.classList.remove("incorrect-whitespace");
    };
    Expression.prototype.setElementAsCorrect = function (spanElement) {
        spanElement.classList.remove("incorrect-non-whitespace");
        spanElement.classList.remove("incorrect-whitespace");
        spanElement.classList.add("correct");
    };
    Expression.prototype.setElementAsIncorrect = function (spanElement) {
        spanElement.classList.remove("correct");
        if (spanElement.innerText === " ") {
            spanElement.classList.add("incorrect-whitespace");
            return;
        }
        spanElement.classList.add("incorrect-non-whitespace");
    };
    Expression.prototype.isElementNullSpan = function (spanElement) {
        return spanElement.classList.contains("null");
    };
    Expression.prototype.getContent = function () {
        return this.content;
    };
    Expression.prototype.getAuthor = function () {
        return this.author;
    };
    Expression.DEFAULT_TEXT = "Click the Start button or select the box below and hit Enter to play.";
    Expression.NO_PHRASE_ITEM_COLLECTIONS_SELECTED_TEXT = "<Expression mode> is set to 'Phrase' but no <Item Collections> are selected. Please select at least 1 item collection to generate a phrase.";
    Expression.CHEATING_TEXT = "Cheating was detected and the attempt has been terminated. If this was by error, make sure you are not using autocorrect/autocomplete/autofill.";
    Expression.instanceCountLimit = 1;
    Expression.instanceCount = 0;
    return Expression;
}());
export default Expression;
