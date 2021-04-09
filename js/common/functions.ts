import { CHARACTERS_PER_WORD, SECONDS_PER_MINUTE, phraseItemCollectionNameToArrayMap } from "./constants.js";

export function parseBool(value: any) {
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
      throw `"${value}" cannot be converted to a bool`;
  }
}

export function roundFloat(float: number, decimalPlaces: number) {
  return parseFloat(float.toFixed(decimalPlaces));
}

export function getRandomElementFromArray(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function probabilityToReturnTrue(floatFromZeroToOne: number) {
  return Math.random() < floatFromZeroToOne;
}

export function isObjectEmpty(object: object) {
  return Object.keys(object).length === 0;
}

export function throwExceededClassInstanceLimitException(className: string, instanceLimit: number) {
  throw `exceeded "${className}" class instance limit of "${instanceLimit}"`;
}

export function verifyNumberIsInRange(number: number, min: number, max: number) {
  if (number < min || number > max) {
    tryToLogErrorStack();
    throw `number '${number}' is not in range ${min}-${max}`;
  }
}

export function tryToLogErrorStack() {
  try {
    console.log(new Error().stack);
  } catch(error) {
    console.log("couldn't log 'new Error().stack':", error);
  }
}

export function getValueFromObjectByKey(object: object, key: string) {
  const valueIndex = Object.keys(object).indexOf(key);
  const value = Object.values(object)[valueIndex];
  return value;
}

export function getKeyFromObjectByValue(object: object, value: any) {
  const keyIndex = Object.values(object).indexOf(value);
  if (keyIndex === -1) {
    return null;
  }
  const key = Object.keys(object)[keyIndex];
  return key;
}

export async function getFetch(baseUrl: string, params = {}) {
  const completeUrl = getUrlWithAppendedQueries(baseUrl, params);
  const response = await fetch(completeUrl).then(
    (response) => {
      return response.json();
    }
  ).catch((error) => {
    console.log(`Error retrieving quote from ${completeUrl}: '${error}'`);
  });
  return response;
}

export function getUrlWithAppendedQueries(baseUrl: string, params = {}) {
  if (isObjectEmpty(params)) {
    return baseUrl;
  }
  const queryEntries = Object.entries(params);
  const queryStrings = queryEntries.map((param) => {
    return `${param[0]}=${param[1]}`;
  });
  const queryString = queryStrings.join("&");
  const urlWithAppendedQueries = `${baseUrl}?${queryString}`;
  return urlWithAppendedQueries;
}

export const sleepMs = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export function calculateNetWordsPerMinute(textLength: number, secondsElapsed: number) {
  const words = textLength / CHARACTERS_PER_WORD;
  const minutes = secondsElapsed / SECONDS_PER_MINUTE;
  return words / minutes;
}

export function calculateAccuracyPercentage(textLength: number, charactersTypedCount: number, mistakeCount: number) {
  const fractionalAccuracy = textLength / (charactersTypedCount + mistakeCount);
  return fractionalAccuracy * 100;
}

export function handleInternetExplorer() {
  if (!isBrowserInternetExplorer()) {
    return;
  }
  const internetExplorerOverlay_div = document.createElement("div");
  internetExplorerOverlay_div.classList.add("internet-explorer-overlay");
  internetExplorerOverlay_div.innerText =
    "This website uses features which are not supported by the Internet Explorer web browser. " +
    "Please use a different web browser such as Google Chrome, Mozilla Firefox, Microsoft Edge, or Opera to access this page.";
  document.documentElement.appendChild(internetExplorerOverlay_div);
}

export function isBrowserInternetExplorer() {
  const userAgent = navigator.userAgent;
  // MSIE used to detect old browsers and Trident used to detect newer ones
  return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
}

export function convertItemCollectionArrayToItemCollectionNameArray(itemCollectionArray: string[][]) {
  let itemCollectionNames: string[] = [];
  itemCollectionArray.forEach((itemCollection) => {
    const itemCollectionName = getKeyFromObjectByValue(phraseItemCollectionNameToArrayMap, itemCollection);
    if (itemCollectionName !== null && itemCollectionName !== undefined) {
      itemCollectionNames.push(itemCollectionName);
    }
  });
  return itemCollectionNames;
}

export function convertItemCollectionNameArrayToItemCollectionArray(itemCollectionNameArray: string[]) {
  let itemCollections: string[][] = [];
  itemCollectionNameArray.forEach((itemCollectionName) => {
    const itemCollection = getValueFromObjectByKey(phraseItemCollectionNameToArrayMap, itemCollectionName);
    itemCollections.push(itemCollection);
  });
  return itemCollections;
}

export function areArraysEqual(array1: any[], array2: any[]) {
  array1.sort();
  array2.sort();
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}