import { gameStatistics_table, toggleVisibilityGameStatisticsTable_button, wpm_td, accuracy_td, textLength_td, timeElapsed_td } from "./page-elements.js";
import { throwExceededClassInstanceLimitException } from "../common/functions.js";
var GameStatisticsTable = /** @class */ (function () {
    function GameStatisticsTable() {
        this.tableElement = gameStatistics_table;
        this.toggleVisibilityButtonElement = toggleVisibilityGameStatisticsTable_button;
        GameStatisticsTable.instanceCount++;
        if (GameStatisticsTable.instanceCount > GameStatisticsTable.instanceCountLimit) {
            throwExceededClassInstanceLimitException("GameStatisticsTable", GameStatisticsTable.instanceCountLimit);
        }
    }
    GameStatisticsTable.prototype.updateForGameCompletion = function (gameResult) {
        this.setWpmCellInnerText(gameResult.netWordsPerMinute, 1);
        this.setAccuracyCellInnerText(gameResult.accuracyPercentage, 1);
        this.setTextLengthCharsCellInnerText(gameResult.textLength, 0);
        this.setTimeElapsedCellInnerText(gameResult.secondsElapsed, 2);
    };
    GameStatisticsTable.prototype.setCellElementInnerText = function (cellElement, value, decimalPlaces) {
        cellElement.innerText = value.toFixed(decimalPlaces);
    };
    GameStatisticsTable.prototype.setWpmCellInnerText = function (wpm, decimalPlaces) {
        this.setCellElementInnerText(wpm_td, wpm, decimalPlaces);
    };
    GameStatisticsTable.prototype.setAccuracyCellInnerText = function (accuracy, decimalPlaces) {
        this.setCellElementInnerText(accuracy_td, accuracy, decimalPlaces);
    };
    GameStatisticsTable.prototype.setTextLengthCharsCellInnerText = function (textLength, decimalPlaces) {
        this.setCellElementInnerText(textLength_td, textLength, decimalPlaces);
    };
    GameStatisticsTable.prototype.setTimeElapsedCellInnerText = function (seconds, decimalPlaces) {
        this.setCellElementInnerText(timeElapsed_td, seconds, decimalPlaces);
    };
    GameStatisticsTable.ELEMENT_ID = "gameStatisticsTable";
    GameStatisticsTable.DEFAULT_IS_VISIBLE_BOOL = true;
    GameStatisticsTable.TOOLTIP_NET_WORDS_PER_MINUTE_TEXT_TITLE = "Net Words Per Minute";
    GameStatisticsTable.TOOLTIP_NET_WORDS_PER_MINUTE_TEXT_BODY = "Calculated as: (Text Length ÷ 5) ÷ Minutes";
    GameStatisticsTable.TOOLTIP_ACCURACY_PERCENTAGE_TEXT_TITLE = "Accuracy Percentage";
    GameStatisticsTable.TOOLTIP_ACCURACY_PERCENTAGE_TEXT_BODY = "Calculated as: (Text Length ÷ [Text Length + Mistakes]) × 100%";
    GameStatisticsTable.instanceCountLimit = 1;
    GameStatisticsTable.instanceCount = 0;
    return GameStatisticsTable;
}());
export default GameStatisticsTable;
