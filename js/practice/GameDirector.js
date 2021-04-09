var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import GameResult from "./GameResult.js";
import { gameTimer, gameWpmTracker, gameActionButton, expression, gameInput, gameStatisticsTable, mistakeAnalyzer, settings } from "./main.js";
import Settings from "./Settings.js";
import Quote from "./Quote.js";
import Phrase from "./Phrase.js";
import Expression from "./Expression.js";
import GameStopCode from "./GameStopCode.js";
import StatisticsStorage from "../common/StatisticsStorage.js";
import { calculateAccuracyPercentage, calculateNetWordsPerMinute } from "../common/functions.js";
var GameDirector = /** @class */ (function () {
    function GameDirector() {
    }
    GameDirector.awaitGameRun = function () {
        GameDirector.isGameRunning = false;
        gameActionButton.enableStartState();
        GameDirector.addGameInputDuringIdleEventListener();
        GameDirector.listenForEnterKeydownEvent();
    };
    GameDirector.addGameInputDuringIdleEventListener = function () {
        gameInput.clearElementValue();
        gameInput.getElement().addEventListener("input", GameDirector.gameInputEventDuringIdleHandler);
    };
    GameDirector.gameInputEventDuringIdleHandler = function () {
        gameInput.clearElementValue();
    };
    GameDirector.listenForEnterKeydownEvent = function () {
        document.documentElement.addEventListener("keydown", GameDirector.keydownEventHandler);
    };
    GameDirector.keydownEventHandler = function (event) {
        if (event.key === "Enter" && document.activeElement === gameInput.getElement()) {
            GameDirector.tryToRunGame();
        }
    };
    GameDirector.tryToRunGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wasInitializationSuccessful;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (GameDirector.isGameCurrentlyRunning()) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, GameDirector.initializeGame()];
                    case 1:
                        wasInitializationSuccessful = _a.sent();
                        if (!wasInitializationSuccessful) {
                            return [2 /*return*/];
                        }
                        if (!settings.getCountdown()) return [3 /*break*/, 3];
                        return [4 /*yield*/, gameTimer.countDownFromMs(3000)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        GameDirector.startGame();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameDirector.isGameCurrentlyRunning = function () {
        return GameDirector.isGameRunning;
    };
    GameDirector.initializeGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gameText, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        GameDirector.initialize();
                        gameTimer.clear();
                        gameWpmTracker.clear();
                        gameActionButton.disableStartState();
                        expression.startLoadingState();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, GameDirector.getGameText()];
                    case 2:
                        gameText = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        expression.stopLoadingState();
                        if (error_1 === Phrase.NO_ITEM_COLLECTIONS_SELECTED) {
                            expression.renderError(Expression.NO_PHRASE_ITEM_COLLECTIONS_SELECTED_TEXT);
                        }
                        GameDirector.awaitGameRun();
                        return [2 /*return*/, false];
                    case 4:
                        expression.initialize(gameText.content, gameText.author);
                        gameInput.initialize();
                        mistakeAnalyzer.initialize(gameText.content.length);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    GameDirector.stopListeningForEnterKeydownEvent = function () {
        document.documentElement.removeEventListener("keydown", GameDirector.keydownEventHandler);
    };
    GameDirector.getGameText = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = settings.getExpressionMode();
                        switch (_a) {
                            case Settings.EXPRESSION_MODES.QUOTE: return [3 /*break*/, 1];
                            case Settings.EXPRESSION_MODES.PHRASE: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, Quote.get()];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        if (settings.getPhraseItemCollections().length === 0) {
                            throw Phrase.NO_ITEM_COLLECTIONS_SELECTED;
                        }
                        return [2 /*return*/, Phrase.get()];
                    case 4: throw "\"" + settings.getExpressionMode() + "\" is not a valid expression mode";
                }
            });
        });
    };
    GameDirector.initialize = function () {
        GameDirector.stopListeningForEnterKeydownEvent();
        GameDirector.initializeGameState();
        GameDirector.clearGameResult();
    };
    GameDirector.initializeGameState = function () {
        GameDirector.isGameRunning = true;
    };
    GameDirector.clearGameResult = function () {
        GameDirector.gameResult = null;
    };
    GameDirector.startGame = function () {
        expression.setCursorToToFirstCharacter();
        gameInput.setPageFocusToElement();
        GameDirector.removeGameInputDuringIdleEventListener();
        GameDirector.listenForGameEvent();
        gameTimer.start();
        gameWpmTracker.start();
        gameActionButton.enableAbortState();
    };
    GameDirector.removeGameInputDuringIdleEventListener = function () {
        gameInput.getElement().removeEventListener("input", GameDirector.gameInputEventDuringIdleHandler);
    };
    GameDirector.listenForGameEvent = function () {
        gameInput.getElement().addEventListener("input", GameDirector.updateGame);
    };
    GameDirector.updateGame = function () {
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
    };
    GameDirector.didCheatingOccur = function () {
        return (gameInput.currentCharacterCount - gameInput.previousCharacterCount) > 1;
    };
    GameDirector.handleCheating = function () {
        GameDirector.stopGame(GameStopCode.PLAYER_CHEATED);
    };
    GameDirector.updateCharactersTypedCount = function () {
        if (gameInput.currentCharacterCount - gameInput.previousCharacterCount === 1) {
            gameInput.charactersTypedCount++;
        }
    };
    GameDirector.updateGameState = function () {
        expression.clearCursor();
        expression.areThereIncompletedCharacters = false;
        gameInput.containsMistakes = false;
        gameInput.unmarkElementAsIncorrect();
        var characterCountDifference = gameInput.currentCharacterCount - gameInput.previousCharacterCount;
        var numberOfCharactersDeletedThisEvent = 0;
        if (characterCountDifference < 0) {
            numberOfCharactersDeletedThisEvent += Math.abs(characterCountDifference);
        }
        var indexOfFirstSpanElementThatCouldHaveChanged = gameInput.completedCharacters.length;
        var indexOfLastSpanElementThatCouldHaveChanged = numberOfCharactersDeletedThisEvent + gameInput.currentCharacterCount;
        var indexOfFinalSpanElement = expression.getSpanElements().length - 1;
        // Loop through every expression span element whose state could have changed since last update
        for (var i = indexOfFirstSpanElementThatCouldHaveChanged; i <= indexOfLastSpanElementThatCouldHaveChanged && i <= indexOfFinalSpanElement; i++) {
            var spanElement = expression.getSpanElements()[i];
            var character = gameInput.getElementContentsAsArray()[i - gameInput.completedCharacters.length];
            var isThereMatchingInputForSpan = ((character !== undefined) && (character !== null));
            var isInputtedCharacterCorrect = (character === spanElement.innerText);
            if (!isThereMatchingInputForSpan) { // || expression.isElementNullSpan(spanElement)
                GameDirector.handleNoMatchingInput(spanElement);
            }
            else if (!isInputtedCharacterCorrect) {
                GameDirector.handleIncorrectInput(character, spanElement, i);
                if (settings.getInstantDeath()) {
                    GameDirector.handleInstantDeath();
                    return;
                }
            }
            else {
                GameDirector.handleCorrectInput(spanElement);
            }
        }
        gameInput.previousCharacterCount = gameInput.currentCharacterCount;
        gameInput.updateCompletedCharacters();
    };
    GameDirector.handleNoMatchingInput = function (spanElement) {
        if (!expression.isElementNullSpan(spanElement)) {
            expression.areThereIncompletedCharacters = true;
        }
        expression.setElementAsIncompleted(spanElement);
        expression.removeElementLabelMistake(spanElement);
        if (!expression.isCursorSet()) {
            expression.setCursorTo(spanElement);
        }
    };
    GameDirector.handleIncorrectInput = function (characterInputted, spanElement, spanElementIndex) {
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
    };
    GameDirector.handleInstantDeath = function () {
        GameDirector.stopGame(GameStopCode.INSTANT_DEATH);
    };
    GameDirector.handleCorrectInput = function (spanElement) {
        expression.setElementAsCorrect(spanElement);
    };
    GameDirector.isGameCompleted = function () {
        return !gameInput.containsMistakes && !expression.areThereIncompletedCharacters;
    };
    GameDirector.stopGame = function (gameStopCode) {
        gameTimer.stop();
        gameWpmTracker.stop();
        gameActionButton.disableAbortState();
        expression.clearCursor();
        expression.makeSelectable();
        GameDirector.stopListeningForGameEvent();
        gameInput.cleanup();
        GameDirector.performOperationsSpecificToStopCode(gameStopCode);
        if (settings.getTrackStatistics()) {
            StatisticsStorage.incrementPlaytimeInSecondsBy(gameTimer.getTimeElapsedInSeconds());
        }
        GameDirector.awaitGameRun();
    };
    GameDirector.stopListeningForGameEvent = function () {
        gameInput.getElement().removeEventListener("input", GameDirector.updateGame);
    };
    GameDirector.performOperationsSpecificToStopCode = function (gameStopCode) {
        var _a, _b;
        var isTrackStatisticsOn = settings.getTrackStatistics();
        switch (gameStopCode) {
            case GameStopCode.COMPLETED: {
                GameDirector.updateGameResult();
                gameStatisticsTable.updateForGameCompletion(GameDirector.gameResult);
                mistakeAnalyzer.render(expression.getContent(), gameInput.totalMistakeCount);
                if (isTrackStatisticsOn) {
                    StatisticsStorage.updateStatisticsSpecificToGameCompletion((_a = GameDirector.gameResult) === null || _a === void 0 ? void 0 : _a.netWordsPerMinute, (_b = GameDirector.gameResult) === null || _b === void 0 ? void 0 : _b.accuracyPercentage);
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
    };
    GameDirector.updateGameResult = function () {
        var _a;
        var textLength = (_a = expression.getContent()) === null || _a === void 0 ? void 0 : _a.length;
        var secondsElapsed = gameTimer.getTimeElapsedInSeconds();
        GameDirector.gameResult = new GameResult(calculateNetWordsPerMinute(textLength, secondsElapsed), calculateAccuracyPercentage(textLength, gameInput.charactersTypedCount, gameInput.totalMistakeCount), gameInput.totalMistakeCount, secondsElapsed, textLength);
    };
    return GameDirector;
}());
export default GameDirector;
