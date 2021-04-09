import {
  gameStatistics_table,
  toggleVisibilityGameStatisticsTable_button,
  wpm_td,
  accuracy_td,
  textLength_td,
  timeElapsed_td
} from "./page-elements.js";

import GameResult from "./GameResult";
import { throwExceededClassInstanceLimitException } from "../common/functions.js";

export default class GameStatisticsTable {
  public static readonly ELEMENT_ID = "gameStatisticsTable";
  public static readonly DEFAULT_IS_VISIBLE_BOOL = true;

  public static readonly TOOLTIP_NET_WORDS_PER_MINUTE_TEXT_TITLE = "Net Words Per Minute";
  public static readonly TOOLTIP_NET_WORDS_PER_MINUTE_TEXT_BODY = "Calculated as: (Text Length ÷ 5) ÷ Minutes";
  public static readonly TOOLTIP_ACCURACY_PERCENTAGE_TEXT_TITLE = "Accuracy Percentage";
  public static readonly TOOLTIP_ACCURACY_PERCENTAGE_TEXT_BODY = "Calculated as: (Text Length ÷ [Text Length + Mistakes]) × 100%";

  public readonly tableElement = gameStatistics_table;
  public readonly toggleVisibilityButtonElement = toggleVisibilityGameStatisticsTable_button;

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    GameStatisticsTable.instanceCount++;
    if (GameStatisticsTable.instanceCount > GameStatisticsTable.instanceCountLimit) {
      throwExceededClassInstanceLimitException("GameStatisticsTable", GameStatisticsTable.instanceCountLimit);
    }
  }

  public updateForGameCompletion(gameResult: GameResult) {
    this.setWpmCellInnerText(gameResult.netWordsPerMinute, 1);
    this.setAccuracyCellInnerText(gameResult.accuracyPercentage, 1);
    this.setTextLengthCharsCellInnerText(gameResult.textLength, 0);
    this.setTimeElapsedCellInnerText(gameResult.secondsElapsed, 2);
  }

  private setCellElementInnerText(cellElement: HTMLTableCellElement, value: number, decimalPlaces: number) {
    cellElement.innerText = value.toFixed(decimalPlaces);
  }

  private setWpmCellInnerText(wpm: number, decimalPlaces: number) {
    this.setCellElementInnerText(wpm_td, wpm, decimalPlaces);
  }

  private setAccuracyCellInnerText(accuracy: number, decimalPlaces: number) {
    this.setCellElementInnerText(accuracy_td, accuracy, decimalPlaces);
  }

  private setTextLengthCharsCellInnerText(textLength: number, decimalPlaces: number) {
    this.setCellElementInnerText(textLength_td, textLength, decimalPlaces);
  }

  private setTimeElapsedCellInnerText(seconds: number, decimalPlaces: number) {
    this.setCellElementInnerText(timeElapsed_td, seconds, decimalPlaces);
  }
}