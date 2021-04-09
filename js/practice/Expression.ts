import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import { expression_div } from "./page-elements.js";

export default class Expression {
  public static readonly DEFAULT_TEXT = "Click the Start button or select the box below and hit Enter to play.";
  public static readonly NO_PHRASE_ITEM_COLLECTIONS_SELECTED_TEXT = "<Expression mode> is set to 'Phrase' but no <Item Collections> are selected. Please select at least 1 item collection to generate a phrase.";
  public static readonly CHEATING_TEXT = "Cheating was detected and the attempt has been terminated. If this was by error, make sure you are not using autocorrect/autocomplete/autofill.";

  public areThereIncompletedCharacters: boolean = true;

  private readonly element = expression_div;
  private spanElements: HTMLElement[] = [];
  private cursorSpanElement: HTMLSpanElement | null = null;
  private content: string | null = null;
  private author: string | null = null;
  private loadingIntervalId: number | null = null;

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    Expression.instanceCount++;
    if (Expression.instanceCount > Expression.instanceCountLimit) {
      throwExceededClassInstanceLimitException("Expression", Expression.instanceCountLimit);
    }
  }

  public startLoadingState() {
    this.element.classList.remove("error");
    this.setInnerText("Generating expression...");
    this.loadingIntervalId = setInterval(() => {
      switch (this.element.innerText) {
        case "Generating expression":
        case "Generating expression.":
        case "Generating expression..":
          this.element.innerText += ".";
          break;
        case "Generating expression...":
        default:
          this.setInnerText("Generating expression");
          break;
      }
    }, 300);
  }

  private setInnerText(text: string) {
    this.element.innerText = text;
  }

  public renderError(text: string) {
    this.element.classList.add("error");
    this.setInnerText(text);
    this.element.animate(
      [
        // keyframes
        {
          borderColor: "var(--border-color-secondary)"
        },
        {
          borderColor: "red"
        },
        {
          borderColor: "var(--border-color-secondary)"
        }
      ],
      {
        // timing options
        duration: 150,
        iterations: 1,
        easing: "ease-out"
      }
    );
  }

  public initialize(content: string, author: string) {
    this.stopLoadingState();
    this.makeUnselectable();
    this.clear();

    this.content = content;
    this.author = author;
    this.areThereIncompletedCharacters = true;

    this.renderContent(content);
    //this.renderAuthor(author);
  }

  public stopLoadingState() {
    if (this.loadingIntervalId !== null) {
      clearInterval(this.loadingIntervalId);
    }
  }

  private renderContent(content: string) {
    const contentCharacters = content.split("");
    this.spanElements = [];
    contentCharacters.forEach((character) => {
      this.renderContentSpanElement(character);
    });
    this.renderNullSpanElement();
  }

  private renderContentSpanElement(character: string) {
    const characterSpan = this.createSpanElementWithInnerText(character);
    this.element.appendChild(characterSpan);
  }

  private createSpanElementWithInnerText(text: string) {
    const spanElement = document.createElement("span");
    spanElement.innerText = text;
    this.spanElements.push(spanElement);
    return spanElement;
  }

  private renderNullSpanElement() {
    const nullSpan = this.createSpanElementWithInnerText("");
    nullSpan.classList.add("null");
    this.element.appendChild(nullSpan);
  }

  // private renderAuthor(author: string) {
  //   // not implemented yet
  // }

  public getSpanElements() {
    return this.spanElements;
  }

  private clear() {
    this.element.innerText = "";
    this.content = null;
    this.author = null;
  }

  public setDefault() {
    this.setInnerText(Expression.DEFAULT_TEXT);
  }

  public makeSelectable() {
    this.element.classList.remove("unselectable");
  }

  private makeUnselectable() {
    this.element.classList.add("unselectable");
  }

  public isCursorSet() {
    return (this.cursorSpanElement !== null);
  }

  public setCursorToToFirstCharacter() {
    const firstCharacter_span = this.element.querySelector("span");
    if (firstCharacter_span !== null) {
      this.setCursorTo(firstCharacter_span);
    }
  }

  public setCursorTo(spanElement: HTMLSpanElement) {
    spanElement.classList.add("cursor");
    this.cursorSpanElement = spanElement;
  }

  public clearCursor() {
    if (this.cursorSpanElement !== null) {
      this.removeCursorFrom(this.cursorSpanElement);
    }
  }

  private removeCursorFrom(spanElement: HTMLSpanElement) {
    spanElement.classList.remove("cursor");
    this.cursorSpanElement = null;
  }

  public labelElementAsMistake(spanElement: HTMLSpanElement) {
    spanElement.classList.add("mistake");
  }

  public isElementLabeledAsMistake(spanElement: HTMLSpanElement) {
    return spanElement.classList.contains("mistake");
  }

  public removeElementLabelMistake(spanElement: HTMLSpanElement) {
    spanElement.classList.remove("mistake");
  }

  public setElementAsIncompleted(spanElement: HTMLSpanElement) {
    spanElement.classList.remove("correct");
    spanElement.classList.remove("incorrect-non-whitespace");
    spanElement.classList.remove("incorrect-whitespace");
  }

  public setElementAsCorrect(spanElement: HTMLSpanElement) {
    spanElement.classList.remove("incorrect-non-whitespace");
    spanElement.classList.remove("incorrect-whitespace");
    spanElement.classList.add("correct");
  }

  public setElementAsIncorrect(spanElement: HTMLSpanElement) {
    spanElement.classList.remove("correct");
    if (spanElement.innerText === " ") {
      spanElement.classList.add("incorrect-whitespace");
      return;
    }
    spanElement.classList.add("incorrect-non-whitespace");
  }

  public isElementNullSpan(spanElement: HTMLSpanElement) {
    return spanElement.classList.contains("null");
  }

  public getContent() {
    return this.content;
  }

  public getAuthor() {
    return this.author;
  }
}