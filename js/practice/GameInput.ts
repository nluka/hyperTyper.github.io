import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import { game_input } from "./page-elements.js";

export default class GameInput {
  private readonly element = game_input;

  public completedCharacters: string[] = [];
  public currentCharacterCount = 0;
  public previousCharacterCount = 0;
  public charactersTypedCount = 0;
  public containsMistakes = false;
  public totalMistakeCount = 0;

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    GameInput.instanceCount++;
    if (GameInput.instanceCount > GameInput.instanceCountLimit) {
      throwExceededClassInstanceLimitException("GameInput", GameInput.instanceCountLimit);
    }
  }

  public getElement() {
    return this.element;
  }

  public clearElementValue() {
    this.element.value = "";
  }

  public getElementValue() {
    return this.element.value;
  }

  public getElementContentsAsArray() {
    return this.getElementValue().split("");
  }

  public getElementContentsLength() {
    return this.getElementContentsAsArray().length;
  }

  public initialize() {
    this.resetPublicFields();
    this.element.removeAttribute("placeholder");
    this.element.focus();
  }

  private resetPublicFields() {
    this.completedCharacters = [];
    this.currentCharacterCount = 0;
    this.previousCharacterCount = 0;
    this.charactersTypedCount = 0;
    this.containsMistakes = false;
    this.totalMistakeCount = 0;
  }

  public setPageFocusToElement() {
    this.element.focus();
  }

  public checkForCheating() {
    return (this.currentCharacterCount - this.previousCharacterCount) > 1;
  }

  public markElementAsIncorrect() {
    this.element.classList.add("player-input-incorrect");
  }

  public unmarkElementAsIncorrect() {
    this.element.classList.remove("player-input-incorrect");
  }

  public updateCompletedCharacters() {
    const elementContents = this.getElementContentsAsArray();
    const lastElementContentsIndex = this.getElementContentsLength() - 1;
    if (this.containsMistakes || elementContents[lastElementContentsIndex] !== " ") {
      return;
    }
    elementContents.forEach((character) => {
      this.completedCharacters.push(character);
    });
    this.clearElementValue();
  }

  public cleanup() {
    this.clearElementValue();
    this.unmarkElementAsIncorrect();
  }

  public showDisqualificationPlaceholderText() {
    console.log(1)
    this.element.setAttribute("placeholder", "Disqualified (instant death was on)");
  }
}