import { parseBool } from "../common/functions.js";
import Settings from "./Settings.js";

export default class SettingsStorage {
  public static set(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  public static setPunctuation(bool: boolean) {
    this.set("punctuation", bool);
  }

  public static setKeyboardVisual(bool: boolean) {
    this.set("keyboardVisual", bool);
  }

  public static setInstantDeath(bool: boolean) {
    this.set("instantDeath", bool);
  }

  public static setTrackStatistics(bool: boolean) {
    this.set("trackStatistics", bool);
  }

  public static setCountdown(bool: boolean) {
    this.set("countdown", bool);
  }

  public static setSoundEffects(bool: boolean) {
    this.set("soundEffects", bool);
  }

  public static setSoundVolume(float: number) {
    this.set("soundVolume", float);
  }

  public static setExpressionMode(mode: string) {
    Settings.verifyExpressionMode(mode);
    this.set("expressionMode", mode);
  }

  public static setPhraseItemCollections(phraseItemCollectionNames: string[]) {
    this.set("phraseItemCollections", JSON.stringify(phraseItemCollectionNames));
  }

  public static setPhraseItemCount(count: number) {
    this.set("phraseItemCount", count);
  }

  public static setPhrasePunctuationFrequency(fractionalChancePerItem: number) {
    this.set("phrasePunctuationFrequency", fractionalChancePerItem);
  }

  public static getBoolIfExists(settingKey: string) {
    const stringifiedBool = localStorage.getItem(settingKey);
    if (stringifiedBool === null) {
      return null;
    }
    return parseBool(stringifiedBool);
  }

  public static getFloatIfExists(settingKey: string) {
    const stringifiedFloat = localStorage.getItem(settingKey);
    if (stringifiedFloat === null) {
      return null;
    }
    return parseFloat(stringifiedFloat);
  }

  public static getStringIfExists(settingKey: string) {
    return localStorage.getItem(settingKey);
  }

  public static getCountIfExists(settingKey: string) {
    const stringifiedCount = localStorage.getItem(settingKey);
    if (stringifiedCount === null) {
      return null;
    }
    return parseInt(stringifiedCount);
  }

  public static getArrayIfExists(settingKey: string) {
    const stringifiedArray = localStorage.getItem(settingKey);
    if (stringifiedArray === null) {
      return null;
    }
    return JSON.parse(stringifiedArray);
  }
}