import ElementVisibility from "../common/ElementVisibility.js";
import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import CharacterAnalysis from "./CharacterAnalysis.js";
import { analyzedExpression_div, characterAnalysis_div, mistakeAnalyzer_div, toggleVisibilityMistakeAnalyzer_button } from "./page-elements.js";

export default class MistakeAnalyzer {
  public static readonly ELEMENT_ID = "mistakeAnalyzer";
  public static readonly DEFAULT_IS_VISIBLE_BOOL = true;
  public static readonly NO_MISTAKES_MADE_MESSAGE = "Congratulations, you made no mistakes!";
  public static readonly DEFAULT_CHARACTER_ANALYSIS_TEXT = "Click a highlighted character for details";

  public readonly containerElement = mistakeAnalyzer_div;
  public readonly toggleVisibilityButtonElement = toggleVisibilityMistakeAnalyzer_button;
  private readonly analyzedExpressionElement = analyzedExpression_div;
  private readonly characterAnalysisElement = characterAnalysis_div;
  private cursorSpanElement: HTMLSpanElement | null = null;
  private map: Map<number, CharacterAnalysis> = new Map();

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    MistakeAnalyzer.instanceCount++;
    if (MistakeAnalyzer.instanceCount > MistakeAnalyzer.instanceCountLimit) {
      throwExceededClassInstanceLimitException("MistakeAnalyzer", MistakeAnalyzer.instanceCountLimit);
    }
  }

  public initialize(textLength: number) {
    this.map = new Map();
    for (let i = 0; i < textLength; i++) {
      this.map.set(i, new CharacterAnalysis());
    }
  }

  public addMistake(index: number, incorrectInput: string) {
    const previousMapValue = this.map.get(index) as CharacterAnalysis;
    previousMapValue.incrementMistakeCount();
    previousMapValue.addIncorrectInput(incorrectInput);
    // const previousMistakeCount = previousMapValue?.getMistakeCount();
    // const newMistakeCount = previousMistakeCount + 1;
    // const previousIncorrectCharacters = previousMapValue.incorrectInputs;
    // let newIncorrectCharacters = previousIncorrectCharacters;
    // newIncorrectCharacters.push(incorrectInput);
    // this.set(index, newMistakeCount, newIncorrectCharacters);
  }

  // set(index: number, mistakeCount: number, incorrectInputs: string[]) {
  //   this.map.set(
  //     index,
  //     {
  //       mistakeCount: mistakeCount,
  //       incorrectInputs: incorrectInputs
  //     }
  //   );
  // }

  public render(gameTextContent: string, mistakeCount: number) {
    if (mistakeCount === 0) {
      this.setAnalyzedExpressionInnerText(MistakeAnalyzer.NO_MISTAKES_MADE_MESSAGE);
      return;
    }

    this.clearElementInnerText(this.analyzedExpressionElement);
    this.setCharacterAnalysisInnerText(MistakeAnalyzer.DEFAULT_CHARACTER_ANALYSIS_TEXT);

    gameTextContent.split("").forEach((character, index) => {
      this.renderExpressionSpan(character, index);
    });

    ElementVisibility.set(this.characterAnalysisElement, true);
  }

  private setAnalyzedExpressionInnerText(text: string) {
    this.analyzedExpressionElement.innerText = text;
  }

  private setCharacterAnalysisInnerText(text: string) {
    this.characterAnalysisElement.innerText = text;
  }

  private clearElementInnerText(element: HTMLElement) {
    element.innerText = "";
  }

  private renderExpressionSpan(character: string, index: number) {
    const spanElement = this.createSpanWithText(character);
    this.analyzedExpressionElement.appendChild(spanElement);

    const mapValueAtIndex = this.map.get(index) as CharacterAnalysis;
    const mistakeCount = mapValueAtIndex.getMistakeCount();

    if (mistakeCount <= 0) {
      return;
    }

    this.applyStylesForSpan(spanElement, mistakeCount);
    this.addClickEventListenerForExpressionSpan(spanElement, mapValueAtIndex);
  }

  private createSpanWithText(text: string) {
    const new_span = document.createElement("span");
    new_span.innerText = text;
    return new_span;
  }

  private applyStylesForSpan(spanElement: HTMLSpanElement, mistakeCount: number) {
    if (mistakeCount < 1) {
      throw `mistakeCount (${mistakeCount}) < 1`;
    }
    if (mistakeCount > 3) {
      spanElement.setAttribute("data-mistake-count", ">3");
      return;
    }
    spanElement.setAttribute("data-mistake-count", `${mistakeCount}`);
  }

  private addClickEventListenerForExpressionSpan(spanElement: HTMLSpanElement, mapValue: CharacterAnalysis) {
    const mistakeCount = mapValue.getMistakeCount();
    const incorrectInputs = mapValue.getIncorrectInputs();
    spanElement.addEventListener("click", () => {
      this.clearExpressionCursor();
      this.setExpressionCursorTo(spanElement);
      let text = `Mistakes [${mistakeCount}]: `;
      incorrectInputs.forEach((character, index) => {
        if (character === " ") {
          character = "⎵";
        }
        text += character;
        if (index < incorrectInputs.length - 1) {
          text += " ";
        }
      });
      this.setCharacterAnalysisInnerText(text);
    });
  }

  private clearExpressionCursor() {
    if (this.cursorSpanElement !== null) {
      this.removeExpressionCursorFrom(this.cursorSpanElement);
    }
  }

  private removeExpressionCursorFrom(spanElement: HTMLSpanElement) {
    spanElement.classList.remove("cursor");
    this.cursorSpanElement = null;
  }

  private setExpressionCursorTo(spanElement: HTMLSpanElement) {
    spanElement.classList.add("cursor");
    this.cursorSpanElement = spanElement;
  }
}