import { localQuotes } from "../expression-resources/local-quotes/local-quotes.js";
import GameText from "./GameText.js";

export default class LocalQuote {
  public static get() {
    let quoteContent: string, quoteAuthor: string;
    const randomIndex = Math.floor(Math.random() * localQuotes.length);
    const randomQuote = localQuotes[randomIndex];
    if (randomQuote !== undefined) {
      quoteContent = randomQuote["content"];
      quoteAuthor = this.getFormattedAuthor(randomQuote["author"]);
      return new GameText(quoteContent, quoteAuthor);
    }
    throw "couldn't get a valid localQuote, randomQuote is undefined";
  }

  private static getFormattedAuthor(author: string | null) {
    if (author === null) {
      return "Unknown";
    }
    return author;
  }
}