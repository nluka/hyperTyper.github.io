import { roundFloat } from './functions.js';

const LOCAL_STORAGE_FLOAT_DECIMAL_PLACES = 4;
const LOCAL_STORAGE_COUNT_DECIMAL_PLACES = 0;

export default class StatisticsStorage {
  public static readonly KEYS = {
    WPM_LAST_GAME: "wpmLastGame",
    WPM_LAST_TEN_GAMES: "wpmLastTenGames",
    WPM_AVERAGE_TO_DATE: "wpmAverageToDate",
    WPM_ALL_TIME_BEST: "wpmAllTimeBest",

    ACCURACY_LAST_GAME: "accuracyLastGame",
    ACCURACY_LAST_TEN_GAMES: "accuracyLastTenGames",
    ACCURACY_AVERAGE_TO_DATE: "accuracyAverageToDate",
    ACCURACY_ALL_TIME_BEST: "accuracyAllTimeBest",

    PLAYTIME_IN_SECONDS: "playtimeInSeconds",
    GAMES_COMPLETED: "gamesCompleted",
    GAMES_ABORTED: "gamesAborted",
    GAMES_DISQUALIFIED: "gamesDisqualified",
    GAMES_CHEATED: "gamesCheated"
  };

  //#region (get statistic from storage if exists) methods

  public static getWpmLastGameIfExists(decimalPlaces: number) {
    return this.getFloatIfExists(
      this.KEYS.WPM_LAST_GAME,
      decimalPlaces
    );
  }

  public static getWpmLastTenGamesIfExists(decimalPlaces: number) {
    return this.getArrayAverageFloatIfExists(
      this.KEYS.WPM_LAST_TEN_GAMES,
      decimalPlaces
    );
  }

  public static getWpmAverageToDateIfExists(decimalPlaces: number) {
    return this.getFloatIfExists(
      this.KEYS.WPM_AVERAGE_TO_DATE,
      decimalPlaces
    );
  }

  public static getWpmAllTimeBestIfExists(decimalPlaces: number) {
    return this.getFloatIfExists(
      this.KEYS.WPM_ALL_TIME_BEST,
      decimalPlaces
    );
  }

  public static getAccuracyLastGameIfExists(decimalPlaces: number) {
    return this.getFloatIfExists(
      this.KEYS.ACCURACY_LAST_GAME,
      decimalPlaces
    );
  }

  public static getAccuracyLastTenGamesIfExists(decimalPlaces: number) {
    return this.getArrayAverageFloatIfExists(
      this.KEYS.ACCURACY_LAST_TEN_GAMES,
      decimalPlaces
    );
  }

  public static getAccuracyAverageToDateIfExists(decimalPlaces: number) {
    return this.getFloatIfExists(
      this.KEYS.ACCURACY_AVERAGE_TO_DATE,
      decimalPlaces
    );
  }

  public static getAccuracyAllTimeBestIfExists(decimalPlaces: number) {
    return this.getFloatIfExists(
      this.KEYS.ACCURACY_ALL_TIME_BEST,
      decimalPlaces
    );
  }

  public static getPlaytimeInSeconds(decimalPlaces: number) {
    return this.getFloat(
      this.KEYS.PLAYTIME_IN_SECONDS,
      decimalPlaces
    );
  }

  public static getGamesCompleted() {
    return this.getCount(this.KEYS.GAMES_COMPLETED);
  }

  public static getGamesAborted() {
    return this.getCount(this.KEYS.GAMES_ABORTED);
  }

  public static getGamesDisqualified() {
    return this.getCount(this.KEYS.GAMES_DISQUALIFIED);
  }

  public static getGamesCheated() {
    const count = this.getCountIfExists(this.KEYS.GAMES_CHEATED);
    if (count === null) {
      return 0;
    }
    return count;
  }

  //#endregion

  //#region (get value by type) methods

  private static getFloat(key: string, decimalPlaces: number) {
    const float = this.getFloatIfExists(key, decimalPlaces);
    if (float === null) {
      return 0;
    }
    return float;
  }

  public static getFloatIfExists(key: string, decimalPlaces: number) {
    const stringifiedFloat = localStorage.getItem(key);
    if (stringifiedFloat === null) {
      return null;
    }
    return roundFloat(parseFloat(stringifiedFloat), decimalPlaces);
  }

  private static getCount(key: string) {
    const count = this.getCountIfExists(key);
    if (count === null) {
      return 0;
    }
    return count;
  }

  public static getCountIfExists(key: string) {
    const stringifiedCount = localStorage.getItem(key);
    if (stringifiedCount === null) {
      return null;
    }
    return parseInt(stringifiedCount);
  }

  private static getArrayAverageFloatIfExists(key: string, decimalPlaces: number) {
    const stringifiedArray = localStorage.getItem(key);
    if (stringifiedArray === null) {
      return null;
    }
    const array = JSON.parse(stringifiedArray);
    let arraySum = 0;
    for (let i = 0; i < array.length; i++) {
      arraySum += parseFloat(array[i]);
    }
    return roundFloat(arraySum / array.length, decimalPlaces);
  }

  //#endregion

  public static updateStatisticsSpecificToGameCompletion(wordsPerMinute: number, accuracyPercentage: number) {
    this.setLastGameValue(this.KEYS.WPM_LAST_GAME, wordsPerMinute);
    this.updateLastTenGamesArray(this.KEYS.WPM_LAST_TEN_GAMES, wordsPerMinute);
    this.updateAverageToDateValue(this.KEYS.WPM_AVERAGE_TO_DATE, wordsPerMinute);
    this.updateAllTimeBestValue(this.KEYS.WPM_ALL_TIME_BEST, wordsPerMinute);

    this.setLastGameValue(this.KEYS.ACCURACY_LAST_GAME, accuracyPercentage);
    this.updateLastTenGamesArray(this.KEYS.ACCURACY_LAST_TEN_GAMES, accuracyPercentage);
    this.updateAverageToDateValue(this.KEYS.ACCURACY_AVERAGE_TO_DATE, accuracyPercentage);
    this.updateAllTimeBestValue(this.KEYS.ACCURACY_ALL_TIME_BEST, accuracyPercentage);

    this.incrementCount(this.KEYS.GAMES_COMPLETED);
  }

  //#region (set/update/increment statistic or value) methods

  private static setLastGameValue(key: string, value: number) {
    this.setFloat(key, value);
  }

  private static setFloat(key: string, value:number) {
    localStorage.setItem(key, value.toFixed(LOCAL_STORAGE_FLOAT_DECIMAL_PLACES));
  }

  private static updateLastTenGamesArray(key: string, newValue: number) {
    const previousStringifiedArray = localStorage.getItem(key);
    if (previousStringifiedArray === null) {
      this.setFloatArray(key, [newValue]);
      return;
    }
    const previousArray = JSON.parse(previousStringifiedArray);
    const newArray = this.getNewLastTenGamesArray(previousArray, newValue);
    this.setFloatArray(key, newArray);
  }

  private static getNewLastTenGamesArray(previousArray: number[], newValue: number) {
    let newArray = [];
    if (previousArray.length < 10) {
      newArray = previousArray;
    } else {
      newArray = previousArray.slice(1, 10); // remove oldest value
    }
    newArray.push(
      roundFloat(newValue, LOCAL_STORAGE_FLOAT_DECIMAL_PLACES)
    );
    return newArray;
  }

  private static setFloatArray(key: string, floatArray: number[]) {
    let floatArrayRounded: number[] = [];
    floatArray.forEach((float, index) => {
      floatArrayRounded[index] = roundFloat(float, LOCAL_STORAGE_FLOAT_DECIMAL_PLACES);
    });
    localStorage.setItem(key, JSON.stringify(floatArrayRounded));
  }

  private static updateAverageToDateValue(key: string, newValue: number) {
    const previousStringifiedAverage = localStorage.getItem(key);
    if (previousStringifiedAverage === null) {
      this.setFloat(key, newValue);
      return;
    }
    const previousAverage = parseFloat(previousStringifiedAverage);
    const previousGamesCompleted = this.getGamesCompleted();
    const newAverage =
      (previousAverage * previousGamesCompleted + newValue) /
      (previousGamesCompleted + 1);
    this.setFloat(key, newAverage);
  }

  private static updateAllTimeBestValue(key: string, newValue: number) {
    const previousAllTimeBest = this.getFloatIfExists(key, LOCAL_STORAGE_FLOAT_DECIMAL_PLACES);
    if ((previousAllTimeBest === null) || (newValue > previousAllTimeBest)) {
      this.setFloat(key, newValue);
    }
  }

  public static incrementPlaytimeInSecondsBy(seconds: number) {
    const previousPlaytimeInSeconds = this.getPlaytimeInSeconds(1);
    if (previousPlaytimeInSeconds === null) {
      this.setFloat(this.KEYS.PLAYTIME_IN_SECONDS, seconds);
      return;
    }
    this.setFloat(this.KEYS.PLAYTIME_IN_SECONDS, previousPlaytimeInSeconds + seconds);
  }

  public static incrementCount(key: string) {
    const previousCount = this.getCountIfExists(key);
    if (previousCount === null) {
      this.setCount(key, 1);
      return;
    }
    this.setCount(key, previousCount + 1);
  }

  private static setCount(key: string, count: number) {
    localStorage.setItem(key, count.toFixed(LOCAL_STORAGE_COUNT_DECIMAL_PLACES));
  }

  //#endregion

  public static removeAllItems() {
    const keys = Object.values(this.KEYS);
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
  }
}