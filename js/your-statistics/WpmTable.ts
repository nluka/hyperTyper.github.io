import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import StatisticsStorage from "../common/StatisticsStorage.js";
import {
  toggleVisibilityWpmStatistics_button,
  wpmAllTimeBest_td,
  wpmAverageToDate_td,
  wpmLastGame_td,
  wpmLastTenGames_td,
  wpmStatistics_table
} from "./page-elements.js";

export default class WpmTable {
  public static readonly ELEMENT_ID = "wpmTable";
  public static readonly DEFAULT_IS_VISIBLE_BOOL = true;

  public readonly tableElement = wpmStatistics_table;
  public readonly toggleVisibilityButtonElement = toggleVisibilityWpmStatistics_button;

  private readonly lastGameValue = StatisticsStorage.getWpmLastGameIfExists(1);
  private readonly lastTenGamesValue = StatisticsStorage.getWpmLastTenGamesIfExists(1);
  private readonly averageToDateValue = StatisticsStorage.getWpmAverageToDateIfExists(1);
  private readonly allTimeBestValue = StatisticsStorage.getWpmAllTimeBestIfExists(1);

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    WpmTable.instanceCount++;
    if (WpmTable.instanceCount > WpmTable.instanceCountLimit) {
      throwExceededClassInstanceLimitException("WpmTable", WpmTable.instanceCountLimit);
    }
  }

  public renderAllCells() {
    this.renderLastGameCell();
    this.renderLastTenGamesCell();
    this.renderAverageToDateCell();
    this.renderAllTimeBestCell();
  }

  private renderLastGameCell() {
    this.renderCell(wpmLastGame_td, this.lastGameValue);
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
    this.renderCell(wpmLastTenGames_td, this.lastTenGamesValue);
  }

  private renderAverageToDateCell() {
    this.renderCell(wpmAverageToDate_td, this.averageToDateValue);
  }

  private renderAllTimeBestCell() {
    this.renderCell(wpmAllTimeBest_td, this.allTimeBestValue);
  }
}