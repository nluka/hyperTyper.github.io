import GameText from "./GameText.js";
import { getRandomElementFromArray, probabilityToReturnTrue } from "../common/functions.js";
import StringEditor from "./StringEditor.js";
import { settings } from "./main.js";
var Phrase = /** @class */ (function () {
    function Phrase() {
    }
    Phrase.get = function () {
        return new GameText(this.getContent(), this.AUTHOR);
    };
    Phrase.getContent = function () {
        var itemArray = this.getItemArray();
        if (settings.getPunctuation()) {
            return this.getPunctuatedContentStringFromItemArray(itemArray);
        }
        return this.getPlainContentStringFromItemArray(itemArray);
    };
    Phrase.getItemArray = function () {
        var itemArray = [];
        for (var i = 0; i < settings.getPhraseItemCount(); i++) {
            var randomItemFromCollections = getRandomElementFromArray(getRandomElementFromArray(settings.getPhraseItemCollections()));
            itemArray.push(randomItemFromCollections);
        }
        return itemArray;
    };
    Phrase.getPlainContentStringFromItemArray = function (itemArray) {
        var contentString = itemArray.join(" ");
        return contentString;
    };
    Phrase.getPunctuatedContentStringFromItemArray = function (itemArray) {
        var _this = this;
        itemArray[0] = StringEditor.getWithFirstCharacterCapitalized(itemArray[0]);
        itemArray.forEach(function (item, i) {
            if (probabilityToReturnTrue(settings.getPhrasePunctuationFrequency())) {
                var punctuatedItem = _this.getPunctuatedItem(item);
                itemArray.splice(i, 1, punctuatedItem);
            }
        });
        var contentString = itemArray.join(" ");
        contentString = this.getContentStringWithProperCapitalization(contentString);
        contentString = this.getContentStringWithCorrectFinalPunctuation(contentString);
        return contentString;
    };
    Phrase.getPunctuatedItem = function (item) {
        if (probabilityToReturnTrue(1 / 4)) {
            return this.getItemWrappedWithQuotes(item);
        }
        return this.getItemWithPunctuationPostfix(item);
    };
    Phrase.getItemWrappedWithQuotes = function (item) {
        if (probabilityToReturnTrue(1 / 2)) {
            return "\"" + item + "\"";
        }
        return "'" + item + "'";
    };
    Phrase.getItemWithPunctuationPostfix = function (item) {
        var randomFloatBetweenZeroAndOne = Math.random();
        if (randomFloatBetweenZeroAndOne > 0.65) {
            item += ",";
        }
        else if (randomFloatBetweenZeroAndOne > 0.40) {
            item += ".";
        }
        else if (randomFloatBetweenZeroAndOne > 0.25) {
            item += "?";
        }
        else if (randomFloatBetweenZeroAndOne > 0.10) {
            item += "!";
        }
        else if (randomFloatBetweenZeroAndOne > 0.05) {
            item += ":";
        }
        else {
            item += ";";
        }
        //item = StringEditor.getWithFirstCharacterCapitalized(item);
        return item;
    };
    Phrase.getContentStringWithCorrectFinalPunctuation = function (string) {
        if (!!string.match(/[,;:]$/)) {
            return this.getStringWithReplacedFinalCharacter(string, ".");
        }
        if (!!string.match(/[^.!?]$/)) {
            return string + ".";
        }
        return string;
    };
    Phrase.getContentStringWithProperCapitalization = function (string) {
        var matches = string.match(/[.!?] [a-zA-Z]/g);
        if (matches === null) {
            return string;
        }
        matches.forEach(function (match) {
            var matchCapitalized = match.slice(0, 2) + match.charAt(2).toUpperCase();
            string = string.replace(match, matchCapitalized);
        });
        return string;
    };
    Phrase.getStringWithReplacedFinalCharacter = function (string, newFinalCharacter) {
        return string.slice(0, string.length - 1) + newFinalCharacter;
    };
    Phrase.AUTHOR = "Custom-Generated";
    Phrase.NO_ITEM_COLLECTIONS_SELECTED = "noItemCollectionsSelected";
    return Phrase;
}());
export default Phrase;
