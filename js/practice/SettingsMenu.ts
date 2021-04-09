import {
  englishWordsCommonCollection_button,
  englishWordsRandomCollection_button,
  numbersCollection_button,
  symbolsCollection_button,
  commonKeywordsCollection_button,
  commonOperatorsCollection_button,
  cKeywordsCollection_button,
  cOperatorsCollection_button,
  cppKeywordsCollection_button,
  cppOperatorsCollection_button,
  csharpKeywordsCollection_button,
  csharpOperatorsCollection_button,
  css3PropertiesCollection_button,
  html5TagsCollection_button,
  javaKeywordsCollection_button,
  javaOperatorsCollection_button,
  javascriptKeywordsCollection_button,
  javascriptOperatorsCollection_button,
  pythonKeywordsCollection_button,
  pythonOperatorsCollection_button,
  phraseItemCollection_buttons,
  settingsMenu_div,
  toggleVisibilitySettingsMenu_button,
  countdownCheckbox_input,
  expressionMode_select,
  instantDeathCheckbox_input,
  keyboardVisualCheckbox_input,
  punctuationCheckbox_input,
  trackStatisticsCheckbox_input,
  soundEffectsCheckbox_input,
  soundVolumeRange_input,
  phraseSettingsContainer_div,
  phraseItemCountNumber_input,
  phrasePunctuationFrequencyRange_input
} from "./page-elements.js";
import {
  areArraysEqual,
  convertItemCollectionArrayToItemCollectionNameArray,
  getKeyFromObjectByValue,
  getValueFromObjectByKey,
  parseBool,
  throwExceededClassInstanceLimitException,
  verifyNumberIsInRange
} from "../common/functions.js";
import { phraseItemCollectionNameToArrayMap } from "../common/constants.js";
import { keyboardVisual, settings } from "./main.js";
import Settings, {  } from "./Settings.js";
import { englishWordsCommonCollection } from "../expression-resources/english/english-words-common.js";
import { englishWordsRandomCollection } from "../expression-resources/english/english-words-random.js";
import { numbersCollection } from "../expression-resources/numbers-symbols/numbers.js";
import { symbolsCollection } from "../expression-resources/numbers-symbols/symbols.js";
import { programmingCommonKeywordsCollection } from "../expression-resources/general-programming/programming-common-keywords.js";
import { programmingCommonOperatorsCollection } from "../expression-resources/general-programming/programming-common-operators.js";
import { cKeywordsCollection } from "../expression-resources/c/c-keywords.js";
import { cOperatorsCollection } from "../expression-resources/c/c-operators.js";
import { cppKeywordsCollection } from "../expression-resources/cpp/cpp-keywords.js";
import { cppOperatorsCollection } from "../expression-resources/cpp/cpp-operators.js";
import { csharpKeywordsCollection } from "../expression-resources/csharp/csharp-keywords.js";
import { csharpOperatorsCollection } from "../expression-resources/csharp/csharp-operators.js";
import { css3PropertiesCollection } from "../expression-resources/css-html/css3-properties.js";
import { html5TagsCollection } from "../expression-resources/css-html/html5-tags.js";
import { javaKeywordsCollection } from "../expression-resources/java/java-keywords.js";
import { javaOperatorsCollection } from "../expression-resources/java/java-operators.js";
import { javascriptKeywordsCollection } from "../expression-resources/javascript/javascript-keywords.js";
import { javascriptOperatorsCollection } from "../expression-resources/javascript/javascript-operators.js";
import { pythonKeywordsCollection } from "../expression-resources/python/python-keywords.js";
import { pythonOperatorsCollection } from "../expression-resources/python/python-operators.js";
import SettingsStorage from "./SettingsStorage.js";

export default class SettingsMenu {
  public static readonly ELEMENT_ID = "settingsMenu";
  public static readonly DEFAULT_IS_VISIBLE_BOOL = false;

  public static readonly TOOLTIP_EXPRESSION_MODE_TEXT_TITLE = "Expression Mode";
  public static readonly TOOLTIP_EXPRESSION_MODE_TEXT_BODY = "Quote: generates a random quote. Phrase: generates a set of items, each separated by a space and chosen randomly from the selected item collections.";
  public static readonly TOOLTIP_INSTANT_DEATH_TEXT_TITLE = "Instant Death";
  public static readonly TOOLTIP_INSTANT_DEATH_TEXT_BODY = "When on, making a mistake will instantly disqualify and terminate the current game. Disqualified games don't count towards your WPM or accuracy statistics. Great for practicing typing accuracy.";
  public static readonly TOOLTIP_KEYBOARD_VISUAL_TEXT_TITLE = "Keyboard Visual";
  public static readonly TOOLTIP_KEYBOARD_VISUAL_TEXT_BODY = "When on, adds a keyboard visual underneath the input area which highlights keys when they are pressed. Not recommended on mobile or low spec devices.";
  public static readonly TOOLTIP_PUNCUATION_TEXT_TITLE = "Punctuation";
  public static readonly TOOLTIP_PUNCUATION_TEXT_BODY = "Affects quotes and phrases. When on, expressions will consist of sentences with common punctuation characters and corresponding capitilization. When off, expressions will not add punctuation/capitilization - however, punctuation/capitalization from selected phrase item collections will still be added.";
  public static readonly TOOLTIP_TRACK_STATISTICS_TEXT_TITLE = "Track Statistics";
  public static readonly TOOLTIP_TRACK_STATISTICS_TEXT_BODY = "When off, will prevent any WPM, accuracy, and participation statistics from being updated.";
  public static readonly TOOLTIP_PHRASE_ITEM_COLLECTIONS_TEXT_TITLE = "Phrase Item Collections";
  public static readonly TOOLTIP_PHRASE_ITEM_COLLECTIONS_TEXT_BODY = "The item sets that the expression will randomly choose items from when generating a phrase. Items are single units and can be words, numbers, symbols, or any mix of the three depending on the collection."; // Each row is a subset. When a single subset is selected exclusively, statistics will be tracked for that specific subset. Subset-specific statistics can be viewed in 'Your Statistics'.
  public static readonly TOOLTIP_PHRASE_PUNCTUATION_FREQUENCY_TEXT_TITLE = "Phrase Punctuation Frequency";
  public static readonly TOOLTIP_PHRASE_PUNCTUATION_FREQUENCY_TEXT_BODY = "The probabilistic frequency of punctuation characters appearing in generated phrases. The lowest value equates to 1/100 items having punctuation (on average), the highest value equates to every item having punctuation.";

  private static readonly phraseItemCollectionNameToButtonElementMap = {
    "englishWordsCommonCollection": englishWordsCommonCollection_button,
    "englishWordsRandomCollection": englishWordsRandomCollection_button,
    "numbersCollection": numbersCollection_button,
    "symbolsCollection": symbolsCollection_button,
    "programmingCommonKeywordsCollection": commonKeywordsCollection_button,
    "programmingCommonOperatorsCollection": commonOperatorsCollection_button,
    "cKeywordsCollection": cKeywordsCollection_button,
    "cOperatorsCollection": cOperatorsCollection_button,
    "cppKeywordsCollection": cppKeywordsCollection_button,
    "cppOperatorsCollection": cppOperatorsCollection_button,
    "csharpKeywordsCollection": csharpKeywordsCollection_button,
    "csharpOperatorsCollection": csharpOperatorsCollection_button,
    "css3PropertiesCollection": css3PropertiesCollection_button,
    "html5TagsCollection": html5TagsCollection_button,
    "javaKeywordsCollection": javaKeywordsCollection_button,
    "javaOperatorsCollection": javaOperatorsCollection_button,
    "javascriptKeywordsCollection": javascriptKeywordsCollection_button,
    "javascriptOperatorsCollection": javascriptOperatorsCollection_button,
    "pythonKeywordsCollection": pythonKeywordsCollection_button,
    "pythonOperatorsCollection": pythonOperatorsCollection_button
  };

  private static readonly programmingRelatedPhraseItemCollectionNames = [
    "programmingCommonKeywordsCollection",
    "programmingCommonOperatorsCollection",
    "cKeywordsCollection",
    "cOperatorsCollection",
    "cppKeywordsCollection",
    "cppOperatorsCollection",
    "csharpKeywordsCollection",
    "csharpOperatorsCollection",
    "css3PropertiesCollection",
    "html5TagsCollection",
    "javaKeywordsCollection",
    "javaOperatorsCollection",
    "javascriptKeywordsCollection",
    "javascriptOperatorsCollection",
    "pythonKeywordsCollection",
    "pythonOperatorsCollection"
  ];

  private static readonly numbersAndSymbolsPhraseItemCollectionNames = [
    "numbersCollection",
    "symbolsCollection"
  ];

  public readonly containerElement = settingsMenu_div;
  public readonly toggleVisibilityButtonElement = toggleVisibilitySettingsMenu_button;

  // private hasPunctuationBeenChangedByUser = false;

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    SettingsMenu.instanceCount++;
    if (SettingsMenu.instanceCount > SettingsMenu.instanceCountLimit) {
      throwExceededClassInstanceLimitException("SettingsMenu", SettingsMenu.instanceCountLimit);
    }
  }

  //#region Element state initialization

  public initializeAllElementStatesBasedOnSettingValues() {
    this.initializeCountdownCheckboxElementState();
    this.initializeExpressionModeSelectElementState();
    this.initializeInstantDeathCheckboxElementState();
    this.initializeKeyboardVisualCheckboxElementState();
    this.initializePunctuationCheckboxElementState();
    this.initializeTrackStatisticsCheckboxElementState();

    this.initializeSoundEffectsCheckboxElementState();
    this.initializeSoundVolumeElementState();

    this.initializePhraseSettingsContainerElementState();
    this.initializePhraseItemCountNumberInputElementState();
    this.initializePhrasePunctuationFrequencyRangeInputElementState();
    this.initializeAllPhraseItemCollectionButtonElementStates();
  }

  private initializeCountdownCheckboxElementState() {
    this.setCheckboxElementValue(countdownCheckbox_input, settings.getCountdown());
  }

  private setCheckboxElementValue(checkboxInputElement: HTMLInputElement, isChecked: boolean) {
    checkboxInputElement.checked = isChecked;
  }

  private initializeExpressionModeSelectElementState() {
    this.setSelectElementValue(expressionMode_select, settings.getExpressionMode());
  }

  private setSelectElementValue(selectElement: HTMLSelectElement, value: string) {
    selectElement.value = value;
  }

  private initializeInstantDeathCheckboxElementState() {
    this.setCheckboxElementValue(instantDeathCheckbox_input, settings["instantDeath"]);
  }

  private initializeKeyboardVisualCheckboxElementState() {
    this.setCheckboxElementValue(keyboardVisualCheckbox_input, settings["keyboardVisual"]);
  }

  private initializePunctuationCheckboxElementState() {
    this.setCheckboxElementValue(punctuationCheckbox_input, settings["punctuation"]);
  }

  private initializeTrackStatisticsCheckboxElementState() {
    this.setCheckboxElementValue(trackStatisticsCheckbox_input, settings["trackStatistics"]);
  }

  private initializeSoundEffectsCheckboxElementState() {
    this.setCheckboxElementValue(soundEffectsCheckbox_input, settings["soundEffects"]);
  }

  private initializeSoundVolumeElementState() {
    this.setRangeElementValue(soundVolumeRange_input, settings.getSoundVolume() * 100);
    if (!settings.getSoundEffects()) {
      const soundVolumeLabelElement = this.getLabelElementForInputElement(soundVolumeRange_input);
      this.disableElement(soundVolumeLabelElement);
      this.disableElement(soundVolumeRange_input);
    }
  }

  private getLabelElementForInputElement(inputElement: HTMLInputElement) {
    const inputElementId = inputElement.getAttribute("id");
    return document.querySelector(`label[for="${inputElementId}"]`) as HTMLLabelElement;
  }

  private setRangeElementValue(rangeElement: HTMLInputElement, value: number) {
    const min = rangeElement.getAttribute("min");
    const max = rangeElement.getAttribute("max");
    if (min !== null && max !== null) {
      verifyNumberIsInRange(value, parseFloat(min), parseFloat(max));
      rangeElement.value = `${value}`;
      return;
    }
    throw `either 'min' or 'max' attribute could not be found on '${rangeElement} rangeElement`;
  }

  private initializePhraseSettingsContainerElementState() {
    if (settings.getExpressionMode() === Settings.EXPRESSION_MODES.QUOTE) {
      this.disableAllPhraseSettingElements();
    }
  }

  private initializePhraseItemCountNumberInputElementState() {
    if (settings.getExpressionMode() === Settings.EXPRESSION_MODES.PHRASE) {
      this.enableElement(phraseItemCountNumber_input);
    }
    this.setNumberInputElementValue(phraseItemCountNumber_input, settings.getPhraseItemCount());
  }

  private setNumberInputElementValue(inputElement: HTMLInputElement, number: number) {
    inputElement.value = `${number}`;
  }

  private initializePhrasePunctuationFrequencyRangeInputElementState() {
    this.setRangeElementValue(
      phrasePunctuationFrequencyRange_input, settings.getPhrasePunctuationFrequency() * 100
    );
  }

  private initializeAllPhraseItemCollectionButtonElementStates() {
    if (settings.getExpressionMode() === Settings.EXPRESSION_MODES.PHRASE) {
      phraseItemCollection_buttons.forEach((buttonElement) => {
        this.enableElement(buttonElement);
      });
    }
    this.activateSelectedPhraseItemCollectionButtons();
  }

  private activateSelectedPhraseItemCollectionButtons() {
    const stringifiedPhraseItemCollectionNames = localStorage.getItem("phraseItemCollections");
    if (stringifiedPhraseItemCollectionNames === null) {
      this.activateDefaultPhraseItemCollectionButtons();
      return;
    }
    const storedItemCollectionNames: string[] = JSON.parse(stringifiedPhraseItemCollectionNames);
    storedItemCollectionNames.forEach((itemCollectionName) => {
      const correspondingButtonElement = getValueFromObjectByKey(SettingsMenu.phraseItemCollectionNameToButtonElementMap, itemCollectionName);
      this.activateButton(correspondingButtonElement);
    });
  }

  private activateDefaultPhraseItemCollectionButtons() {
    const defaultPhraseItemCollectionNames = Settings.DEFAULT.phraseItemCollectionNames;
    defaultPhraseItemCollectionNames.forEach((itemCollectionName) => {
      const correspondingButtonElement = getValueFromObjectByKey(SettingsMenu.phraseItemCollectionNameToButtonElementMap, itemCollectionName);
      this.activateButton(correspondingButtonElement);
    });
  }

  //#endregion

  //#region Element event listener methods

  public addAllElementEventListeners() {
    this.addCountdownCheckboxEventListener();
    this.addExpressionModeSelectEventListener();
    this.addInstantDeathCheckboxEventListener();
    this.addKeyboardVisualCheckboxEventListener();
    this.addPunctuationCheckboxEventListener();
    this.addTrackStatisticsCheckboxEventListener();

    this.addSoundEffectsCheckboxEventListener();
    this.addSoundVolumeRangeEventListener();

    this.addPhraseItemCountNumberInputEventListener();
    this.addPhrasePunctuationFrequencyRangeInputEventListener();
    this.addAllPhraseItemCollectionButtonClickEventListeners();
  }

  private addCheckboxChangeEventListener(
    checkboxInputElement: HTMLInputElement,
    settingGetter: SettingGetter,
    settingSetter: SettingSetter,
    settingKey: string
  ) {
    checkboxInputElement.addEventListener("change", () => {
      const previousSettingValue = settingGetter();
      const newSettingValue = !previousSettingValue;
      settingSetter(newSettingValue);
      SettingsStorage.set(settingKey, newSettingValue);
    });
  }

  private addCountdownCheckboxEventListener() {
    this.addCheckboxChangeEventListener(countdownCheckbox_input, settings.getCountdown, settings.setCountdown, "countdown");
  }

  private addExpressionModeSelectEventListener() {
    expressionMode_select.addEventListener("change", () => {
      settings.setExpressionMode(expressionMode_select.value);
      SettingsStorage.set("expressionMode", expressionMode_select.value);
      switch (settings.getExpressionMode()) {
        case Settings.EXPRESSION_MODES.QUOTE: {
          this.disableAllPhraseSettingElements();
          //this.enableAllQuoteSettingElements();
          this.turnOnPunctuationIfOff();
          break;
        }
        case Settings.EXPRESSION_MODES.PHRASE: {
          //this.disableAllQuoteSettingElements();
          this.enableAllPhraseSettingElements();
          break;
        }
      }
    });
  }

  private disableAllPhraseSettingElements() {
    const labels = phraseSettingsContainer_div.querySelectorAll("label");
    labels.forEach((label) => {
      this.disableElement(label);
    });

    this.disableElement(phraseItemCountNumber_input);
    this.disableElement(phrasePunctuationFrequencyRange_input);
    phraseItemCollection_buttons.forEach((itemCollectionButtonElement) => {
      this.disableElement(itemCollectionButtonElement);
    });

    this.disableElement(phraseSettingsContainer_div);
    phraseSettingsContainer_div.setAttribute("title", "Set 'Expression Mode' to 'Phrase' to change these settings");
  }

  private disableElement(element: HTMLElement | Element) {
    element.setAttribute("disabled", `${true}`);
  }

  // enableAllQuoteSettingElements() {

  // }

  // disableAllQuoteSettingElements() {

  // }

  private enableAllPhraseSettingElements() {
    const labels = phraseSettingsContainer_div.querySelectorAll("label");
    labels.forEach((label) => {
      this.enableElement(label);
    });

    this.enableElement(phraseItemCountNumber_input);
    this.enableElement(phrasePunctuationFrequencyRange_input);
    phraseItemCollection_buttons.forEach((itemCollectionButtonElement) => {
      this.enableElement(itemCollectionButtonElement);
    });

    phraseSettingsContainer_div.removeAttribute("title");
    this.enableElement(phraseSettingsContainer_div);
  }

  private enableElement(element: HTMLElement | Element) {
    element.removeAttribute("disabled");
  }

  private addInstantDeathCheckboxEventListener() {
    this.addCheckboxChangeEventListener(instantDeathCheckbox_input, settings.getInstantDeath, settings.setInstantDeath, "instantDeath");
  }

  private addKeyboardVisualCheckboxEventListener() {
    this.addCheckboxChangeEventListener(keyboardVisualCheckbox_input, settings.getKeyboardVisual, settings.setKeyboardVisual, "keyboardVisual");
    keyboardVisualCheckbox_input.addEventListener("change", () => {
      if (keyboardVisual.isVisible()) {
        keyboardVisual.hide();
        return;
      }
      keyboardVisual.show();
    });
  }

  private addPunctuationCheckboxEventListener() {
    this.addCheckboxChangeEventListener(punctuationCheckbox_input, settings.getPunctuation, settings.setPunctuation, "punctuation");
  }

  private addTrackStatisticsCheckboxEventListener() {
    this.addCheckboxChangeEventListener(trackStatisticsCheckbox_input, settings.getTrackStatistics, settings.setTrackStatistics, "trackStatistics");
  }

  private addSoundEffectsCheckboxEventListener() {
    this.addCheckboxChangeEventListener(soundEffectsCheckbox_input, settings.getSoundEffects, settings.setSoundEffects, "soundEffects");
    soundEffectsCheckbox_input.addEventListener("change", () => {
      const soundVolumeLabelElement = this.getLabelElementForInputElement(soundVolumeRange_input);
      if (this.isCheckboxElementChecked(soundEffectsCheckbox_input)) {
        this.enableElement(soundVolumeLabelElement);
        this.enableElement(soundVolumeRange_input);
      } else {
        this.disableElement(soundVolumeLabelElement);
        this.disableElement(soundVolumeRange_input);
      }
    });
  }

  private isCheckboxElementChecked(checkboxInputElement: HTMLInputElement) {
    return checkboxInputElement.checked;
  }

  private addSoundVolumeRangeEventListener() {
    soundVolumeRange_input.addEventListener("change", () => {
      const newVolume = parseFloat(soundVolumeRange_input.value) / 100;
      settings.setSoundVolume(newVolume);
    });
  }

  private addPhraseItemCountNumberInputEventListener() {
    phraseItemCountNumber_input.addEventListener("input", () => {
      this.correctPhraseItemCountElementValueIfOutOfRange();
      settings.setPhraseItemCount(this.getInputElementValueAsNumber(phraseItemCountNumber_input));
    });
  }

  private correctPhraseItemCountElementValueIfOutOfRange() {
    const currentCount = this.getInputElementValueAsNumber(phraseItemCountNumber_input);
    if (currentCount < Settings.MIN_PHRASE_ITEM_COUNT) {
      this.setPhraseItemCountElementValue(Settings.MIN_PHRASE_ITEM_COUNT);
      return;
    }
    if (currentCount > Settings.MAX_PHRASE_ITEM_COUNT) {
      this.setPhraseItemCountElementValue(Settings.MAX_PHRASE_ITEM_COUNT);
    }
  }

  private getInputElementValueAsNumber(inputElement: HTMLInputElement) {
    return parseFloat(inputElement.value);
  }

  private setPhraseItemCountElementValue(number: number) {
    phraseItemCountNumber_input.value = `${number}`;
  }

  private addPhrasePunctuationFrequencyRangeInputEventListener() {
    phrasePunctuationFrequencyRange_input.addEventListener("change", () => {
      const newValue = this.getInputElementValueAsNumber(phrasePunctuationFrequencyRange_input) / 100;
      settings.setPhrasePunctuationFrequency(newValue);
    });
  }

  private addAllPhraseItemCollectionButtonClickEventListeners() {
    this.addEnglishWordsCommonCollectionButtonClickEventListener();
    this.addEnglishWordsRandomCollectionButtonClickEventListener();

    this.addNumbersCollectionButtonClickEventListener();
    this.addSymbolsCollectionButtonClickEventListener();

    this.addProgrammingCommonKeywordsCollectionButtonClickEventListener();
    this.addProgrammingCommonOperatorsCollectionButtonClickEventListener();

    this.addCKeywordsCollectionButtonClickEventListener();
    this.addCOperatorsCollectionButtonClickEventListener();

    this.addCppKeywordsCollectionButtonClickEventListener();
    this.addCppOperatorsCollectionButtonClickEventListener();

    this.addCsharpKeywordsCollectionButtonClickEventListener();
    this.addCsharpOperatorsCollectionButtonClickEventListener();

    this.addCss3PropertiesCollectionButtonClickEventListener();
    this.addHtml5TagsCollectionButtonClickEventListener();

    this.addJavaKeywordsCollectionButtonClickEventListener();
    this.addJavaOperatorsCollectionButtonClickEventListener();

    this.addJavascriptKeywordsCollectionButtonClickEventListener();
    this.addJavascriptOperatorsCollectionButtonClickEventListener();

    this.addPythonKeywordsCollectionButtonClickEventListener();
    this.addPythonOperatorsCollectionButtonClickEventListener();
  }

  private addPhraseItemCollectionButtonClickEventListener(buttonElement: HTMLButtonElement, itemCollection: string[]) {
    buttonElement.addEventListener("click", () => {
      let newItemCollectionArray = settings.getPhraseItemCollections();
      if (this.isButtonActive(buttonElement)) {
        this.splicePhraseItemCollectionFromArray(itemCollection, newItemCollectionArray);
      } else {
        newItemCollectionArray.push(itemCollection);
      }
      settings.setPhraseItemCollections(newItemCollectionArray);
      this.toggleButtonActiveAttribute(buttonElement);
      this.changePunctuationStateIfNecessary();
    });
  }

  private isButtonActive(buttonElement: HTMLButtonElement) {
    return parseBool(buttonElement.getAttribute("data-active"));
  }

  private splicePhraseItemCollectionFromArray(itemCollectionToRemove: string[], array: string[][]) {
    const indexOfItemCollectionToRemove = array.indexOf(itemCollectionToRemove);
    array.splice(indexOfItemCollectionToRemove, 1);
  }

  private toggleButtonActiveAttribute(buttonElement: HTMLButtonElement) {
    if (this.isButtonActive(buttonElement)) {
      this.deactivateButton(buttonElement);
      return;
    }
    this.activateButton(buttonElement);
  }

  private deactivateButton(buttonElement: HTMLButtonElement) {
    buttonElement.setAttribute("data-active", `${false}`);
  }

  private activateButton(buttonElement: HTMLButtonElement) {
    buttonElement.setAttribute("data-active", `${true}`);
  }

  private changePunctuationStateIfNecessary() {
    if (this.areAnyProgrammingRelatedPhraseItemCollectionsSelected() || this.areTheOnlySelectedPhraseItemCollectionsNumbersAndSymbols()) {
      this.turnOffPunctuationIfOn();
      return;
    }
    this.turnOnPunctuationIfOff();
  }

  private areAnyProgrammingRelatedPhraseItemCollectionsSelected() {
    const phraseItemCollections = settings.getPhraseItemCollections();
    for (let i = 0; i < phraseItemCollections.length; i++) {
      const itemCollection = phraseItemCollections[i];
      const itemCollectionName = getKeyFromObjectByValue(phraseItemCollectionNameToArrayMap, itemCollection);
      if (itemCollectionName !== null && itemCollectionName !== undefined && SettingsMenu.programmingRelatedPhraseItemCollectionNames.includes(itemCollectionName)) {
        return true;
      }
    }
    return false;
  }

  private areTheOnlySelectedPhraseItemCollectionsNumbersAndSymbols() {
    const phraseItemCollections = settings.getPhraseItemCollections();
    const phraseItemCollectionNames = convertItemCollectionArrayToItemCollectionNameArray(phraseItemCollections);
    if (areArraysEqual(phraseItemCollectionNames, SettingsMenu.numbersAndSymbolsPhraseItemCollectionNames)) {
      return true;
    }
    return false;
  }

  private turnOffPunctuationIfOn() {
    if ((!settings.getPunctuation()) && (!this.isCheckboxElementChecked(punctuationCheckbox_input))) {
      return;
    }
    settings.setPunctuation(false);
    SettingsStorage.setPunctuation(false);
    this.setCheckboxElementValue(punctuationCheckbox_input, false);
  }

  private turnOnPunctuationIfOff() {
    if ((settings.getPunctuation()) && (this.isCheckboxElementChecked(punctuationCheckbox_input))) {
      return;
    }
    settings.setPunctuation(true);
    SettingsStorage.setPunctuation(true);
    this.setCheckboxElementValue(punctuationCheckbox_input, true);
  }

  private addEnglishWordsCommonCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(englishWordsCommonCollection_button, englishWordsCommonCollection);
  }

  private addEnglishWordsRandomCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(englishWordsRandomCollection_button, englishWordsRandomCollection,);
  }

  private addNumbersCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(numbersCollection_button, numbersCollection);
  }

  private addSymbolsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(symbolsCollection_button, symbolsCollection);
  }

  private addProgrammingCommonKeywordsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(commonKeywordsCollection_button, programmingCommonKeywordsCollection);
  }

  private addProgrammingCommonOperatorsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(commonOperatorsCollection_button, programmingCommonOperatorsCollection);
  }

  private addCKeywordsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(cKeywordsCollection_button, cKeywordsCollection);
  }

  private addCOperatorsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(cOperatorsCollection_button, cOperatorsCollection);
  }

  private addCppKeywordsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(cppKeywordsCollection_button, cppKeywordsCollection);
  }

  private addCppOperatorsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(cppOperatorsCollection_button, cppOperatorsCollection);
  }

  private addCsharpKeywordsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(csharpKeywordsCollection_button, csharpKeywordsCollection);
  }

  private addCsharpOperatorsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(csharpOperatorsCollection_button, csharpOperatorsCollection);
  }

  private addCss3PropertiesCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(css3PropertiesCollection_button, css3PropertiesCollection);
  }

  private addHtml5TagsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(html5TagsCollection_button, html5TagsCollection);
  }

  private addJavaKeywordsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(javaKeywordsCollection_button, javaKeywordsCollection);
  }

  private addJavaOperatorsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(javaOperatorsCollection_button, javaOperatorsCollection);
  }

  private addJavascriptKeywordsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(javascriptKeywordsCollection_button, javascriptKeywordsCollection);
  }

  private addJavascriptOperatorsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(javascriptOperatorsCollection_button, javascriptOperatorsCollection);
  }

  private addPythonKeywordsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(pythonKeywordsCollection_button, pythonKeywordsCollection);
  }

  private addPythonOperatorsCollectionButtonClickEventListener() {
    this.addPhraseItemCollectionButtonClickEventListener(pythonOperatorsCollection_button, pythonOperatorsCollection);
  }

  //#endregion
}

type SettingGetter = () => any;
type SettingSetter = (input: any) => void;