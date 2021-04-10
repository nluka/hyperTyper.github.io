import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import StatisticsStorage from "../common/StatisticsStorage.js";
import {
  accuracyAllTimeBest_td,
  accuracyAverageToDate_td,
  accuracyLastGame_td,
  accuracyLastTenGames_td,
  accuracyStatistics_table,
  toggleVisibilityAccuracyStatistics_button
} from "./page-elements.js";

export default class AccuracyTable {
  public static readonly ELEMENT_ID = "accuracyTable";
  public static readonly DEFAULT_IS_VISIBLE_BOOL = true;

  public readonly tableElement = accuracyStatistics_table;
  public readonly toggleVisibilityButtonElement = toggleVisibilityAccuracyStatistics_button;

  private lastGameValue: number | null = null;
  private lastTenGamesValue: number | null = null;
  private averageToDateValue: number | null = null;
  private allTimeBestValue: number | null = null;

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    AccuracyTable.instanceCount++;
    if (AccuracyTable.instanceCount > AccuracyTable.instanceCountLimit) {
      throwExceededClassInstanceLimitException("AccuracyTable", AccuracyTable.instanceCountLimit);
    }
  }

  public renderAllCells() {
    this.refreshValues();
    this.renderLastGameCell();
    this.renderLastTenGamesCell();
    this.renderAverageToDateCell();
    this.renderAllTimeBestCell();
  }

  private refreshValues() {
    this.lastGameValue = StatisticsStorage.getAccuracyLastGameIfExists(1);
    this.lastTenGamesValue = StatisticsStorage.getAccuracyLastTenGamesIfExists(1);
    this.averageToDateValue = StatisticsStorage.getAccuracyAverageToDateIfExists(1);
    this.allTimeBestValue = StatisticsStorage.getAccuracyAllTimeBestIfExists(1);
  }

  private renderLastGameCell() {
    this.renderCell(accuracyLastGame_td, this.lastGameValue);
  }

  private renderCell(cellElement: HTMLTableCellElement, value: number | null) {
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

  private renderLastTenGamesCell() {
    this.renderCell(accuracyLastTenGames_td, this.lastTenGamesValue);
  }

  private renderAverageToDateCell() {
    this.renderCell(accuracyAverageToDate_td, this.averageToDateValue);
  }

  private renderAllTimeBestCell() {
    this.renderCell(accuracyAllTimeBest_td, this.allTimeBestValue);
  }
}