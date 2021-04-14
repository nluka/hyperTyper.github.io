export default class StringEditor {
  public static getWithNoPunctuation(string: string) {
    string = this.getPurelyAlphaNumericLowerCaseEquivalent(string);
    string = this.getWithTrailingWhitespaceRemoved(string);
    return string;
  }

  public static getPurelyAlphaNumericLowerCaseEquivalent(string: string) {
    string = string.replace(/[^a-zA-Z0-9\s]/g, "");
    string = string.replace(/\s{2,}/g, " ");
    string = string.toLowerCase();
    return string;
  }

  public static getWithTrailingWhitespaceRemoved(string: string) {
    if (!!string.match(/ $/g)) {
      return string.replace(/ $/g, "");
    }
    return string;
  }

  public static getWithFirstCharacterCapitalized(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}