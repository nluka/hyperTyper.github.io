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
import { CHARACTERS_PER_WORD, SECONDS_PER_MINUTE, phraseItemCollectionNameToArrayMap } from "./constants.js";
export function parseBool(value) {
    if (typeof value === "boolean") {
        return value;
    }
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === "object") {
        return !isObjectEmpty(value);
    }
    switch (value.toLowerCase()) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            tryToLogErrorStack();
            throw "\"" + value + "\" cannot be converted to a bool";
    }
}
export function roundFloat(float, decimalPlaces) {
    return parseFloat(float.toFixed(decimalPlaces));
}
export function getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
export function probabilityToReturnTrue(floatFromZeroToOne) {
    return Math.random() < floatFromZeroToOne;
}
export function isObjectEmpty(object) {
    return Object.keys(object).length === 0;
}
export function throwExceededClassInstanceLimitException(className, instanceLimit) {
    throw "exceeded \"" + className + "\" class instance limit of \"" + instanceLimit + "\"";
}
export function verifyNumberIsInRange(number, min, max) {
    if (number < min || number > max) {
        tryToLogErrorStack();
        throw "number '" + number + "' is not in range " + min + "-" + max;
    }
}
export function tryToLogErrorStack() {
    try {
        console.log(new Error().stack);
    }
    catch (error) {
        console.log("couldn't log 'new Error().stack':", error);
    }
}
export function getValueFromObjectByKey(object, key) {
    var valueIndex = Object.keys(object).indexOf(key);
    var value = Object.values(object)[valueIndex];
    return value;
}
export function getKeyFromObjectByValue(object, value) {
    var keyIndex = Object.values(object).indexOf(value);
    if (keyIndex === -1) {
        return null;
    }
    var key = Object.keys(object)[keyIndex];
    return key;
}
export function getFetch(baseUrl, params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var completeUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    completeUrl = getUrlWithAppendedQueries(baseUrl, params);
                    return [4 /*yield*/, fetch(completeUrl).then(function (response) {
                            return response.json();
                        }).catch(function (error) {
                            console.log("Error retrieving quote from " + completeUrl + ": '" + error + "'");
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
export function getUrlWithAppendedQueries(baseUrl, params) {
    if (params === void 0) { params = {}; }
    if (isObjectEmpty(params)) {
        return baseUrl;
    }
    var queryEntries = Object.entries(params);
    var queryStrings = queryEntries.map(function (param) {
        return param[0] + "=" + param[1];
    });
    var queryString = queryStrings.join("&");
    var urlWithAppendedQueries = baseUrl + "?" + queryString;
    return urlWithAppendedQueries;
}
export var sleepMs = function (milliseconds) { return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); }); };
export function calculateNetWordsPerMinute(textLength, secondsElapsed) {
    var words = textLength / CHARACTERS_PER_WORD;
    var minutes = secondsElapsed / SECONDS_PER_MINUTE;
    return words / minutes;
}
export function calculateAccuracyPercentage(textLength, charactersTypedCount, mistakeCount) {
    var fractionalAccuracy = textLength / (charactersTypedCount + mistakeCount);
    return fractionalAccuracy * 100;
}
export function handleInternetExplorer() {
    if (!isBrowserInternetExplorer()) {
        return;
    }
    var internetExplorerOverlay_div = document.createElement("div");
    internetExplorerOverlay_div.classList.add("internet-explorer-overlay");
    internetExplorerOverlay_div.innerText =
        "This website uses features which are not supported by the Internet Explorer web browser. " +
            "Please use a different web browser such as Google Chrome, Mozilla Firefox, Microsoft Edge, or Opera to access this page.";
    document.documentElement.appendChild(internetExplorerOverlay_div);
}
export function isBrowserInternetExplorer() {
    var userAgent = navigator.userAgent;
    // MSIE used to detect old browsers and Trident used to detect newer ones
    return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
}
export function convertItemCollectionArrayToItemCollectionNameArray(itemCollectionArray) {
    var itemCollectionNames = [];
    itemCollectionArray.forEach(function (itemCollection) {
        var itemCollectionName = getKeyFromObjectByValue(phraseItemCollectionNameToArrayMap, itemCollection);
        if (itemCollectionName !== null && itemCollectionName !== undefined) {
            itemCollectionNames.push(itemCollectionName);
        }
    });
    return itemCollectionNames;
}
export function convertItemCollectionNameArrayToItemCollectionArray(itemCollectionNameArray) {
    var itemCollections = [];
    itemCollectionNameArray.forEach(function (itemCollectionName) {
        var itemCollection = getValueFromObjectByKey(phraseItemCollectionNameToArrayMap, itemCollectionName);
        itemCollections.push(itemCollection);
    });
    return itemCollections;
}
export function areArraysEqual(array1, array2) {
    array1.sort();
    array2.sort();
    for (var i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}
