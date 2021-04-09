import QuotableApi from "./QuotableApi.js";
import LocalQuote from "./LocalQuote.js";
import GameText from "./GameText.js";
import { settings } from "./main.js";
import StringEditor from "./StringEditor.js";

export default class Quote {
  public static async get() {
    const responseFromQuotableApi = await QuotableApi.get();
    let content: string;
    let author: string;
    if (this.isQuoteableApiResponseValid(responseFromQuotableApi)) {
      content = responseFromQuotableApi.content;
      author = responseFromQuotableApi.author;
    } else {
      const localQuote = LocalQuote.get();
      content = localQuote.content;
      author = localQuote.author;
    }
    return new GameText(this.getQuoteContentWithSettingsApplied(content), author);
  }

  private static getQuoteContentWithSettingsApplied(quoteContent: string) {
    if (!settings.getPunctuation()) {
      return StringEditor.getWithNoPunctuation(quoteContent);
    }
    return quoteContent;
  }

  private static isQuoteableApiResponseValid(response: any) {
    if (
      //response === null ||
      //response === undefined ||
      response.content === null ||
      response.content === undefined ||
      response.content === "" ||
      response.content.length === 0
    ) {
      return false;
    }
    return true;
  }
}