import { handleInternetExplorer } from "../common/functions.js";
import { accuracyTooltipIcon_div, expressionModeTooltipIcon_div, gameWpmTrackerTooltipIcon_div, instantDeathTooltipIcon_div, keyboardVisualTooltipIcon_div, phraseItemCollectionsTooltipIcon_div, phrasePunctuationFrequencyTooltipIcon_div, punctuationTooltipIcon_div, trackStatisticsTooltipIcon_div, wpmTooltipIcon_div } from "./page-elements.js";
import PageLoader from "../common/PageLoader.js";
import Navbar from "../common/Navbar.js";
import Settings from "./Settings.js";
import GameTimer from "./GameTimer.js";
import GameWpmTracker from "./GameWpmTracker.js";
import GameActionButton from "./GameActionButton.js";
import Expression from "./Expression.js";
import GameInput from "./GameInput.js";
import KeyboardVisual from "./KeyboardVisual.js";
import SettingsMenu from "./SettingsMenu.js";
import GameStatisticsTable from "./GameStatisticsTable.js";
import MistakeAnalyzer from "./MistakeAnalyzer.js";
import GameDirector from "./GameDirector.js";
import Sound from "./Sound.js";
import ElementVisibility from "../common/ElementVisibility.js";
import Tooltip from "../common/Tooltip.js";
handleInternetExplorer();
export var pageLoader = new PageLoader();
export var navbar = new Navbar();
export var settings = new Settings();
export var gameTimer = new GameTimer();
export var gameWpmTracker = new GameWpmTracker();
export var gameActionButton = new GameActionButton();
export var expression = new Expression();
export var gameInput = new GameInput();
export var keyboardVisual = new KeyboardVisual();
export var settingsMenu = new SettingsMenu();
export var gameStatisticsTable = new GameStatisticsTable();
export var mistakeAnalyzer = new MistakeAnalyzer();
function main() {
    initializePage();
    GameDirector.awaitGameRun();
    pageLoader.removeOverlay();
}
function initializePage() {
    navbar.addToggleItemsListVisibilityButtonClickEventListener();
    settings.initializeAllValuesFromStorage();
    settingsMenu.initializeAllElementStatesBasedOnSettingValues();
    applyStoredSettingsForAllCollapsibleElements();
    addButtonClickEventListenersForAllElementVisibilityTogglers();
    settingsMenu.addAllElementEventListeners();
    Sound.setVolume(settings.getSoundVolume());
    keyboardVisual.initializeElementVisibilityState();
    keyboardVisual.addAllEventListeners();
    createTooltips();
}
function applyStoredSettingsForAllCollapsibleElements() {
    ElementVisibility.applyStoredSettings(settingsMenu.containerElement, SettingsMenu.ELEMENT_ID, settingsMenu.toggleVisibilityButtonElement, SettingsMenu.DEFAULT_IS_VISIBLE_BOOL);
    ElementVisibility.applyStoredSettings(gameStatisticsTable.tableElement, GameStatisticsTable.ELEMENT_ID, gameStatisticsTable.toggleVisibilityButtonElement, GameStatisticsTable.DEFAULT_IS_VISIBLE_BOOL);
    ElementVisibility.applyStoredSettings(mistakeAnalyzer.containerElement, MistakeAnalyzer.ELEMENT_ID, mistakeAnalyzer.toggleVisibilityButtonElement, MistakeAnalyzer.DEFAULT_IS_VISIBLE_BOOL);
}
function addButtonClickEventListenersForAllElementVisibilityTogglers() {
    ElementVisibility.addToggleButtonClickEventListener(settingsMenu.containerElement, SettingsMenu.ELEMENT_ID, settingsMenu.toggleVisibilityButtonElement);
    ElementVisibility.addToggleButtonClickEventListener(gameStatisticsTable.tableElement, GameStatisticsTable.ELEMENT_ID, gameStatisticsTable.toggleVisibilityButtonElement);
    ElementVisibility.addToggleButtonClickEventListener(mistakeAnalyzer.containerElement, MistakeAnalyzer.ELEMENT_ID, mistakeAnalyzer.toggleVisibilityButtonElement);
}
function createTooltips() {
    //const gameWpmTrackerTooltip =
    new Tooltip(gameWpmTrackerTooltipIcon_div, GameWpmTracker.TOOLTIP_TEXT_TITLE, GameWpmTracker.TOOLTIP_TEXT_BODY);
    /* Settings menu */
    //const expressionModeTooltip =
    new Tooltip(expressionModeTooltipIcon_div, SettingsMenu.TOOLTIP_EXPRESSION_MODE_TEXT_TITLE, SettingsMenu.TOOLTIP_EXPRESSION_MODE_TEXT_BODY);
    //const instantDeathTooltip =
    new Tooltip(instantDeathTooltipIcon_div, SettingsMenu.TOOLTIP_INSTANT_DEATH_TEXT_TITLE, SettingsMenu.TOOLTIP_INSTANT_DEATH_TEXT_BODY);
    //const keyboardVisualTooltip =
    new Tooltip(keyboardVisualTooltipIcon_div, SettingsMenu.TOOLTIP_KEYBOARD_VISUAL_TEXT_TITLE, SettingsMenu.TOOLTIP_KEYBOARD_VISUAL_TEXT_BODY);
    //const punctuationTooltip =
    new Tooltip(punctuationTooltipIcon_div, SettingsMenu.TOOLTIP_PUNCUATION_TEXT_TITLE, SettingsMenu.TOOLTIP_PUNCUATION_TEXT_BODY);
    //const trackStatisticsTooltip =
    new Tooltip(trackStatisticsTooltipIcon_div, SettingsMenu.TOOLTIP_TRACK_STATISTICS_TEXT_TITLE, SettingsMenu.TOOLTIP_TRACK_STATISTICS_TEXT_BODY);
    //const phraseItemCollectionsTooltip =
    new Tooltip(phraseItemCollectionsTooltipIcon_div, SettingsMenu.TOOLTIP_PHRASE_ITEM_COLLECTIONS_TEXT_TITLE, SettingsMenu.TOOLTIP_PHRASE_ITEM_COLLECTIONS_TEXT_BODY);
    //const phrasePunctuationFrequencyTooltip =
    new Tooltip(phrasePunctuationFrequencyTooltipIcon_div, SettingsMenu.TOOLTIP_PHRASE_PUNCTUATION_FREQUENCY_TEXT_TITLE, SettingsMenu.TOOLTIP_PHRASE_PUNCTUATION_FREQUENCY_TEXT_BODY);
    /* Game statistics table */
    //const wordsPerMinuteTooltip =
    new Tooltip(wpmTooltipIcon_div, GameStatisticsTable.TOOLTIP_NET_WORDS_PER_MINUTE_TEXT_TITLE, GameStatisticsTable.TOOLTIP_NET_WORDS_PER_MINUTE_TEXT_BODY);
    //const accuracyTooltip =
    new Tooltip(accuracyTooltipIcon_div, GameStatisticsTable.TOOLTIP_ACCURACY_PERCENTAGE_TEXT_TITLE, GameStatisticsTable.TOOLTIP_ACCURACY_PERCENTAGE_TEXT_BODY);
}
main();
