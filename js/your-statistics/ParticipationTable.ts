import { SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "../common/constants.js";
import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import StatisticsStorage from "../common/StatisticsStorage.js";
import {
  gamesAborted_td,
  gamesCheated_td,
  gamesCompleted_td,
  gamesDisqualified_td,
  participationStatistics_table,
  playtime_td,
  toggleVisibilityParticipationStatistics_button
} from "./page-elements.js";

export default class ParticipationTable {
  public static readonly ELEMENT_ID = "participationTable";
  public static readonly DEFAULT_IS_VISIBLE_BOOL = true;

  public readonly tableElement = participationStatistics_table;
  public readonly toggleVisibilityButtonElement = toggleVisibilityParticipationStatistics_button;

  public readonly playtimeInSecondsValue = StatisticsStorage.getPlaytimeInSeconds(1);
  public readonly gamesCompletedValue = StatisticsStorage.getGamesCompleted();
  public readonly gamesAbortedValue = StatisticsStorage.getGamesAborted();
  public readonly gamesDisqualifiedValue = StatisticsStorage.getGamesDisqualified();
  public readonly gamesCheatedValue = StatisticsStorage.getGamesCheated();

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    ParticipationTable.instanceCount++;
    if (ParticipationTable.instanceCount > ParticipationTable.instanceCountLimit) {
      throwExceededClassInstanceLimitException("ParticipationTable", ParticipationTable.instanceCountLimit);
    }
  }

  public renderAllCells() {
    this.renderPlaytimeCell();
    this.renderGamesCompletedCell();
    this.renderGamesAbortedCell();
    this.renderGamesDisqualifiedCell();
    this.renderGamesCheatedCell();
  }

  private renderPlaytimeCell() {
    this.renderCell(playtime_td, ParticipationTable.getFormattedPlaytimeString(this.playtimeInSecondsValue, 1));
  }

  private renderCell(cellElement: HTMLTableCellElement, value: number | string) {
    if (value === null) {
      this.renderNullSymbolForCell(cellElement);
      return;
    }
    this.setCellInnerText(cellElement, `${value}`);
  }

  private renderNullSymbolForCell(cellElement: HTMLTableCellElement) {
    this.setCellInnerText(cellElement, "···");
  }

  private setCellInnerText(cellElement: HTMLTableCellElement, text: string) {
    cellElement.innerText = text;
  }

  static getFormattedPlaytimeString(playtimeInSeconds: number, decimalPlaces: number) {
    if (playtimeInSeconds === null || playtimeInSeconds <= 0) return "0 mins";
    if (playtimeInSeconds < SECONDS_PER_HOUR) {
      return (playtimeInSeconds / SECONDS_PER_MINUTE).toFixed(decimalPlaces) + " mins";
    }
    return (playtimeInSeconds / SECONDS_PER_HOUR).toFixed(decimalPlaces) + " hours";
  }

  private renderGamesCompletedCell() {
    this.renderCell(gamesCompleted_td, this.gamesCompletedValue);
  }

  private renderGamesAbortedCell() {
    this.renderCell(gamesAborted_td, this.gamesAbortedValue);
  }

  private renderGamesDisqualifiedCell() {
    this.renderCell(gamesDisqualified_td, this.gamesDisqualifiedValue);
  }

  private renderGamesCheatedCell() {
    this.renderCell(gamesCheated_td, this.gamesCheatedValue);
  }
}