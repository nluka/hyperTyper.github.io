import { englishWordsCommonCollection } from "../expression-resources/english/english-words-common.js";
import { englishWordsRandomCollection } from "../expression-resources/english/english-words-random.js";
import { numbersCollection } from "../expression-resources/numbers-symbols/numbers.js";
import { symbolsCollection } from "../expression-resources/numbers-symbols/symbols.js";
import SettingsStorage from "./SettingsStorage.js";
import Sound from "./Sound.js";
import {
  convertItemCollectionNameArrayToItemCollectionArray,
  getKeyFromObjectByValue,
  throwExceededClassInstanceLimitException,
  verifyNumberIsInRange
} from "../common/functions.js";
import { phraseItemCollectionNameToArrayMap } from "../common/constants.js";
import { settings } from "./main.js";

export default class Settings {
  public static readonly MIN_SOUND_VOLUME = 0.01;
  public static readonly MAX_SOUND_VOLUME = 1.0;
  public static readonly EXPRESSION_MODES = {
    QUOTE: "quote",
    PHRASE: "phrase"
  };
  public static readonly MIN_PHRASE_ITEM_COUNT = 1;
  public static readonly MAX_PHRASE_ITEM_COUNT = 100;
  public static readonly MIN_PHRASE_PUNCTUATION_FREQUENCY = 0.01;
  public static readonly MAX_PHRASE_PUNCTUATION_FREQUENCY = 1.0;
  public static readonly DEFAULT = {
    countdown: true,
    expressionMode: Settings.EXPRESSION_MODES.QUOTE,
    instantDeath: false,
    keyboardVisual: false,
    punctuation: true,
    trackStatistics: true,

    soundEffects: true,
    soundVolume: 0.5,

    phraseItemCount: 25,
    phrasePunctuationFrequency: 1/15,
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

  // Gameplay
  private countdown: boolean = Settings.DEFAULT.countdown;
  private expressionMode: string = Settings.DEFAULT.expressionMode;
  private instantDeath: boolean = Settings.DEFAULT.instantDeath;
  private keyboardVisual: boolean = Settings.DEFAULT.keyboardVisual;
  private punctuation: boolean = Settings.DEFAULT.punctuation;
  private trackStatistics: boolean = Settings.DEFAULT.trackStatistics;

  // Audio
  private soundEffects: boolean = Settings.DEFAULT.soundEffects;
  private soundVolume: number = Settings.DEFAULT.soundVolume;

  // Phrase
  private phraseItemCollections: string[][] = Settings.DEFAULT.phraseItemCollections;
  private phraseItemCount: number = Settings.DEFAULT.phraseItemCount;
  private phrasePunctuationFrequency: number = Settings.DEFAULT.phrasePunctuationFrequency;

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    Settings.instanceCount++;
    if (Settings.instanceCount > Settings.instanceCountLimit) {
      throwExceededClassInstanceLimitException("Settings", Settings.instanceCountLimit);
    }
  }

  //#region getters

  // There is only one instance of type "Settings" allowed and it is global.
  // This is why the following getters access "settings" instead of accessing "this".

  public getCountdown() {
    return settings["countdown"];
  }

  public getExpressionMode() {
    return settings["expressionMode"];
  }

  public getInstantDeath() {
    return settings["instantDeath"];
  }

  public getKeyboardVisual() {
    return settings["keyboardVisual"];
  }

  public getPunctuation() {
    return settings["punctuation"];
  }

  public getTrackStatistics() {
    return settings["trackStatistics"];
  }

  public getSoundEffects() {
    return settings["soundEffects"];
  }

  public getSoundVolume() {
    return settings["soundVolume"];
  }

  public getPhraseItemCollections() {
    return settings["phraseItemCollections"];
  }

  public getPhraseItemCount() {
    return settings["phraseItemCount"];
  }

  public getPhrasePunctuationFrequency() {
    return settings["phrasePunctuationFrequency"];
  }

  //#endregion

  //#region setters

  // There is only one instance of type "Settings" allowed and it is global.
  // This is why the following setters access "settings" instead of accessing "this".

  public setCountdown(bool: boolean) {
    settings.countdown = bool;
    SettingsStorage.setCountdown(bool);
  }

  public setExpressionMode(mode: string) {
    Settings.verifyExpressionMode(mode);
    settings.expressionMode = mode;
    SettingsStorage.setExpressionMode(mode);
  }

  public static verifyExpressionMode(mode: string) {
    if ( !(Object.values(Settings.EXPRESSION_MODES).includes(mode)) ) {
      throw `'${mode}' (${typeof mode}) is not a valid expressionMode`;
    }
  }

  public setInstantDeath(bool: boolean) {
    settings.instantDeath = bool;
    SettingsStorage.setInstantDeath(bool);
  }

  public setKeyboardVisual(bool: boolean) {
    settings.keyboardVisual = bool;
    SettingsStorage.setKeyboardVisual(bool);
  }

  public setPunctuation(bool: boolean) {
    settings.punctuation = bool;
    SettingsStorage.setPunctuation(bool);
  }

  public setTrackStatistics(bool: boolean) {
    settings.trackStatistics = bool;
    SettingsStorage.setTrackStatistics(bool);
  }

  public setSoundEffects(bool: boolean) {
    settings.soundEffects = bool;
    SettingsStorage.setSoundEffects(bool);
  }

  public setSoundVolume(float: number) {
    verifyNumberIsInRange(float, Settings.MIN_SOUND_VOLUME, Settings.MAX_SOUND_VOLUME);
    settings.soundVolume = float;
    Sound.setVolume(float);
    SettingsStorage.setSoundVolume(float);
  }

  public setPhraseItemCollections(itemCollections: string[][]) {
    let newItemCollectionNames: string[] = [];
    itemCollections.forEach((itemCollection) => {
      const itemCollectionName = getKeyFromObjectByValue(phraseItemCollectionNameToArrayMap, itemCollection);
      if (itemCollectionName !== null && itemCollectionName !== undefined) {
        newItemCollectionNames.push(itemCollectionName);
      }
    });
    SettingsStorage.setPhraseItemCollections(newItemCollectionNames);
  }

  public setPhraseItemCount(count: number) {
    verifyNumberIsInRange(count, Settings.MIN_PHRASE_ITEM_COUNT, Settings.MAX_PHRASE_ITEM_COUNT);
    settings.phraseItemCount = count;
    SettingsStorage.setPhraseItemCount(count);
  }

  public setPhrasePunctuationFrequency(fractionalChancePerItem: number) {
    verifyNumberIsInRange(fractionalChancePerItem, Settings.MIN_PHRASE_PUNCTUATION_FREQUENCY, Settings.MAX_PHRASE_PUNCTUATION_FREQUENCY);
    settings.phrasePunctuationFrequency = fractionalChancePerItem;
    SettingsStorage.setPhrasePunctuationFrequency(fractionalChancePerItem);
  }

  //#endregion

  //#region initialization

  public initializeAllValuesFromStorage() {
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
  }

  private initializeCountdown() {
    const storedBool = SettingsStorage.getBoolIfExists("countdown");
    if (storedBool !== null) {
      this["countdown"] = storedBool;
    }
  }

  private initializeExpressionMode() {
    const storedString = SettingsStorage.getStringIfExists("expressionMode");
    if (storedString !== null) {
      this["expressionMode"] = storedString;
    }
  }

  private initializeInstantDeath() {
    const storedBool = SettingsStorage.getBoolIfExists("instantDeath");
    if (storedBool !== null) {
      this["instantDeath"] = storedBool;
    }
  }

  private initializeKeyboardVisual() {
    const storedBool = SettingsStorage.getBoolIfExists("keyboardVisual");
    if (storedBool !== null) {
      this["keyboardVisual"] = storedBool;
    }
  }

  private initializePunctuation() {
    const storedBool = SettingsStorage.getBoolIfExists("punctuation");
    if (storedBool !== null) {
      this["punctuation"] = storedBool;
    }
  }

  private initializeTrackStatistics() {
    const storedBool = SettingsStorage.getBoolIfExists("trackStatistics");
    if (storedBool !== null) {
      this["trackStatistics"] = storedBool;
    }
  }

  private initializeSoundEffects() {
    const storedBool = SettingsStorage.getBoolIfExists("soundEffects");
    if (storedBool !== null) {
      this["soundEffects"] = storedBool;
    }
  }

  private initializeSoundVolume() {
    const storedBool = SettingsStorage.getFloatIfExists("soundVolume");
    if (storedBool !== null) {
      this["soundVolume"] = storedBool;
    }
  }

  private initializePhraseItemCollections() {
    const storedItemCollectionNames = SettingsStorage.getArrayIfExists("phraseItemCollections");
    if (storedItemCollectionNames !== null) {
      const itemCollections = convertItemCollectionNameArrayToItemCollectionArray(storedItemCollectionNames);
      this["phraseItemCollections"] = itemCollections;
    }
  }

  private initializePhraseItemCount() {
    const storedCount = SettingsStorage.getCountIfExists("phraseItemCount");
    if (storedCount !== null) {
      this["phraseItemCount"] = storedCount;
    }
  }

  private initializePhrasePunctuationFrequency() {
    const storedFloat = SettingsStorage.getFloatIfExists("phrasePunctuationFrequency");
    if (storedFloat !== null) {
      this["phrasePunctuationFrequency"] = storedFloat;
    }
  }

  //#endregion
}