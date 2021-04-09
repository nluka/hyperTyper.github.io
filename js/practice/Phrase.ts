import GameText from "./GameText.js";
import { getRandomElementFromArray, probabilityToReturnTrue } from "../common/functions.js";
import StringEditor from "./StringEditor.js";
import { settings } from "./main.js";

export default class Phrase {
  private static readonly AUTHOR = "Custom-Generated";
  public static readonly NO_ITEM_COLLECTIONS_SELECTED = "noItemCollectionsSelected";

  public static get() {
    return new GameText(this.getContent(), this.AUTHOR);
  }

  private static getContent() {
    const itemArray = this.getItemArray();
    if (settings.getPunctuation()) {
      return this.getPunctuatedContentStringFromItemArray(itemArray);
    }
    return this.getPlainContentStringFromItemArray(itemArray);
  }

  private static getItemArray() {
    let itemArray = [];
    for (let i = 0; i < settings.getPhraseItemCount(); i++) {
      const randomItemFromCollections = getRandomElementFromArray(
        getRandomElementFromArray(settings.getPhraseItemCollections())
      );
      itemArray.push(randomItemFromCollections);
    }
    return itemArray;
  }

  private static getPlainContentStringFromItemArray(itemArray: string[]) {
    const contentString = itemArray.join(" ");
    return contentString;
  }

  private static getPunctuatedContentStringFromItemArray(itemArray: string[]) {
    itemArray[0] = StringEditor.getWithFirstCharacterCapitalized(itemArray[0] as string);
    itemArray.forEach((item, i) => {
      if (probabilityToReturnTrue(settings.getPhrasePunctuationFrequency())) {
        const punctuatedItem = this.getPunctuatedItem(item);
        itemArray.splice(i, 1, punctuatedItem);
      }
    });
    let contentString = itemArray.join(" ");
    contentString = this.getContentStringWithProperCapitalization(contentString);
    contentString = this.getContentStringWithCorrectFinalPunctuation(contentString);
    return contentString;
  }

  private static getPunctuatedItem(item: string) {
    if (probabilityToReturnTrue(1/4)) {
      return this.getItemWrappedWithQuotes(item);
    }
    return this.getItemWithPunctuationPostfix(item);
  }

  private static getItemWrappedWithQuotes(item: string) {
    if (probabilityToReturnTrue(1/2)) {
      return `"${item}"`;
    }
    return `'${item}'`;
  }

  private static getItemWithPunctuationPostfix(item: string) {
    const randomFloatBetweenZeroAndOne = Math.random();
    if (randomFloatBetweenZeroAndOne > 0.65) {
      item += ",";
    } else if (randomFloatBetweenZeroAndOne > 0.40) {
      item += ".";
    } else if (randomFloatBetweenZeroAndOne > 0.25) {
      item += "?";
    } else if (randomFloatBetweenZeroAndOne > 0.10) {
      item += "!";
    } else if (randomFloatBetweenZeroAndOne > 0.05)  {
      item += ":";
    } else {
      item += ";";
    }
    //item = StringEditor.getWithFirstCharacterCapitalized(item);
    return item;
  }

  private static getContentStringWithCorrectFinalPunctuation(string: string) {
    if (!!string.match(/[,;:]$/)) {
      return this.getStringWithReplacedFinalCharacter(string, ".");
    }
    if (!!string.match(/[^.!?]$/)) {
      return string + ".";
    }
    return string;
  }

  private static getContentStringWithProperCapitalization(string: string) {
    const matches = string.match(/[.!?] [a-zA-Z]/g);
    if (matches === null) {
      return string;
    }
    matches.forEach((match) => {
      const matchCapitalized = match.slice(0, 2) + match.charAt(2).toUpperCase();
      string = string.replace(match, matchCapitalized);
    });
    return string;
  }

  private static getStringWithReplacedFinalCharacter(string: string, newFinalCharacter: string) {
    return string.slice(0, string.length - 1) + newFinalCharacter;
  }
}