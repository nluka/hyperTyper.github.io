var StringEditor = /** @class */ (function () {
    function StringEditor() {
    }
    //public static readonly PUNCTUATION_CHARACTERS = [".", "?", "!", ",", ":", ";"];
    StringEditor.getWithNoPunctuation = function (string) {
        string = this.getPurelyAlphaNumericLowerCaseEquivalent(string);
        string = this.getWithTrailingWhitespaceRemoved(string);
        return string;
    };
    StringEditor.getPurelyAlphaNumericLowerCaseEquivalent = function (string) {
        string = string.replace(/[^a-zA-Z0-9\s]/g, "");
        string = string.replace(/\s{2,}/g, " ");
        string = string.toLowerCase();
        return string;
    };
    StringEditor.getWithTrailingWhitespaceRemoved = function (string) {
        if (!!string.match(/ $/g)) {
            return string.replace(/ $/g, "");
        }
        return string;
    };
    StringEditor.getWithFirstCharacterCapitalized = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return StringEditor;
}());
export default StringEditor;
