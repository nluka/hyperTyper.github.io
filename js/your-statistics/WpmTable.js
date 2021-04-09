import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import StatisticsStorage from "../common/StatisticsStorage.js";
import { toggleVisibilityWpmStatistics_button, wpmAllTimeBest_td, wpmAverageToDate_td, wpmLastGame_td, wpmLastTenGames_td, wpmStatistics_table } from "./page-elements.js";
var WpmTable = /** @class */ (function () {
    function WpmTable() {
        this.tableElement = wpmStatistics_table;
        this.toggleVisibilityButtonElement = toggleVisibilityWpmStatistics_button;
        this.lastGameValue = StatisticsStorage.getWpmLastGameIfExists(1);
        this.lastTenGamesValue = StatisticsStorage.getWpmLastTenGamesIfExists(1);
        this.averageToDateValue = StatisticsStorage.getWpmAverageToDateIfExists(1);
        this.allTimeBestValue = StatisticsStorage.getWpmAllTimeBestIfExists(1);
        WpmTable.instanceCount++;
        if (WpmTable.instanceCount > WpmTable.instanceCountLimit) {
            throwExceededClassInstanceLimitException("WpmTable", WpmTable.instanceCountLimit);
        }
    }
    WpmTable.prototype.renderAllCells = function () {
        this.renderLastGameCell();
        this.renderLastTenGamesCell();
        this.renderAverageToDateCell();
        this.renderAllTimeBestCell();
    };
    WpmTable.prototype.renderLastGameCell = function () {
        this.renderCell(wpmLastGame_td, this.lastGameValue);
    };
    WpmTable.prototype.renderCell = function (cellElement, value) {
        if (value === null) {
            this.renderNullSymbolForCell(cellElement);
            return;
        }
        this.setCellInnerText(cellElement, "" + value);
    };
    WpmTable.prototype.renderNullSymbolForCell = function (cellElement) {
        this.setCellInnerText(cellElement, "···");
    };
    WpmTable.prototype.setCellInnerText = function (cellElement, text) {
        cellElement.innerText = text;
    };
    WpmTable.prototype.renderLastTenGamesCell = function () {
        this.renderCell(wpmLastTenGames_td, this.lastTenGamesValue);
    };
    WpmTable.prototype.renderAverageToDateCell = function () {
        this.renderCell(wpmAverageToDate_td, this.averageToDateValue);
    };
    WpmTable.prototype.renderAllTimeBestCell = function () {
        this.renderCell(wpmAllTimeBest_td, this.allTimeBestValue);
    };
    WpmTable.ELEMENT_ID = "wpmTable";
    WpmTable.DEFAULT_IS_VISIBLE_BOOL = true;
    WpmTable.instanceCountLimit = 1;
    WpmTable.instanceCount = 0;
    return WpmTable;
}());
export default WpmTable;
