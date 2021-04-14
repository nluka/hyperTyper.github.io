import { englishWordsCommonCollection } from "../expression-resources/english/english-words-common.js";
import { englishWordsRandomCollection } from "../expression-resources/english/english-words-random.js";
import { numbersCollection } from "../expression-resources/numbers-symbols/numbers.js";
import { symbolsCollection } from "../expression-resources/numbers-symbols/symbols.js";
import SettingsStorage from "./SettingsStorage.js";
import Sound from "./Sound.js";
import { convertItemCollectionNameArrayToItemCollectionArray, getKeyFromObjectByValue, throwExceededClassInstanceLimitException, verifyNumberIsInRange } from "../common/functions.js";
import { phraseItemCollectionNameToArrayMap } from "../common/constants.js";
import { settings } from "./main.js";
var Settings = /** @class */ (function () {
    function Settings() {
        // Gameplay
        this.countdown = Settings.DEFAULT.countdown;
        this.expressionMode = Settings.DEFAULT.expressionMode;
        this.instantDeath = Settings.DEFAULT.instantDeath;
        this.keyboardVisual = Settings.DEFAULT.keyboardVisual;
        this.punctuation = Settings.DEFAULT.punctuation;
        this.trackStatistics = Settings.DEFAULT.trackStatistics;
        // Audio
        this.soundEffects = Settings.DEFAULT.soundEffects;
        this.soundVolume = Settings.DEFAULT.soundVolume;
        // Phrase
        this.phraseItemCollections = Settings.DEFAULT.phraseItemCollections;
        this.phraseItemCount = Settings.DEFAULT.phraseItemCount;
        this.phrasePunctuationFrequency = Settings.DEFAULT.phrasePunctuationFrequency;
        Settings.instanceCount++;
        if (Settings.instanceCount > Settings.instanceCountLimit) {
            throwExceededClassInstanceLimitException("Settings", Settings.instanceCountLimit);
        }
    }
    //#region getters
    // There is only one instance of type "Settings" allowed and it is global.
    // This is why the following getters access "settings" instead of accessing "this".
    Settings.prototype.getCountdown = function () {
        return settings["countdown"];
    };
    Settings.prototype.getExpressionMode = function () {
        return settings["expressionMode"];
    };
    Settings.prototype.getInstantDeath = function () {
        return settings["instantDeath"];
    };
    Settings.prototype.getKeyboardVisual = function () {
        return settings["keyboardVisual"];
    };
    Settings.prototype.getPunctuation = function () {
        return settings["punctuation"];
    };
    Settings.prototype.getTrackStatistics = function () {
        return settings["trackStatistics"];
    };
    Settings.prototype.getSoundEffects = function () {
        return settings["soundEffects"];
    };
    Settings.prototype.getSoundVolume = function () {
        return settings["soundVolume"];
    };
    Settings.prototype.getPhraseItemCollections = function () {
        return settings["phraseItemCollections"];
    };
    Settings.prototype.getPhraseItemCount = function () {
        return settings["phraseItemCount"];
    };
    Settings.prototype.getPhrasePunctuationFrequency = function () {
        return settings["phrasePunctuationFrequency"];
    };
    //#endregion
    //#region setters
    // There is only one instance of type "Settings" allowed and it is global.
    // This is why the following setters access "settings" instead of accessing "this".
    Settings.prototype.setCountdown = function (bool) {
        settings.countdown = bool;
        SettingsStorage.setCountdown(bool);
    };
    Settings.prototype.setExpressionMode = function (mode) {
        Settings.verifyExpressionMode(mode);
        settings.expressionMode = mode;
        SettingsStorage.setExpressionMode(mode);
    };
    Settings.verifyExpressionMode = function (mode) {
        if (!(Object.values(Settings.EXPRESSION_MODES).includes(mode))) {
            throw "'" + mode + "' (" + typeof mode + ") is not a valid expressionMode";
        }
    };
    Settings.prototype.setInstantDeath = function (bool) {
        settings.instantDeath = bool;
        SettingsStorage.setInstantDeath(bool);
    };
    Settings.prototype.setKeyboardVisual = function (bool) {
        settings.keyboardVisual = bool;
        SettingsStorage.setKeyboardVisual(bool);
    };
    Settings.prototype.setPunctuation = function (bool) {
        settings.punctuation = bool;
        SettingsStorage.setPunctuation(bool);
    };
    Settings.prototype.setTrackStatistics = function (bool) {
        settings.trackStatistics = bool;
        SettingsStorage.setTrackStatistics(bool);
    };
    Settings.prototype.setSoundEffects = function (bool) {
        settings.soundEffects = bool;
        SettingsStorage.setSoundEffects(bool);
    };
    Settings.prototype.setSoundVolume = function (float) {
        verifyNumberIsInRange(float, Settings.MIN_SOUND_VOLUME, Settings.MAX_SOUND_VOLUME);
        settings.soundVolume = float;
        Sound.setVolume(float);
        SettingsStorage.setSoundVolume(float);
    };
    Settings.prototype.setPhraseItemCollections = function (itemCollections) {
        var newItemCollectionNames = [];
        itemCollections.forEach(function (itemCollection) {
            var itemCollectionName = getKeyFromObjectByValue(phraseItemCollectionNameToArrayMap, itemCollection);
            if (itemCollectionName !== null && itemCollectionName !== undefined) {
                newItemCollectionNames.push(itemCollectionName);
            }
        });
        SettingsStorage.setPhraseItemCollections(newItemCollectionNames);
    };
    Settings.prototype.setPhraseItemCount = function (count) {
        verifyNumberIsInRange(count, Settings.MIN_PHRASE_ITEM_COUNT, Settings.MAX_PHRASE_ITEM_COUNT);
        settings.phraseItemCount = count;
        SettingsStorage.setPhraseItemCount(count);
    };
    Settings.prototype.setPhrasePunctuationFrequency = function (fractionalChancePerItem) {
        verifyNumberIsInRange(fractionalChancePerItem, Settings.MIN_PHRASE_PUNCTUATION_FREQUENCY, Settings.MAX_PHRASE_PUNCTUATION_FREQUENCY);
        settings.phrasePunctuationFrequency = fractionalChancePerItem;
        SettingsStorage.setPhrasePunctuationFrequency(fractionalChancePerItem);
    };
    //#endregion
    //#region initialization
    Settings.prototype.initializeAllValuesFromStorage = function () {
        this.initializeCountdown();
        this.initializeExpressionMode();
        this.initializeInstantDeath();
        this.initializeKeyboardVisual();
        this.initializePunctuation();
        this.initializeTrackStatistics();
        this.initializeSoundEffects();
        this.initializeSoundVolume();
        this.initializePhraseItemCollections();
        this.initializePhraseItemCount();
        this.initializePhrasePunctuationFrequency();
    };
    Settings.prototype.initializeCountdown = function () {
        var storedBool = SettingsStorage.getBoolIfExists("countdown");
        if (storedBool !== null) {
            this["countdown"] = storedBool;
        }
    };
    Settings.prototype.initializeExpressionMode = function () {
        var storedString = SettingsStorage.getStringIfExists("expressionMode");
        if (storedString !== null) {
            this["expressionMode"] = storedString;
        }
    };
    Settings.prototype.initializeInstantDeath = function () {
        var storedBool = SettingsStorage.getBoolIfExists("instantDeath");
        if (storedBool !== null) {
            this["instantDeath"] = storedBool;
        }
    };
    Settings.prototype.initializeKeyboardVisual = function () {
        var storedBool = SettingsStorage.getBoolIfExists("keyboardVisual");
        if (storedBool !== null) {
            this["keyboardVisual"] = storedBool;
        }
    };
    Settings.prototype.initializePunctuation = function () {
        var storedBool = SettingsStorage.getBoolIfExists("punctuation");
        if (storedBool !== null) {
            this["punctuation"] = storedBool;
        }
    };
    Settings.prototype.initializeTrackStatistics = function () {
        var storedBool = SettingsStorage.getBoolIfExists("trackStatistics");
        if (storedBool !== null) {
            this["trackStatistics"] = storedBool;
        }
    };
    Settings.prototype.initializeSoundEffects = function () {
        var storedBool = SettingsStorage.getBoolIfExists("soundEffects");
        if (storedBool !== null) {
            this["soundEffects"] = storedBool;
        }
    };
    Settings.prototype.initializeSoundVolume = function () {
        var storedBool = SettingsStorage.getFloatIfExists("soundVolume");
        if (storedBool !== null) {
            this["soundVolume"] = storedBool;
        }
    };
    Settings.prototype.initializePhraseItemCollections = function () {
        var storedItemCollectionNames = SettingsStorage.getArrayIfExists("phraseItemCollections");
        if (storedItemCollectionNames !== null) {
            var itemCollections = convertItemCollectionNameArrayToItemCollectionArray(storedItemCollectionNames);
            this["phraseItemCollections"] = itemCollections;
        }
    };
    Settings.prototype.initializePhraseItemCount = function () {
        var storedCount = SettingsStorage.getCountIfExists("phraseItemCount");
        if (storedCount !== null) {
            this["phraseItemCount"] = storedCount;
        }
    };
    Settings.prototype.initializePhrasePunctuationFrequency = function () {
        var storedFloat = SettingsStorage.getFloatIfExists("phrasePunctuationFrequency");
        if (storedFloat !== null) {
            this["phrasePunctuationFrequency"] = storedFloat;
        }
    };
    Settings.MIN_SOUND_VOLUME = 0.01;
    Settings.MAX_SOUND_VOLUME = 1.0;
    Settings.EXPRESSION_MODES = {
        QUOTE: "quote",
        PHRASE: "phrase"
    };
    Settings.MIN_PHRASE_ITEM_COUNT = 1;
    Settings.MAX_PHRASE_ITEM_COUNT = 100;
    Settings.MIN_PHRASE_PUNCTUATION_FREQUENCY = 0.01;
    Settings.MAX_PHRASE_PUNCTUATION_FREQUENCY = 1.0;
    Settings.DEFAULT = {
        countdown: true,
        expressionMode: Settings.EXPRESSION_MODES.QUOTE,
        instantDeath: false,
        keyboardVisual: false,
        punctuation: true,
        trackStatistics: true,
        soundEffects: true,
        soundVolume: 0.5,
        phraseItemCount: 25,
        phrasePunctuationFrequency: 1 / 15,
        phraseItemCollections: [
            englishWordsCommonCollection,
            englishWordsRandomCollection,
            numbersCollection,
            symbolsCollection,
        ],
        phraseItemCollectionNames: [
            "englishWordsCommonCollection",
            "englishWordsRandomCollection",
            "numbersCollection",
            "symbolsCollection",
        ]
    };
    Settings.instanceCountLimit = 1;
    Settings.instanceCount = 0;
    return Settings;
}());
export default Settings;
