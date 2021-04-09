import { gameWpmTracker_div } from "./page-elements.js";
import { MILLISECONDS_PER_SECOND, CHARACTERS_PER_WORD, MILLISECONDS_PER_MINUTE } from "../common/constants.js";
import { gameInput, gameTimer } from "./main.js";
import { throwExceededClassInstanceLimitException } from "../common/functions.js";
var GameWpmTracker = /** @class */ (function () {
    function GameWpmTracker() {
        this.element = gameWpmTracker_div;
        this.intervalId = null;
        GameWpmTracker.instanceCount++;
        if (GameWpmTracker.instanceCount > GameWpmTracker.instanceCountLimit) {
            throwExceededClassInstanceLimitException("GameWpmTracker", GameWpmTracker.instanceCountLimit);
        }
    }
    GameWpmTracker.prototype.clear = function () {
        this.setInnerText(GameWpmTracker.INACTIVE_STATE_TEXT);
    };
    GameWpmTracker.prototype.start = function () {
        var _this = this;
        this.setInnerText(this.getFormattedGrossWpmString(0));
        this.intervalId = setInterval(function () {
            _this.update();
        }, MILLISECONDS_PER_SECOND);
    };
    GameWpmTracker.prototype.setInnerText = function (text) {
        this.element.innerText = text;
    };
    GameWpmTracker.prototype.update = function () {
        var grossWpm = 0;
        var gameTimerStartDate = gameTimer.getStartDate();
        if (gameTimerStartDate !== null) {
            grossWpm = this.calculateGrossWpm(gameInput.charactersTypedCount, gameTimerStartDate);
        }
        var grossWpmFormattedString = this.getFormattedGrossWpmString(grossWpm);
        this.setInnerText(grossWpmFormattedString);
    };
    GameWpmTracker.prototype.calculateGrossWpm = function (charactersTypedCount, startDate) {
        var words = charactersTypedCount / CHARACTERS_PER_WORD;
        var minutes = (new Date().getTime() - startDate.getTime()) / MILLISECONDS_PER_MINUTE;
        var wordsPerMinute = words / minutes;
        if (wordsPerMinute < 0) {
            return 0;
        }
        return wordsPerMinute;
    };
    GameWpmTracker.prototype.getFormattedGrossWpmString = function (netWordsPerMinute) {
        return Math.floor(netWordsPerMinute) + " WPM";
    };
    GameWpmTracker.prototype.stop = function () {
        if (this.intervalId === null) {
            return;
        }
        clearInterval(this.intervalId);
        this.update();
    };
    GameWpmTracker.INACTIVE_STATE_TEXT = "— WPM";
    GameWpmTracker.TOOLTIP_TEXT_TITLE = "Game WPM Tracker";
    GameWpmTracker.TOOLTIP_TEXT_BODY = "Displays gross words per minute, calculated as: (Total Characters Inputted ÷ 5) ÷ Minutes";
    GameWpmTracker.instanceCountLimit = 1;
    GameWpmTracker.instanceCount = 0;
    return GameWpmTracker;
}());
export default GameWpmTracker;
