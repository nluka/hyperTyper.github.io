import { gameWpmTracker_div } from "./page-elements.js";
import { MILLISECONDS_PER_SECOND, CHARACTERS_PER_WORD, MILLISECONDS_PER_MINUTE } from "../common/constants.js";
import { gameInput, gameTimer } from "./main.js";
import { throwExceededClassInstanceLimitException } from "../common/functions.js";

export default class GameWpmTracker {
  public static readonly INACTIVE_STATE_TEXT = "— WPM";
  public static readonly TOOLTIP_TEXT_TITLE = "Game WPM Tracker";
  public static readonly TOOLTIP_TEXT_BODY = "Displays gross words per minute, calculated as: (Total Characters Inputted ÷ 5) ÷ Minutes";

  private readonly element = gameWpmTracker_div;
  private intervalId: number | null = null;

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    GameWpmTracker.instanceCount++;
    if (GameWpmTracker.instanceCount > GameWpmTracker.instanceCountLimit) {
      throwExceededClassInstanceLimitException("GameWpmTracker", GameWpmTracker.instanceCountLimit);
    }
  }

  public clear() {
    this.setInnerText(GameWpmTracker.INACTIVE_STATE_TEXT);
  }

  public start() {
    this.setInnerText(this.getFormattedGrossWpmString(0));
    this.intervalId = setInterval(() => {
      this.update();
    }, MILLISECONDS_PER_SECOND);
  }

  public setInnerText(text: string) {
    this.element.innerText = text;
  }

  private update() {
    let grossWpm = 0;
    const gameTimerStartDate = gameTimer.getStartDate()
    if (gameTimerStartDate !== null) {
      grossWpm = this.calculateGrossWpm(gameInput.charactersTypedCount, gameTimerStartDate);
    }
    const grossWpmFormattedString = this.getFormattedGrossWpmString(grossWpm);
    this.setInnerText(grossWpmFormattedString);
  }

  private calculateGrossWpm(charactersTypedCount: number, startDate: Date) {
    const words = charactersTypedCount / CHARACTERS_PER_WORD;
    const minutes = (new Date().getTime() - startDate.getTime()) / MILLISECONDS_PER_MINUTE;
    const wordsPerMinute = words / minutes;
    if (wordsPerMinute < 0) {
      return 0;
    }
    return wordsPerMinute;
  }

  private getFormattedGrossWpmString(netWordsPerMinute: number) {
    return `${Math.floor(netWordsPerMinute)} WPM`;
  }

  public stop() {
    if (this.intervalId === null) {
      return;
    }
    clearInterval(this.intervalId);
    this.update();
  }
}