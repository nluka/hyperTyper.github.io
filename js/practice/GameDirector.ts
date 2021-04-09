import GameResult from "./GameResult.js";
import {
  gameTimer,
  gameWpmTracker,
  gameActionButton,
  expression,
  gameInput,
  gameStatisticsTable,
  mistakeAnalyzer,
  settings
} from "./main.js";
import Settings from "./Settings.js";
import GameText from "./GameText.js";
import Quote from "./Quote.js";
import Phrase from "./Phrase.js";
import Expression from "./Expression.js";
import GameStopCode from "./GameStopCode.js";
import StatisticsStorage from "../common/StatisticsStorage.js";
import { calculateAccuracyPercentage, calculateNetWordsPerMinute } from "../common/functions.js";

export default class GameDirector {
  private static isGameRunning: boolean;
  private static gameResult: GameResult | null;

  public static awaitGameRun() {
    GameDirector.isGameRunning = false;
    gameActionButton.enableStartState();
    GameDirector.addGameInputDuringIdleEventListener();
    GameDirector.listenForEnterKeydownEvent();
  }

  private static addGameInputDuringIdleEventListener() {
    gameInput.clearElementValue();
    gameInput.getElement().addEventListener("input", GameDirector.gameInputEventDuringIdleHandler);
  }

  private static gameInputEventDuringIdleHandler() {
    gameInput.clearElementValue();
  }

  private static listenForEnterKeydownEvent() {
    document.documentElement.addEventListener("keydown", GameDirector.keydownEventHandler);
  }

  private static keydownEventHandler(event: KeyboardEvent) {
    if (event.key === "Enter" && document.activeElement === gameInput.getElement()) {
      GameDirector.tryToRunGame();
    }
  }

  public static async tryToRunGame() {
    if (GameDirector.isGameCurrentlyRunning()) {
      return;
    }
    const wasInitializationSuccessful = await GameDirector.initializeGame();
    if (!wasInitializationSuccessful) {
      return;
    }
    if (settings.getCountdown()) {
      await gameTimer.countDownFromMs(3000);
    }
    GameDirector.startGame();
  }

  public static isGameCurrentlyRunning() {
    return GameDirector.isGameRunning;
  }

  private static async initializeGame() {
    GameDirector.initialize();
    gameTimer.clear();
    gameWpmTracker.clear();
    gameActionButton.disableStartState();
    expression.startLoadingState();
    try {
      var gameText: GameText = await GameDirector.getGameText();
    } catch (error) {
      expression.stopLoadingState();
      if (error === Phrase.NO_ITEM_COLLECTIONS_SELECTED) {
        expression.renderError(Expression.NO_PHRASE_ITEM_COLLECTIONS_SELECTED_TEXT);
      }
      GameDirector.awaitGameRun();
      return false;
    }
    expression.initialize(gameText.content, gameText.author);
    gameInput.initialize();
    mistakeAnalyzer.initialize(gameText.content.length);
    return true;
  }

  private static stopListeningForEnterKeydownEvent() {
    document.documentElement.removeEventListener("keydown", GameDirector.keydownEventHandler);
  }

  private static async getGameText() {
    switch (settings.getExpressionMode()) {
      case Settings.EXPRESSION_MODES.QUOTE:
        return await Quote.get();
      case Settings.EXPRESSION_MODES.PHRASE:
        if (settings.getPhraseItemCollections().length === 0) {
          throw Phrase.NO_ITEM_COLLECTIONS_SELECTED;
        }
        return Phrase.get();
      default:
        throw `"${settings.getExpressionMode()}" is not a valid expression mode`;
    }
  }

  private static initialize() {
    GameDirector.stopListeningForEnterKeydownEvent();
    GameDirector.initializeGameState();
    GameDirector.clearGameResult();
  }

  private static initializeGameState() {
    GameDirector.isGameRunning = true;
  }

  private static clearGameResult() {
    GameDirector.gameResult = null;
  }

  private static startGame() {
    expression.setCursorToToFirstCharacter();
    gameInput.setPageFocusToElement();
    GameDirector.removeGameInputDuringIdleEventListener();
    GameDirector.listenForGameEvent();
    gameTimer.start();
    gameWpmTracker.start();
    gameActionButton.enableAbortState();
  }

  private static removeGameInputDuringIdleEventListener() {
    gameInput.getElement().removeEventListener("input", GameDirector.gameInputEventDuringIdleHandler);
  }

  private static listenForGameEvent() {
    gameInput.getElement().addEventListener("input", GameDirector.updateGame);
  }

  private static updateGame() {
    gameInput.currentCharacterCount = gameInput.completedCharacters.length + gameInput.getElementContentsLength();
    if (GameDirector.didCheatingOccur()) {
      GameDirector.handleCheating();
      return;
    }
    GameDirector.updateCharactersTypedCount();
    GameDirector.updateGameState();
    if (GameDirector.isGameCompleted()) {
      GameDirector.stopGame(GameStopCode.COMPLETED);
    }
  }

  private static didCheatingOccur() {
    return (gameInput.currentCharacterCount - gameInput.previousCharacterCount) > 1;
  }

  private static handleCheating() {
    GameDirector.stopGame(GameStopCode.PLAYER_CHEATED);
  }

  private static updateCharactersTypedCount() {
    if (gameInput.currentCharacterCount - gameInput.previousCharacterCount === 1) {
      gameInput.charactersTypedCount++;
    }
  }

  private static updateGameState() {
    expression.clearCursor();
    expression.areThereIncompletedCharacters = false;
    gameInput.containsMistakes = false;
    gameInput.unmarkElementAsIncorrect();

    const characterCountDifference = gameInput.currentCharacterCount - gameInput.previousCharacterCount;
    let numberOfCharactersDeletedThisEvent = 0;
    if (characterCountDifference < 0) {
      numberOfCharactersDeletedThisEvent += Math.abs(characterCountDifference);
    }

    const indexOfFirstSpanElementThatCouldHaveChanged = gameInput.completedCharacters.length;
    const indexOfLastSpanElementThatCouldHaveChanged = numberOfCharactersDeletedThisEvent + gameInput.currentCharacterCount;
    const indexOfFinalSpanElement = expression.getSpanElements().length - 1;

    // Loop through every expression span element whose state could have changed since last update
    for (let i = indexOfFirstSpanElementThatCouldHaveChanged; i <= indexOfLastSpanElementThatCouldHaveChanged && i <= indexOfFinalSpanElement; i++) {
      const spanElement = expression.getSpanElements()[i] as HTMLSpanElement;
      const character = gameInput.getElementContentsAsArray()[i - gameInput.completedCharacters.length] as string;
      const isThereMatchingInputForSpan = ((character !== undefined) && (character !== null));
      const isInputtedCharacterCorrect = (character === spanElement.innerText);
      if (!isThereMatchingInputForSpan) { // || expression.isElementNullSpan(spanElement)
        GameDirector.handleNoMatchingInput(spanElement);
      } else if (!isInputtedCharacterCorrect) {
        GameDirector.handleIncorrectInput(character, spanElement, i);
        if (settings.getInstantDeath()) {
          GameDirector.handleInstantDeath();
          return;
        }
      } else {
        GameDirector.handleCorrectInput(spanElement);
      }
    }

    gameInput.previousCharacterCount = gameInput.currentCharacterCount;
    gameInput.updateCompletedCharacters();
  }

  private static handleNoMatchingInput(spanElement: HTMLSpanElement) {
    if (!expression.isElementNullSpan(spanElement)) {
      expression.areThereIncompletedCharacters = true;
    }
    expression.setElementAsIncompleted(spanElement);
    expression.removeElementLabelMistake(spanElement);
    if (!expression.isCursorSet()) {
      expression.setCursorTo(spanElement);
    }
  }

  private static handleIncorrectInput(characterInputted: string, spanElement: HTMLSpanElement, spanElementIndex: number) {
    expression.setElementAsIncorrect(spanElement);
    gameInput.containsMistakes = true;
    gameInput.markElementAsIncorrect();
    if (expression.isElementLabeledAsMistake(spanElement)) {
      return;
    }
    gameInput.totalMistakeCount++;
    expression.labelElementAsMistake(spanElement);
    if (!expression.isElementNullSpan(spanElement)) {
      mistakeAnalyzer.addMistake(spanElementIndex, characterInputted);
    }
  }

  private static handleInstantDeath() {
    GameDirector.stopGame(GameStopCode.INSTANT_DEATH);
  }

  private static handleCorrectInput(spanElement: HTMLSpanElement) {
    expression.setElementAsCorrect(spanElement);
  }

  private static isGameCompleted() {
    return !gameInput.containsMistakes && !expression.areThereIncompletedCharacters;
  }

  public static stopGame(gameStopCode: string) {
    gameTimer.stop();
    gameWpmTracker.stop();
    gameActionButton.disableAbortState();
    expression.clearCursor();
    expression.makeSelectable();
    GameDirector.stopListeningForGameEvent();
    gameInput.cleanup();
    GameDirector.performOperationsSpecificToStopCode(gameStopCode);
    if (settings.getTrackStatistics()) {
      StatisticsStorage.incrementPlaytimeInSecondsBy(gameTimer.getTimeElapsedInSeconds() as number);
    }
    GameDirector.awaitGameRun();
  }

  private static stopListeningForGameEvent() {
    gameInput.getElement().removeEventListener("input", GameDirector.updateGame);
  }

  private static performOperationsSpecificToStopCode(gameStopCode: string) {
    const isTrackStatisticsOn = settings.getTrackStatistics();
    switch (gameStopCode) {
      case GameStopCode.COMPLETED: {
        GameDirector.updateGameResult();
        gameStatisticsTable.updateForGameCompletion(GameDirector.gameResult as GameResult);
        mistakeAnalyzer.render(expression.getContent() as string, gameInput.totalMistakeCount);
        if (isTrackStatisticsOn) {
          StatisticsStorage.updateStatisticsSpecificToGameCompletion(
            GameDirector.gameResult?.netWordsPerMinute as number,
            GameDirector.gameResult?.accuracyPercentage as number
          );
        }
        return;
      }
      case GameStopCode.ABORTED: {
        gameTimer.clear();
        gameWpmTracker.clear();
        expression.setDefault();
        if (isTrackStatisticsOn) {
          StatisticsStorage.incrementCount(StatisticsStorage.KEYS.GAMES_ABORTED);
        }
        return;
      }
      case GameStopCode.INSTANT_DEATH: {
        gameInput.showDisqualificationPlaceholderText();
        if (isTrackStatisticsOn) {
          StatisticsStorage.incrementCount(StatisticsStorage.KEYS.GAMES_DISQUALIFIED);
        }
        return;
      }
      case GameStopCode.PLAYER_CHEATED: {
        gameTimer.clear();
        gameWpmTracker.clear();
        expression.renderError(Expression.CHEATING_TEXT);
        if (isTrackStatisticsOn) {
          StatisticsStorage.incrementCount(StatisticsStorage.KEYS.GAMES_CHEATED);
        }
        return;
      }
    }
  }

  private static updateGameResult() {
    const textLength = expression.getContent()?.length as number;
    const secondsElapsed = gameTimer.getTimeElapsedInSeconds() as number;

    GameDirector.gameResult = new GameResult(
      calculateNetWordsPerMinute(textLength, secondsElapsed),
      calculateAccuracyPercentage(textLength, gameInput.charactersTypedCount, gameInput.totalMistakeCount),
      gameInput.totalMistakeCount,
      secondsElapsed,
      textLength
    );
  }
}