import { parseBool } from "../common/functions.js";
import Settings from "./Settings.js";
var SettingsStorage = /** @class */ (function () {
    function SettingsStorage() {
    }
    SettingsStorage.set = function (key, value) {
        localStorage.setItem(key, value);
    };
    SettingsStorage.setPunctuation = function (bool) {
        this.set("punctuation", bool);
    };
    SettingsStorage.setKeyboardVisual = function (bool) {
        this.set("keyboardVisual", bool);
    };
    SettingsStorage.setInstantDeath = function (bool) {
        this.set("instantDeath", bool);
    };
    SettingsStorage.setTrackStatistics = function (bool) {
        this.set("trackStatistics", bool);
    };
    SettingsStorage.setCountdown = function (bool) {
        this.set("countdown", bool);
    };
    SettingsStorage.setSoundEffects = function (bool) {
        this.set("soundEffects", bool);
    };
    SettingsStorage.setSoundVolume = function (float) {
        this.set("soundVolume", float);
    };
    SettingsStorage.setExpressionMode = function (mode) {
        Settings.verifyExpressionMode(mode);
        this.set("expressionMode", mode);
    };
    SettingsStorage.setPhraseItemCollections = function (phraseItemCollectionNames) {
        this.set("phraseItemCollections", JSON.stringify(phraseItemCollectionNames));
    };
    SettingsStorage.setPhraseItemCount = function (count) {
        this.set("phraseItemCount", count);
    };
    SettingsStorage.setPhrasePunctuationFrequency = function (fractionalChancePerItem) {
        this.set("phrasePunctuationFrequency", fractionalChancePerItem);
    };
    SettingsStorage.getBoolIfExists = function (settingKey) {
        var stringifiedBool = localStorage.getItem(settingKey);
        if (stringifiedBool === null) {
            return null;
        }
        return parseBool(stringifiedBool);
    };
    SettingsStorage.getFloatIfExists = function (settingKey) {
        var stringifiedFloat = localStorage.getItem(settingKey);
        if (stringifiedFloat === null) {
            return null;
        }
        return parseFloat(stringifiedFloat);
    };
    SettingsStorage.getStringIfExists = function (settingKey) {
        return localStorage.getItem(settingKey);
    };
    SettingsStorage.getCountIfExists = function (settingKey) {
        var stringifiedCount = localStorage.getItem(settingKey);
        if (stringifiedCount === null) {
            return null;
        }
        return parseInt(stringifiedCount);
    };
    SettingsStorage.getArrayIfExists = function (settingKey) {
        var stringifiedArray = localStorage.getItem(settingKey);
        if (stringifiedArray === null) {
            return null;
        }
        return JSON.parse(stringifiedArray);
    };
    return SettingsStorage;
}());
export default SettingsStorage;
