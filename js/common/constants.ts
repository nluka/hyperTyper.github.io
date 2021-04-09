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

// Game arithmetic
export const CHARACTERS_PER_WORD = 5;

// Unit conversions
export const MILLISECONDS_PER_HOUR = 3_600_000;
export const MILLISECONDS_PER_MINUTE = 60_000;
export const MILLISECONDS_PER_SECOND = 1000;

export const SECONDS_PER_HOUR = 3600;
export const SECONDS_PER_MINUTE = 60;

export const MINUTES_PER_HOUR = 60;

// Other
export const phraseItemCollectionNameToArrayMap = {
  "englishWordsCommonCollection": englishWordsCommonCollection,
  "englishWordsRandomCollection": englishWordsRandomCollection,
  "numbersCollection": numbersCollection,
  "symbolsCollection": symbolsCollection,
  "programmingCommonKeywordsCollection": programmingCommonKeywordsCollection,
  "programmingCommonOperatorsCollection": programmingCommonOperatorsCollection,
  "cKeywordsCollection": cKeywordsCollection,
  "cOperatorsCollection": cOperatorsCollection,
  "cppKeywordsCollection": cppKeywordsCollection,
  "cppOperatorsCollection": cppOperatorsCollection,
  "csharpKeywordsCollection": csharpKeywordsCollection,
  "csharpOperatorsCollection": csharpOperatorsCollection,
  "css3PropertiesCollection": css3PropertiesCollection,
  "html5TagsCollection": html5TagsCollection,
  "javaKeywordsCollection": javaKeywordsCollection,
  "javaOperatorsCollection": javaOperatorsCollection,
  "javascriptKeywordsCollection": javascriptKeywordsCollection,
  "javascriptOperatorsCollection": javascriptOperatorsCollection,
  "pythonKeywordsCollection": pythonKeywordsCollection,
  "pythonOperatorsCollection": pythonOperatorsCollection
};