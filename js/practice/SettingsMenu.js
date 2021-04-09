import { englishWordsCommonCollection_button, englishWordsRandomCollection_button, numbersCollection_button, symbolsCollection_button, commonKeywordsCollection_button, commonOperatorsCollection_button, cKeywordsCollection_button, cOperatorsCollection_button, cppKeywordsCollection_button, cppOperatorsCollection_button, csharpKeywordsCollection_button, csharpOperatorsCollection_button, css3PropertiesCollection_button, html5TagsCollection_button, javaKeywordsCollection_button, javaOperatorsCollection_button, javascriptKeywordsCollection_button, javascriptOperatorsCollection_button, pythonKeywordsCollection_button, pythonOperatorsCollection_button, phraseItemCollection_buttons, settingsMenu_div, toggleVisibilitySettingsMenu_button, countdownCheckbox_input, expressionMode_select, instantDeathCheckbox_input, keyboardVisualCheckbox_input, punctuationCheckbox_input, trackStatisticsCheckbox_input, soundEffectsCheckbox_input, soundVolumeRange_input, phraseSettingsContainer_div, phraseItemCountNumber_input, phrasePunctuationFrequencyRange_input } from "./page-elements.js";
import { areArraysEqual, convertItemCollectionArrayToItemCollectionNameArray, getKeyFromObjectByValue, getValueFromObjectByKey, parseBool, throwExceededClassInstanceLimitException, verifyNumberIsInRange } from "../common/functions.js";
import { phraseItemCollectionNameToArrayMap } from "../common/constants.js";
import { keyboardVisual, settings } from "./main.js";
import Settings from "./Settings.js";
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
var SettingsMenu = /** @class */ (function () {
    function SettingsMenu() {
        this.containerElement = settingsMenu_div;
        this.toggleVisibilityButtonElement = toggleVisibilitySettingsMenu_button;
        SettingsMenu.instanceCount++;
        if (SettingsMenu.instanceCount > SettingsMenu.instanceCountLimit) {
            throwExceededClassInstanceLimitException("SettingsMenu", SettingsMenu.instanceCountLimit);
        }
    }
    //#region Element state initialization
    SettingsMenu.prototype.initializeAllElementStatesBasedOnSettingValues = function () {
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
    };
    SettingsMenu.prototype.initializeCountdownCheckboxElementState = function () {
        this.setCheckboxElementValue(countdownCheckbox_input, settings.getCountdown());
    };
    SettingsMenu.prototype.setCheckboxElementValue = function (checkboxInputElement, isChecked) {
        checkboxInputElement.checked = isChecked;
    };
    SettingsMenu.prototype.initializeExpressionModeSelectElementState = function () {
        this.setSelectElementValue(expressionMode_select, settings.getExpressionMode());
    };
    SettingsMenu.prototype.setSelectElementValue = function (selectElement, value) {
        selectElement.value = value;
    };
    SettingsMenu.prototype.initializeInstantDeathCheckboxElementState = function () {
        this.setCheckboxElementValue(instantDeathCheckbox_input, settings["instantDeath"]);
    };
    SettingsMenu.prototype.initializeKeyboardVisualCheckboxElementState = function () {
        this.setCheckboxElementValue(keyboardVisualCheckbox_input, settings["keyboardVisual"]);
    };
    SettingsMenu.prototype.initializePunctuationCheckboxElementState = function () {
        this.setCheckboxElementValue(punctuationCheckbox_input, settings["punctuation"]);
    };
    SettingsMenu.prototype.initializeTrackStatisticsCheckboxElementState = function () {
        this.setCheckboxElementValue(trackStatisticsCheckbox_input, settings["trackStatistics"]);
    };
    SettingsMenu.prototype.initializeSoundEffectsCheckboxElementState = function () {
        this.setCheckboxElementValue(soundEffectsCheckbox_input, settings["soundEffects"]);
    };
    SettingsMenu.prototype.initializeSoundVolumeElementState = function () {
        this.setRangeElementValue(soundVolumeRange_input, settings.getSoundVolume() * 100);
        if (!settings.getSoundEffects()) {
            var soundVolumeLabelElement = this.getLabelElementForInputElement(soundVolumeRange_input);
            this.disableElement(soundVolumeLabelElement);
            this.disableElement(soundVolumeRange_input);
        }
    };
    SettingsMenu.prototype.getLabelElementForInputElement = function (inputElement) {
        var inputElementId = inputElement.getAttribute("id");
        return document.querySelector("label[for=\"" + inputElementId + "\"]");
    };
    SettingsMenu.prototype.setRangeElementValue = function (rangeElement, value) {
        var min = rangeElement.getAttribute("min");
        var max = rangeElement.getAttribute("max");
        if (min !== null && max !== null) {
            verifyNumberIsInRange(value, parseFloat(min), parseFloat(max));
            rangeElement.value = "" + value;
            return;
        }
        throw "either 'min' or 'max' attribute could not be found on '" + rangeElement + " rangeElement";
    };
    SettingsMenu.prototype.initializePhraseSettingsContainerElementState = function () {
        if (settings.getExpressionMode() === Settings.EXPRESSION_MODES.QUOTE) {
            this.disableAllPhraseSettingElements();
        }
    };
    SettingsMenu.prototype.initializePhraseItemCountNumberInputElementState = function () {
        if (settings.getExpressionMode() === Settings.EXPRESSION_MODES.PHRASE) {
            this.enableElement(phraseItemCountNumber_input);
        }
        this.setNumberInputElementValue(phraseItemCountNumber_input, settings.getPhraseItemCount());
    };
    SettingsMenu.prototype.setNumberInputElementValue = function (inputElement, number) {
        inputElement.value = "" + number;
    };
    SettingsMenu.prototype.initializePhrasePunctuationFrequencyRangeInputElementState = function () {
        this.setRangeElementValue(phrasePunctuationFrequencyRange_input, settings.getPhrasePunctuationFrequency() * 100);
    };
    SettingsMenu.prototype.initializeAllPhraseItemCollectionButtonElementStates = function () {
        var _this = this;
        if (settings.getExpressionMode() === Settings.EXPRESSION_MODES.PHRASE) {
            phraseItemCollection_buttons.forEach(function (buttonElement) {
                _this.enableElement(buttonElement);
            });
        }
        this.activateSelectedPhraseItemCollectionButtons();
    };
    SettingsMenu.prototype.activateSelectedPhraseItemCollectionButtons = function () {
        var _this = this;
        var stringifiedPhraseItemCollectionNames = localStorage.getItem("phraseItemCollections");
        if (stringifiedPhraseItemCollectionNames === null) {
            this.activateDefaultPhraseItemCollectionButtons();
            return;
        }
        var storedItemCollectionNames = JSON.parse(stringifiedPhraseItemCollectionNames);
        storedItemCollectionNames.forEach(function (itemCollectionName) {
            var correspondingButtonElement = getValueFromObjectByKey(SettingsMenu.phraseItemCollectionNameToButtonElementMap, itemCollectionName);
            _this.activateButton(correspondingButtonElement);
        });
    };
    SettingsMenu.prototype.activateDefaultPhraseItemCollectionButtons = function () {
        var _this = this;
        var defaultPhraseItemCollectionNames = Settings.DEFAULT.phraseItemCollectionNames;
        defaultPhraseItemCollectionNames.forEach(function (itemCollectionName) {
            var correspondingButtonElement = getValueFromObjectByKey(SettingsMenu.phraseItemCollectionNameToButtonElementMap, itemCollectionName);
            _this.activateButton(correspondingButtonElement);
        });
    };
    //#endregion
    //#region Element event listener methods
    SettingsMenu.prototype.addAllElementEventListeners = function () {
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
    };
    SettingsMenu.prototype.addCheckboxChangeEventListener = function (checkboxInputElement, settingGetter, settingSetter, settingKey) {
        checkboxInputElement.addEventListener("change", function () {
            var previousSettingValue = settingGetter();
            var newSettingValue = !previousSettingValue;
            settingSetter(newSettingValue);
            SettingsStorage.set(settingKey, newSettingValue);
        });
    };
    SettingsMenu.prototype.addCountdownCheckboxEventListener = function () {
        this.addCheckboxChangeEventListener(countdownCheckbox_input, settings.getCountdown, settings.setCountdown, "countdown");
    };
    SettingsMenu.prototype.addExpressionModeSelectEventListener = function () {
        var _this = this;
        expressionMode_select.addEventListener("change", function () {
            settings.setExpressionMode(expressionMode_select.value);
            SettingsStorage.set("expressionMode", expressionMode_select.value);
            switch (settings.getExpressionMode()) {
                case Settings.EXPRESSION_MODES.QUOTE: {
                    _this.disableAllPhraseSettingElements();
                    //this.enableAllQuoteSettingElements();
                    _this.turnOnPunctuationIfOff();
                    break;
                }
                case Settings.EXPRESSION_MODES.PHRASE: {
                    //this.disableAllQuoteSettingElements();
                    _this.enableAllPhraseSettingElements();
                    break;
                }
            }
        });
    };
    SettingsMenu.prototype.disableAllPhraseSettingElements = function () {
        var _this = this;
        var labels = phraseSettingsContainer_div.querySelectorAll("label");
        labels.forEach(function (label) {
            _this.disableElement(label);
        });
        this.disableElement(phraseItemCountNumber_input);
        this.disableElement(phrasePunctuationFrequencyRange_input);
        phraseItemCollection_buttons.forEach(function (itemCollectionButtonElement) {
            _this.disableElement(itemCollectionButtonElement);
        });
        this.disableElement(phraseSettingsContainer_div);
        phraseSettingsContainer_div.setAttribute("title", "Set 'Expression Mode' to 'Phrase' to change these settings");
    };
    SettingsMenu.prototype.disableElement = function (element) {
        element.setAttribute("disabled", "" + true);
    };
    // enableAllQuoteSettingElements() {
    // }
    // disableAllQuoteSettingElements() {
    // }
    SettingsMenu.prototype.enableAllPhraseSettingElements = function () {
        var _this = this;
        var labels = phraseSettingsContainer_div.querySelectorAll("label");
        labels.forEach(function (label) {
            _this.enableElement(label);
        });
        this.enableElement(phraseItemCountNumber_input);
        this.enableElement(phrasePunctuationFrequencyRange_input);
        phraseItemCollection_buttons.forEach(function (itemCollectionButtonElement) {
            _this.enableElement(itemCollectionButtonElement);
        });
        phraseSettingsContainer_div.removeAttribute("title");
        this.enableElement(phraseSettingsContainer_div);
    };
    SettingsMenu.prototype.enableElement = function (element) {
        element.removeAttribute("disabled");
    };
    SettingsMenu.prototype.addInstantDeathCheckboxEventListener = function () {
        this.addCheckboxChangeEventListener(instantDeathCheckbox_input, settings.getInstantDeath, settings.setInstantDeath, "instantDeath");
    };
    SettingsMenu.prototype.addKeyboardVisualCheckboxEventListener = function () {
        this.addCheckboxChangeEventListener(keyboardVisualCheckbox_input, settings.getKeyboardVisual, settings.setKeyboardVisual, "keyboardVisual");
        keyboardVisualCheckbox_input.addEventListener("change", function () {
            if (keyboardVisual.isVisible()) {
                keyboardVisual.hide();
                return;
            }
            keyboardVisual.show();
        });
    };
    SettingsMenu.prototype.addPunctuationCheckboxEventListener = function () {
        this.addCheckboxChangeEventListener(punctuationCheckbox_input, settings.getPunctuation, settings.setPunctuation, "punctuation");
    };
    SettingsMenu.prototype.addTrackStatisticsCheckboxEventListener = function () {
        this.addCheckboxChangeEventListener(trackStatisticsCheckbox_input, settings.getTrackStatistics, settings.setTrackStatistics, "trackStatistics");
    };
    SettingsMenu.prototype.addSoundEffectsCheckboxEventListener = function () {
        var _this = this;
        this.addCheckboxChangeEventListener(soundEffectsCheckbox_input, settings.getSoundEffects, settings.setSoundEffects, "soundEffects");
        soundEffectsCheckbox_input.addEventListener("change", function () {
            var soundVolumeLabelElement = _this.getLabelElementForInputElement(soundVolumeRange_input);
            if (_this.isCheckboxElementChecked(soundEffectsCheckbox_input)) {
                _this.enableElement(soundVolumeLabelElement);
                _this.enableElement(soundVolumeRange_input);
            }
            else {
                _this.disableElement(soundVolumeLabelElement);
                _this.disableElement(soundVolumeRange_input);
            }
        });
    };
    SettingsMenu.prototype.isCheckboxElementChecked = function (checkboxInputElement) {
        return checkboxInputElement.checked;
    };
    SettingsMenu.prototype.addSoundVolumeRangeEventListener = function () {
        soundVolumeRange_input.addEventListener("change", function () {
            var newVolume = parseFloat(soundVolumeRange_input.value) / 100;
            settings.setSoundVolume(newVolume);
        });
    };
    SettingsMenu.prototype.addPhraseItemCountNumberInputEventListener = function () {
        var _this = this;
        phraseItemCountNumber_input.addEventListener("input", function () {
            _this.correctPhraseItemCountElementValueIfOutOfRange();
            settings.setPhraseItemCount(_this.getInputElementValueAsNumber(phraseItemCountNumber_input));
        });
    };
    SettingsMenu.prototype.correctPhraseItemCountElementValueIfOutOfRange = function () {
        var currentCount = this.getInputElementValueAsNumber(phraseItemCountNumber_input);
        if (currentCount < Settings.MIN_PHRASE_ITEM_COUNT) {
            this.setPhraseItemCountElementValue(Settings.MIN_PHRASE_ITEM_COUNT);
            return;
        }
        if (currentCount > Settings.MAX_PHRASE_ITEM_COUNT) {
            this.setPhraseItemCountElementValue(Settings.MAX_PHRASE_ITEM_COUNT);
        }
    };
    SettingsMenu.prototype.getInputElementValueAsNumber = function (inputElement) {
        return parseFloat(inputElement.value);
    };
    SettingsMenu.prototype.setPhraseItemCountElementValue = function (number) {
        phraseItemCountNumber_input.value = "" + number;
    };
    SettingsMenu.prototype.addPhrasePunctuationFrequencyRangeInputEventListener = function () {
        var _this = this;
        phrasePunctuationFrequencyRange_input.addEventListener("change", function () {
            var newValue = _this.getInputElementValueAsNumber(phrasePunctuationFrequencyRange_input) / 100;
            settings.setPhrasePunctuationFrequency(newValue);
        });
    };
    SettingsMenu.prototype.addAllPhraseItemCollectionButtonClickEventListeners = function () {
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
    };
    SettingsMenu.prototype.addPhraseItemCollectionButtonClickEventListener = function (buttonElement, itemCollection) {
        var _this = this;
        buttonElement.addEventListener("click", function () {
            var newItemCollectionArray = settings.getPhraseItemCollections();
            if (_this.isButtonActive(buttonElement)) {
                _this.splicePhraseItemCollectionFromArray(itemCollection, newItemCollectionArray);
            }
            else {
                newItemCollectionArray.push(itemCollection);
            }
            settings.setPhraseItemCollections(newItemCollectionArray);
            _this.toggleButtonActiveAttribute(buttonElement);
            _this.changePunctuationStateIfNecessary();
        });
    };
    SettingsMenu.prototype.isButtonActive = function (buttonElement) {
        return parseBool(buttonElement.getAttribute("data-active"));
    };
    SettingsMenu.prototype.splicePhraseItemCollectionFromArray = function (itemCollectionToRemove, array) {
        var indexOfItemCollectionToRemove = array.indexOf(itemCollectionToRemove);
        array.splice(indexOfItemCollectionToRemove, 1);
    };
    SettingsMenu.prototype.toggleButtonActiveAttribute = function (buttonElement) {
        if (this.isButtonActive(buttonElement)) {
            this.deactivateButton(buttonElement);
            return;
        }
        this.activateButton(buttonElement);
    };
    SettingsMenu.prototype.deactivateButton = function (buttonElement) {
        buttonElement.setAttribute("data-active", "" + false);
    };
    SettingsMenu.prototype.activateButton = function (buttonElement) {
        buttonElement.setAttribute("data-active", "" + true);
    };
    SettingsMenu.prototype.changePunctuationStateIfNecessary = function () {
        if (this.areAnyProgrammingRelatedPhraseItemCollectionsSelected() || this.areTheOnlySelectedPhraseItemCollectionsNumbersAndSymbols()) {
            this.turnOffPunctuationIfOn();
            return;
        }
        this.turnOnPunctuationIfOff();
    };
    SettingsMenu.prototype.areAnyProgrammingRelatedPhraseItemCollectionsSelected = function () {
        var phraseItemCollections = settings.getPhraseItemCollections();
        for (var i = 0; i < phraseItemCollections.length; i++) {
            var itemCollection = phraseItemCollections[i];
            var itemCollectionName = getKeyFromObjectByValue(phraseItemCollectionNameToArrayMap, itemCollection);
            if (itemCollectionName !== null && itemCollectionName !== undefined && SettingsMenu.programmingRelatedPhraseItemCollectionNames.includes(itemCollectionName)) {
                return true;
            }
        }
        return false;
    };
    SettingsMenu.prototype.areTheOnlySelectedPhraseItemCollectionsNumbersAndSymbols = function () {
        var phraseItemCollections = settings.getPhraseItemCollections();
        var phraseItemCollectionNames = convertItemCollectionArrayToItemCollectionNameArray(phraseItemCollections);
        if (areArraysEqual(phraseItemCollectionNames, SettingsMenu.numbersAndSymbolsPhraseItemCollectionNames)) {
            return true;
        }
        return false;
    };
    SettingsMenu.prototype.turnOffPunctuationIfOn = function () {
        if ((!settings.getPunctuation()) && (!this.isCheckboxElementChecked(punctuationCheckbox_input))) {
            return;
        }
        settings.setPunctuation(false);
        SettingsStorage.setPunctuation(false);
        this.setCheckboxElementValue(punctuationCheckbox_input, false);
    };
    SettingsMenu.prototype.turnOnPunctuationIfOff = function () {
        if ((settings.getPunctuation()) && (this.isCheckboxElementChecked(punctuationCheckbox_input))) {
            return;
        }
        settings.setPunctuation(true);
        SettingsStorage.setPunctuation(true);
        this.setCheckboxElementValue(punctuationCheckbox_input, true);
    };
    SettingsMenu.prototype.addEnglishWordsCommonCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(englishWordsCommonCollection_button, englishWordsCommonCollection);
    };
    SettingsMenu.prototype.addEnglishWordsRandomCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(englishWordsRandomCollection_button, englishWordsRandomCollection);
    };
    SettingsMenu.prototype.addNumbersCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(numbersCollection_button, numbersCollection);
    };
    SettingsMenu.prototype.addSymbolsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(symbolsCollection_button, symbolsCollection);
    };
    SettingsMenu.prototype.addProgrammingCommonKeywordsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(commonKeywordsCollection_button, programmingCommonKeywordsCollection);
    };
    SettingsMenu.prototype.addProgrammingCommonOperatorsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(commonOperatorsCollection_button, programmingCommonOperatorsCollection);
    };
    SettingsMenu.prototype.addCKeywordsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(cKeywordsCollection_button, cKeywordsCollection);
    };
    SettingsMenu.prototype.addCOperatorsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(cOperatorsCollection_button, cOperatorsCollection);
    };
    SettingsMenu.prototype.addCppKeywordsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(cppKeywordsCollection_button, cppKeywordsCollection);
    };
    SettingsMenu.prototype.addCppOperatorsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(cppOperatorsCollection_button, cppOperatorsCollection);
    };
    SettingsMenu.prototype.addCsharpKeywordsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(csharpKeywordsCollection_button, csharpKeywordsCollection);
    };
    SettingsMenu.prototype.addCsharpOperatorsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(csharpOperatorsCollection_button, csharpOperatorsCollection);
    };
    SettingsMenu.prototype.addCss3PropertiesCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(css3PropertiesCollection_button, css3PropertiesCollection);
    };
    SettingsMenu.prototype.addHtml5TagsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(html5TagsCollection_button, html5TagsCollection);
    };
    SettingsMenu.prototype.addJavaKeywordsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(javaKeywordsCollection_button, javaKeywordsCollection);
    };
    SettingsMenu.prototype.addJavaOperatorsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(javaOperatorsCollection_button, javaOperatorsCollection);
    };
    SettingsMenu.prototype.addJavascriptKeywordsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(javascriptKeywordsCollection_button, javascriptKeywordsCollection);
    };
    SettingsMenu.prototype.addJavascriptOperatorsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(javascriptOperatorsCollection_button, javascriptOperatorsCollection);
    };
    SettingsMenu.prototype.addPythonKeywordsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(pythonKeywordsCollection_button, pythonKeywordsCollection);
    };
    SettingsMenu.prototype.addPythonOperatorsCollectionButtonClickEventListener = function () {
        this.addPhraseItemCollectionButtonClickEventListener(pythonOperatorsCollection_button, pythonOperatorsCollection);
    };
    SettingsMenu.ELEMENT_ID = "settingsMenu";
    SettingsMenu.DEFAULT_IS_VISIBLE_BOOL = false;
    SettingsMenu.TOOLTIP_EXPRESSION_MODE_TEXT_TITLE = "Expression Mode";
    SettingsMenu.TOOLTIP_EXPRESSION_MODE_TEXT_BODY = "Quote: generates a random quote. Phrase: generates a set of items, each separated by a space and chosen randomly from the selected item collections.";
    SettingsMenu.TOOLTIP_INSTANT_DEATH_TEXT_TITLE = "Instant Death";
    SettingsMenu.TOOLTIP_INSTANT_DEATH_TEXT_BODY = "When on, making a mistake will instantly disqualify and terminate the current game. Disqualified games don't count towards your WPM or accuracy statistics. Great for practicing typing accuracy.";
    SettingsMenu.TOOLTIP_KEYBOARD_VISUAL_TEXT_TITLE = "Keyboard Visual";
    SettingsMenu.TOOLTIP_KEYBOARD_VISUAL_TEXT_BODY = "When on, adds a keyboard visual underneath the input area which highlights keys when they are pressed. Not recommended on mobile or low spec devices.";
    SettingsMenu.TOOLTIP_PUNCUATION_TEXT_TITLE = "Punctuation";
    SettingsMenu.TOOLTIP_PUNCUATION_TEXT_BODY = "Affects quotes and phrases. When on, expressions will consist of sentences with common punctuation characters and corresponding capitilization. When off, expressions will not add punctuation/capitilization - however, punctuation/capitalization from selected phrase item collections will still be added.";
    SettingsMenu.TOOLTIP_TRACK_STATISTICS_TEXT_TITLE = "Track Statistics";
    SettingsMenu.TOOLTIP_TRACK_STATISTICS_TEXT_BODY = "When off, will prevent any WPM, accuracy, and participation statistics from being updated.";
    SettingsMenu.TOOLTIP_PHRASE_ITEM_COLLECTIONS_TEXT_TITLE = "Phrase Item Collections";
    SettingsMenu.TOOLTIP_PHRASE_ITEM_COLLECTIONS_TEXT_BODY = "The item sets that the expression will randomly choose items from when generating a phrase. Items are single units and can be words, numbers, symbols, or any mix of the three depending on the collection."; // Each row is a subset. When a single subset is selected exclusively, statistics will be tracked for that specific subset. Subset-specific statistics can be viewed in 'Your Statistics'.
    SettingsMenu.TOOLTIP_PHRASE_PUNCTUATION_FREQUENCY_TEXT_TITLE = "Phrase Punctuation Frequency";
    SettingsMenu.TOOLTIP_PHRASE_PUNCTUATION_FREQUENCY_TEXT_BODY = "The probabilistic frequency of punctuation characters appearing in generated phrases. The lowest value equates to 1/100 items having punctuation (on average), the highest value equates to every item having punctuation.";
    SettingsMenu.phraseItemCollectionNameToButtonElementMap = {
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
    SettingsMenu.programmingRelatedPhraseItemCollectionNames = [
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
    SettingsMenu.numbersAndSymbolsPhraseItemCollectionNames = [
        "numbersCollection",
        "symbolsCollection"
    ];
    // private hasPunctuationBeenChangedByUser = false;
    SettingsMenu.instanceCountLimit = 1;
    SettingsMenu.instanceCount = 0;
    return SettingsMenu;
}());
export default SettingsMenu;
