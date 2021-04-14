import { MILLISECONDS_PER_SECOND, SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "../common/constants.js";
import { sleepMs, throwExceededClassInstanceLimitException } from "../common/functions.js";
import { gameTimer_div } from "./page-elements.js";
import Sound from "./Sound.js";

export default class GameTimer {
  public static readonly INACTIVE_STATE_TEXT = "--:--";

  private readonly element = gameTimer_div;
  private intervalId: ReturnType<typeof setTimeout> | null = null;
  private startDate: Date | null = null;
  private stopDate: Date | null = null;
  private timeElapsedInSeconds: number | null = null;

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    GameTimer.instanceCount++;
    if (GameTimer.instanceCount > GameTimer.instanceCountLimit) {
      throwExceededClassInstanceLimitException("GameTimer", GameTimer.instanceCountLimit);
    }
  }

  public async countDownMs(milliseconds: number) {
    for (let secondsRemaining = milliseconds / MILLISECONDS_PER_SECOND; secondsRemaining >= 0; secondsRemaining--) {
      if (secondsRemaining > 0) {
        this.countdownTick(secondsRemaining);
        await sleepMs(MILLISECONDS_PER_SECOND);
      } else {
        this.finalCountdownTick();
      }
    }
  }

  private countdownTick(secondsRemaining: number) {
    Sound.playEffect(Sound.COUNTDOWN_BEEP_SHORT);
    this.setInnerText(`${secondsRemaining}`);
    this.setInnerTextColorForCountdownTick(secondsRemaining);
    this.animateInnerTextSize();
  }

  private setInnerText(text: string) {
    this.element.innerText = text;
  }

  private setInnerTextColorForCountdownTick(secondsRemaining: number) {
    if (secondsRemaining >= 3) {
      this.element.style.color = "rgb(255,0,0)";
      return;
    }
    if (secondsRemaining === 2) {
      this.element.style.color = "rgb(255,125,0)";
      return;
    }
    this.element.style.color = "rgb(255,255,0)";
  }

  private animateInnerTextSize() {
    const normalFontSizePx = parseInt(getComputedStyle(this.element).fontSize);
    this.element.animate(
      [
        // keyframes
        {
          fontSize: `${normalFontSizePx * 1.5}px`
        },
        {
          fontSize: `${normalFontSizePx}px`
        }
      ],
      {
        // timing options
        duration: MILLISECONDS_PER_SECOND / 8,
        iterations: 1,
        easing: "ease-in"
      }
    );
  }

  private finalCountdownTick() {
    Sound.playEffect(Sound.COUNTDOWN_BEEP_LONG);
    this.animateInnerTextColorForFinalCountdownTick();
  }

  private animateInnerTextColorForFinalCountdownTick() {
    this.element.animate(
      [
        // keyframes
        {
          color: "rgb(150,255,150)"
        },
        {
          color: "white"
        }
      ],
      {
        // timing options
        duration: MILLISECONDS_PER_SECOND,
        iterations: 1,
        easing: "ease-in"
      }
    );
    setTimeout(() => {
      this.removeInlineStyles();
    }, MILLISECONDS_PER_SECOND);
  }

  private removeInlineStyles() {
    this.element.removeAttribute("style");
  }

  public start() {
    this.setInnerText("0:00");
    this.startDate = new Date();
    this.intervalId = setInterval(() => {
      this.updateInnerText();
    }, MILLISECONDS_PER_SECOND / 10);
  }

  private updateInnerText() {
    const secondsElapsedFloored = Math.floor(this.getSecondsElapsedSinceStartDate());

    this.setInnerText(
      this.getFormattedTimeString(secondsElapsedFloored)
    );
  }

  public getSecondsElapsedSinceStartDate() {
    if (this.startDate !== null && this.startDate !== undefined) {
      return (new Date().getTime() - this.startDate.getTime()) / MILLISECONDS_PER_SECOND;
    }
    throw "this.startDate is null or undefined";
  }

  private getFormattedTimeString(seconds: number) {
    let timeString = "";
    let hours = 0;
    let minutes = 0;

    while (seconds >= SECONDS_PER_HOUR) {
      hours++;
      seconds -= SECONDS_PER_HOUR;
    }
    while (seconds >= SECONDS_PER_MINUTE) {
      minutes++;
      seconds -= SECONDS_PER_MINUTE;
    }

    if (hours > 0) {
      timeString = `${hours}:`;
      if (minutes < 10) {
        timeString += "0"; // to have h:mm:ss instead of h:m:ss
      }
    }
    timeString += `${minutes}:`;
    if (seconds < 10) {
      timeString += "0"; // to have mm:ss instead of mm:s
    }
    timeString += seconds;
    return timeString;
  }

  public stop() {
    if (this.intervalId === null || this.startDate === null) {
      return;
    }
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.stopDate = new Date();
    this.timeElapsedInSeconds = (this.stopDate.getTime() - this.startDate.getTime()) / MILLISECONDS_PER_SECOND;
  }

  public getStartDate() {
    return this.startDate;
  }

  public getTimeElapsedInSeconds() {
    return this.timeElapsedInSeconds;
  }

  public clear() {
    this.setInnerText(GameTimer.INACTIVE_STATE_TEXT);
  }
}