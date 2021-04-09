import { SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "../common/constants.js";
import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import StatisticsStorage from "../common/StatisticsStorage.js";
import { gamesAborted_td, gamesCheated_td, gamesCompleted_td, gamesDisqualified_td, participationStatistics_table, playtime_td, toggleVisibilityParticipationStatistics_button } from "./page-elements.js";
var ParticipationTable = /** @class */ (function () {
    function ParticipationTable() {
        this.tableElement = participationStatistics_table;
        this.toggleVisibilityButtonElement = toggleVisibilityParticipationStatistics_button;
        this.playtimeInSecondsValue = StatisticsStorage.getPlaytimeInSeconds(1);
        this.gamesCompletedValue = StatisticsStorage.getGamesCompleted();
        this.gamesAbortedValue = StatisticsStorage.getGamesAborted();
        this.gamesDisqualifiedValue = StatisticsStorage.getGamesDisqualified();
        this.gamesCheatedValue = StatisticsStorage.getGamesCheated();
        ParticipationTable.instanceCount++;
        if (ParticipationTable.instanceCount > ParticipationTable.instanceCountLimit) {
            throwExceededClassInstanceLimitException("ParticipationTable", ParticipationTable.instanceCountLimit);
        }
    }
    ParticipationTable.prototype.renderAllCells = function () {
        this.renderPlaytimeCell();
        this.renderGamesCompletedCell();
        this.renderGamesAbortedCell();
        this.renderGamesDisqualifiedCell();
        this.renderGamesCheatedCell();
    };
    ParticipationTable.prototype.renderPlaytimeCell = function () {
        this.renderCell(playtime_td, ParticipationTable.getFormattedPlaytimeString(this.playtimeInSecondsValue, 1));
    };
    ParticipationTable.prototype.renderCell = function (cellElement, value) {
        if (value === null) {
            this.renderNullSymbolForCell(cellElement);
            return;
        }
        this.setCellInnerText(cellElement, "" + value);
    };
    ParticipationTable.prototype.renderNullSymbolForCell = function (cellElement) {
        this.setCellInnerText(cellElement, "···");
    };
    ParticipationTable.prototype.setCellInnerText = function (cellElement, text) {
        cellElement.innerText = text;
    };
    ParticipationTable.getFormattedPlaytimeString = function (playtimeInSeconds, decimalPlaces) {
        if (playtimeInSeconds === null || playtimeInSeconds <= 0)
            return "0 mins";
        if (playtimeInSeconds < SECONDS_PER_HOUR) {
            return (playtimeInSeconds / SECONDS_PER_MINUTE).toFixed(decimalPlaces) + " mins";
        }
        return (playtimeInSeconds / SECONDS_PER_HOUR).toFixed(decimalPlaces) + " hours";
    };
    ParticipationTable.prototype.renderGamesCompletedCell = function () {
        this.renderCell(gamesCompleted_td, this.gamesCompletedValue);
    };
    ParticipationTable.prototype.renderGamesAbortedCell = function () {
        this.renderCell(gamesAborted_td, this.gamesAbortedValue);
    };
    ParticipationTable.prototype.renderGamesDisqualifiedCell = function () {
        this.renderCell(gamesDisqualified_td, this.gamesDisqualifiedValue);
    };
    ParticipationTable.prototype.renderGamesCheatedCell = function () {
        this.renderCell(gamesCheated_td, this.gamesCheatedValue);
    };
    ParticipationTable.ELEMENT_ID = "participationTable";
    ParticipationTable.DEFAULT_IS_VISIBLE_BOOL = true;
    ParticipationTable.instanceCountLimit = 1;
    ParticipationTable.instanceCount = 0;
    return ParticipationTable;
}());
export default ParticipationTable;
