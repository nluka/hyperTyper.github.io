import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import StatisticsStorage from "../common/StatisticsStorage.js";
import { accuracyAllTimeBest_td, accuracyAverageToDate_td, accuracyLastGame_td, accuracyLastTenGames_td, accuracyStatistics_table, toggleVisibilityAccuracyStatistics_button } from "./page-elements.js";
var AccuracyTable = /** @class */ (function () {
    function AccuracyTable() {
        this.tableElement = accuracyStatistics_table;
        this.toggleVisibilityButtonElement = toggleVisibilityAccuracyStatistics_button;
        this.lastGameValue = null;
        this.lastTenGamesValue = null;
        this.averageToDateValue = null;
        this.allTimeBestValue = null;
        AccuracyTable.instanceCount++;
        if (AccuracyTable.instanceCount > AccuracyTable.instanceCountLimit) {
            throwExceededClassInstanceLimitException("AccuracyTable", AccuracyTable.instanceCountLimit);
        }
    }
    AccuracyTable.prototype.renderAllCells = function () {
        this.refreshValues();
        this.renderLastGameCell();
        this.renderLastTenGamesCell();
        this.renderAverageToDateCell();
        this.renderAllTimeBestCell();
    };
    AccuracyTable.prototype.refreshValues = function () {
        this.lastGameValue = StatisticsStorage.getAccuracyLastGameIfExists(1);
        this.lastTenGamesValue = StatisticsStorage.getAccuracyLastTenGamesIfExists(1);
        this.averageToDateValue = StatisticsStorage.getAccuracyAverageToDateIfExists(1);
        this.allTimeBestValue = StatisticsStorage.getAccuracyAllTimeBestIfExists(1);
    };
    AccuracyTable.prototype.renderLastGameCell = function () {
        this.renderCell(accuracyLastGame_td, this.lastGameValue);
    };
    AccuracyTable.prototype.renderCell = function (cellElement, value) {
        if (value === null) {
            this.renderNullSymbolForCell(cellElement);
            return;
        }
        this.setCellInnerText(cellElement, "" + value);
    };
    AccuracyTable.prototype.renderNullSymbolForCell = function (cellElement) {
        this.setCellInnerText(cellElement, "···");
    };
    AccuracyTable.prototype.setCellInnerText = function (cellElement, text) {
        cellElement.innerText = text;
    };
    AccuracyTable.prototype.renderLastTenGamesCell = function () {
        this.renderCell(accuracyLastTenGames_td, this.lastTenGamesValue);
    };
    AccuracyTable.prototype.renderAverageToDateCell = function () {
        this.renderCell(accuracyAverageToDate_td, this.averageToDateValue);
    };
    AccuracyTable.prototype.renderAllTimeBestCell = function () {
        this.renderCell(accuracyAllTimeBest_td, this.allTimeBestValue);
    };
    AccuracyTable.ELEMENT_ID = "accuracyTable";
    AccuracyTable.DEFAULT_IS_VISIBLE_BOOL = true;
    AccuracyTable.instanceCountLimit = 1;
    AccuracyTable.instanceCount = 0;
    return AccuracyTable;
}());
export default AccuracyTable;
