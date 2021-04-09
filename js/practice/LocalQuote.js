import { localQuotes } from "../expression-resources/local-quotes/local-quotes.js";
import GameText from "./GameText.js";
var LocalQuote = /** @class */ (function () {
    function LocalQuote() {
    }
    LocalQuote.get = function () {
        var quoteContent, quoteAuthor;
        var randomIndex = Math.floor(Math.random() * localQuotes.length);
        var randomQuote = localQuotes[randomIndex];
        if (randomQuote !== undefined) {
            quoteContent = randomQuote["content"];
            quoteAuthor = this.getFormattedAuthor(randomQuote["author"]);
            return new GameText(quoteContent, quoteAuthor);
        }
        throw "couldn't get a valid localQuote, randomQuote is undefined";
    };
    LocalQuote.getFormattedAuthor = function (author) {
        if (author === null) {
            return "Unknown";
        }
        return author;
    };
    return LocalQuote;
}());
export default LocalQuote;
