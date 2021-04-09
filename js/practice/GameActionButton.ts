import { gameAction_button } from "./page-elements.js";
import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import GameDirector from "./GameDirector.js";
import GameStopCode from "./GameStopCode.js";


export default class GameActionButton {
  private readonly element = gameAction_button;

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    GameActionButton.instanceCount++;
    if (GameActionButton.instanceCount > GameActionButton.instanceCountLimit) {
      throwExceededClassInstanceLimitException("GameActionButton", GameActionButton.instanceCountLimit);
    }
  }

  private setInnerText(text: string) {
    this.element.innerText = text;
  }

  public enableStartState() {
    this.setInnerText("Start");
    this.element.addEventListener("click", startButtonClickEventHandler);
    this.element.removeAttribute("disabled");
  }

  public disableStartState() {
    this.element.blur();
    this.element.setAttribute("disabled", `${true}`);
    this.element.removeEventListener("click", startButtonClickEventHandler);
    this.setInnerText("···");
  }

  public enableAbortState() {
    this.setInnerText("Abort");
    this.element.addEventListener("click", abortButtonClickEventHandler);
    this.element.removeAttribute("disabled");
  }

  public disableAbortState() {
    this.element.blur();
    this.element.setAttribute("disabled", `${true}`);
    this.element.removeEventListener("click", abortButtonClickEventHandler);
    this.setInnerText("···");
  }
}

function startButtonClickEventHandler() {
  GameDirector.tryToRunGame();
}

function abortButtonClickEventHandler() {
  GameDirector.stopGame(GameStopCode.ABORTED);
}