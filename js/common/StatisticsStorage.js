import { roundFloat } from './functions.js';
var LOCAL_STORAGE_FLOAT_DECIMAL_PLACES = 4;
var LOCAL_STORAGE_COUNT_DECIMAL_PLACES = 0;
var StatisticsStorage = /** @class */ (function () {
    function StatisticsStorage() {
    }
    //#region (get statistic from storage if exists) methods
    StatisticsStorage.getWpmLastGameIfExists = function (decimalPlaces) {
        return this.getFloatIfExists(this.KEYS.WPM_LAST_GAME, decimalPlaces);
    };
    StatisticsStorage.getWpmLastTenGamesIfExists = function (decimalPlaces) {
        return this.getArrayAverageFloatIfExists(this.KEYS.WPM_LAST_TEN_GAMES, decimalPlaces);
    };
    StatisticsStorage.getWpmAverageToDateIfExists = function (decimalPlaces) {
        return this.getFloatIfExists(this.KEYS.WPM_AVERAGE_TO_DATE, decimalPlaces);
    };
    StatisticsStorage.getWpmAllTimeBestIfExists = function (decimalPlaces) {
        return this.getFloatIfExists(this.KEYS.WPM_ALL_TIME_BEST, decimalPlaces);
    };
    StatisticsStorage.getAccuracyLastGameIfExists = function (decimalPlaces) {
        return this.getFloatIfExists(this.KEYS.ACCURACY_LAST_GAME, decimalPlaces);
    };
    StatisticsStorage.getAccuracyLastTenGamesIfExists = function (decimalPlaces) {
        return this.getArrayAverageFloatIfExists(this.KEYS.ACCURACY_LAST_TEN_GAMES, decimalPlaces);
    };
    StatisticsStorage.getAccuracyAverageToDateIfExists = function (decimalPlaces) {
        return this.getFloatIfExists(this.KEYS.ACCURACY_AVERAGE_TO_DATE, decimalPlaces);
    };
    StatisticsStorage.getAccuracyAllTimeBestIfExists = function (decimalPlaces) {
        return this.getFloatIfExists(this.KEYS.ACCURACY_ALL_TIME_BEST, decimalPlaces);
    };
    StatisticsStorage.getPlaytimeInSeconds = function (decimalPlaces) {
        return this.getFloat(this.KEYS.PLAYTIME_IN_SECONDS, decimalPlaces);
    };
    StatisticsStorage.getGamesCompleted = function () {
        return this.getCount(this.KEYS.GAMES_COMPLETED);
    };
    StatisticsStorage.getGamesAborted = function () {
        return this.getCount(this.KEYS.GAMES_ABORTED);
    };
    StatisticsStorage.getGamesDisqualified = function () {
        return this.getCount(this.KEYS.GAMES_DISQUALIFIED);
    };
    StatisticsStorage.getGamesCheated = function () {
        var count = this.getCountIfExists(this.KEYS.GAMES_CHEATED);
        if (count === null) {
            return 0;
        }
        return count;
    };
    //#endregion
    //#region (get value by type) methods
    StatisticsStorage.getFloat = function (key, decimalPlaces) {
        var float = this.getFloatIfExists(key, decimalPlaces);
        if (float === null) {
            return 0;
        }
        return float;
    };
    StatisticsStorage.getFloatIfExists = function (key, decimalPlaces) {
        var stringifiedFloat = localStorage.getItem(key);
        if (stringifiedFloat === null) {
            return null;
        }
        return roundFloat(parseFloat(stringifiedFloat), decimalPlaces);
    };
    StatisticsStorage.getCount = function (key) {
        var count = this.getCountIfExists(key);
        if (count === null) {
            return 0;
        }
        return count;
    };
    StatisticsStorage.getCountIfExists = function (key) {
        var stringifiedCount = localStorage.getItem(key);
        if (stringifiedCount === null) {
            return null;
        }
        return parseInt(stringifiedCount);
    };
    StatisticsStorage.getArrayAverageFloatIfExists = function (key, decimalPlaces) {
        var stringifiedArray = localStorage.getItem(key);
        if (stringifiedArray === null) {
            return null;
        }
        var array = JSON.parse(stringifiedArray);
        var arraySum = 0;
        for (var i = 0; i < array.length; i++) {
            arraySum += parseFloat(array[i]);
        }
        return roundFloat(arraySum / array.length, decimalPlaces);
    };
    //#endregion
    StatisticsStorage.updateStatisticsSpecificToGameCompletion = function (wordsPerMinute, accuracyPercentage) {
        this.setLastGameValue(this.KEYS.WPM_LAST_GAME, wordsPerMinute);
        this.updateLastTenGamesArray(this.KEYS.WPM_LAST_TEN_GAMES, wordsPerMinute);
        this.updateAverageToDateValue(this.KEYS.WPM_AVERAGE_TO_DATE, wordsPerMinute);
        this.updateAllTimeBestValue(this.KEYS.WPM_ALL_TIME_BEST, wordsPerMinute);
        this.setLastGameValue(this.KEYS.ACCURACY_LAST_GAME, accuracyPercentage);
        this.updateLastTenGamesArray(this.KEYS.ACCURACY_LAST_TEN_GAMES, accuracyPercentage);
        this.updateAverageToDateValue(this.KEYS.ACCURACY_AVERAGE_TO_DATE, accuracyPercentage);
        this.updateAllTimeBestValue(this.KEYS.ACCURACY_ALL_TIME_BEST, accuracyPercentage);
        this.incrementCount(this.KEYS.GAMES_COMPLETED);
    };
    //#region (set/update/increment statistic or value) methods
    StatisticsStorage.setLastGameValue = function (key, value) {
        this.setFloat(key, value);
    };
    StatisticsStorage.setFloat = function (key, value) {
        localStorage.setItem(key, value.toFixed(LOCAL_STORAGE_FLOAT_DECIMAL_PLACES));
    };
    StatisticsStorage.updateLastTenGamesArray = function (key, newValue) {
        var previousStringifiedArray = localStorage.getItem(key);
        if (previousStringifiedArray === null) {
            this.setFloatArray(key, [newValue]);
            return;
        }
        var previousArray = JSON.parse(previousStringifiedArray);
        var newArray = this.getNewLastTenGamesArray(previousArray, newValue);
        this.setFloatArray(key, newArray);
    };
    StatisticsStorage.getNewLastTenGamesArray = function (previousArray, newValue) {
        var newArray = [];
        if (previousArray.length < 10) {
            newArray = previousArray;
        }
        else {
            newArray = previousArray.slice(1, 10); // remove oldest value
        }
        newArray.push(roundFloat(newValue, LOCAL_STORAGE_FLOAT_DECIMAL_PLACES));
        return newArray;
    };
    StatisticsStorage.setFloatArray = function (key, floatArray) {
        var floatArrayRounded = [];
        floatArray.forEach(function (float, index) {
            floatArrayRounded[index] = roundFloat(float, LOCAL_STORAGE_FLOAT_DECIMAL_PLACES);
        });
        localStorage.setItem(key, JSON.stringify(floatArrayRounded));
    };
    StatisticsStorage.updateAverageToDateValue = function (key, newValue) {
        var previousStringifiedAverage = localStorage.getItem(key);
        if (previousStringifiedAverage === null) {
            this.setFloat(key, newValue);
            return;
        }
        var previousAverage = parseFloat(previousStringifiedAverage);
        var previousGamesCompleted = this.getGamesCompleted();
        var newAverage = (previousAverage * previousGamesCompleted + newValue) /
            (previousGamesCompleted + 1);
        this.setFloat(key, newAverage);
    };
    StatisticsStorage.updateAllTimeBestValue = function (key, newValue) {
        var previousAllTimeBest = this.getFloatIfExists(key, LOCAL_STORAGE_FLOAT_DECIMAL_PLACES);
        if ((previousAllTimeBest === null) || (newValue > previousAllTimeBest)) {
            this.setFloat(key, newValue);
        }
    };
    StatisticsStorage.incrementPlaytimeInSecondsBy = function (seconds) {
        var previousPlaytimeInSeconds = this.getPlaytimeInSeconds(1);
        if (previousPlaytimeInSeconds === null) {
            this.setFloat(this.KEYS.PLAYTIME_IN_SECONDS, seconds);
            return;
        }
        this.setFloat(this.KEYS.PLAYTIME_IN_SECONDS, previousPlaytimeInSeconds + seconds);
    };
    StatisticsStorage.incrementCount = function (key) {
        var previousCount = this.getCountIfExists(key);
        if (previousCount === null) {
            this.setCount(key, 1);
            return;
        }
        this.setCount(key, previousCount + 1);
    };
    StatisticsStorage.setCount = function (key, count) {
        localStorage.setItem(key, count.toFixed(LOCAL_STORAGE_COUNT_DECIMAL_PLACES));
    };
    //#endregion
    StatisticsStorage.removeAllItems = function () {
        var keys = Object.values(this.KEYS);
        keys.forEach(function (key) {
            console.log(key);
            localStorage.removeItem(key);
        });
    };
    StatisticsStorage.KEYS = {
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
    return StatisticsStorage;
}());
export default StatisticsStorage;
