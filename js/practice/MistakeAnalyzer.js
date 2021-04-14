import ElementVisibility from "../common/ElementVisibility.js";
import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import CharacterAnalysis from "./CharacterAnalysis.js";
import { analyzedExpression_div, characterAnalysis_div, mistakeAnalyzer_div, toggleVisibilityMistakeAnalyzer_button } from "./page-elements.js";
var MistakeAnalyzer = /** @class */ (function () {
    function MistakeAnalyzer() {
        this.containerElement = mistakeAnalyzer_div;
        this.toggleVisibilityButtonElement = toggleVisibilityMistakeAnalyzer_button;
        this.analyzedExpressionElement = analyzedExpression_div;
        this.characterAnalysisElement = characterAnalysis_div;
        this.cursorSpanElement = null;
        this.map = new Map();
        MistakeAnalyzer.instanceCount++;
        if (MistakeAnalyzer.instanceCount > MistakeAnalyzer.instanceCountLimit) {
            throwExceededClassInstanceLimitException("MistakeAnalyzer", MistakeAnalyzer.instanceCountLimit);
        }
    }
    MistakeAnalyzer.prototype.initialize = function (textLength) {
        this.map = new Map();
        for (var i = 0; i < textLength; i++) {
            this.map.set(i, new CharacterAnalysis());
        }
    };
    MistakeAnalyzer.prototype.addMistake = function (index, incorrectInput) {
        var previousMapValue = this.map.get(index);
        previousMapValue.incrementMistakeCount();
        previousMapValue.addIncorrectInput(incorrectInput);
    };
    MistakeAnalyzer.prototype.render = function (gameTextContent, mistakeCount) {
        var _this = this;
        if (mistakeCount === 0) {
            this.setAnalyzedExpressionInnerText(MistakeAnalyzer.NO_MISTAKES_MADE_MESSAGE);
            return;
        }
        this.clearElementInnerText(this.analyzedExpressionElement);
        this.setCharacterAnalysisInnerText(MistakeAnalyzer.DEFAULT_CHARACTER_ANALYSIS_TEXT);
        gameTextContent.split("").forEach(function (character, index) {
            _this.renderExpressionSpan(character, index);
        });
        ElementVisibility.set(this.characterAnalysisElement, true);
    };
    MistakeAnalyzer.prototype.setAnalyzedExpressionInnerText = function (text) {
        this.analyzedExpressionElement.innerText = text;
    };
    MistakeAnalyzer.prototype.setCharacterAnalysisInnerText = function (text) {
        this.characterAnalysisElement.innerText = text;
    };
    MistakeAnalyzer.prototype.clearElementInnerText = function (element) {
        element.innerText = "";
    };
    MistakeAnalyzer.prototype.renderExpressionSpan = function (character, index) {
        var spanElement = this.createSpanWithText(character);
        this.analyzedExpressionElement.appendChild(spanElement);
        var mapValueAtIndex = this.map.get(index);
        var mistakeCount = mapValueAtIndex.getMistakeCount();
        if (mistakeCount <= 0) {
            return;
        }
        this.applyStylesForSpan(spanElement, mistakeCount);
        this.addClickEventListenerForExpressionSpan(spanElement, mapValueAtIndex);
    };
    MistakeAnalyzer.prototype.createSpanWithText = function (text) {
        var new_span = document.createElement("span");
        new_span.innerText = text;
        return new_span;
    };
    MistakeAnalyzer.prototype.applyStylesForSpan = function (spanElement, mistakeCount) {
        if (mistakeCount < 1) {
            throw "mistakeCount (" + mistakeCount + ") < 1";
        }
        if (mistakeCount > 3) {
            spanElement.setAttribute("data-mistake-count", ">3");
            return;
        }
        spanElement.setAttribute("data-mistake-count", "" + mistakeCount);
    };
    MistakeAnalyzer.prototype.addClickEventListenerForExpressionSpan = function (spanElement, mapValue) {
        var _this = this;
        var mistakeCount = mapValue.getMistakeCount();
        var incorrectInputs = mapValue.getIncorrectInputs();
        spanElement.addEventListener("click", function () {
            _this.clearExpressionCursor();
            _this.setExpressionCursorTo(spanElement);
            var text = "Mistakes [" + mistakeCount + "]: ";
            incorrectInputs.forEach(function (character, index) {
                if (character === " ") {
                    character = "⎵";
                }
                text += character;
                if (index < incorrectInputs.length - 1) {
                    text += " ";
                }
            });
            _this.setCharacterAnalysisInnerText(text);
        });
    };
    MistakeAnalyzer.prototype.clearExpressionCursor = function () {
        if (this.cursorSpanElement !== null) {
            this.removeExpressionCursorFrom(this.cursorSpanElement);
        }
    };
    MistakeAnalyzer.prototype.removeExpressionCursorFrom = function (spanElement) {
        spanElement.classList.remove("cursor");
        this.cursorSpanElement = null;
    };
    MistakeAnalyzer.prototype.setExpressionCursorTo = function (spanElement) {
        spanElement.classList.add("cursor");
        this.cursorSpanElement = spanElement;
    };
    MistakeAnalyzer.ELEMENT_ID = "mistakeAnalyzer";
    MistakeAnalyzer.DEFAULT_IS_VISIBLE_BOOL = true;
    MistakeAnalyzer.NO_MISTAKES_MADE_MESSAGE = "Congratulations, you made no mistakes!";
    MistakeAnalyzer.DEFAULT_CHARACTER_ANALYSIS_TEXT = "Click a highlighted character for details";
    MistakeAnalyzer.instanceCountLimit = 1;
    MistakeAnalyzer.instanceCount = 0;
    return MistakeAnalyzer;
}());
export default MistakeAnalyzer;
