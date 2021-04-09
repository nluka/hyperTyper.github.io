import { parseBool } from './functions.js';

export default class ElementVisibilityStateStorage {
  public static getBoolIfExists(elementId: string) {
    const stringifiedBool = this.getIsVisibleString(elementId);
    if (stringifiedBool === null) {
      return null;
    }
    return parseBool(stringifiedBool);
  }

  private static getIsVisibleString(elementId: string) {
    return localStorage.getItem(`${elementId}IsVisible`);
  }

  public static setBool(elementId: string, isVisible: boolean) {
    this.setIsVisibleString(elementId, isVisible);
  }

  private static setIsVisibleString(elementId: string, isVisible: boolean) {
    localStorage.setItem(`${elementId}IsVisible`, `${isVisible}`);
  }

  public static toggleBool(elementId: string) {
    const previousStringifiedBool = this.getIsVisibleString(elementId);
    if (previousStringifiedBool === null) {
      throw `Cannot toggle localstorage '${elementId}IsVisible' value because no value exists`;
    }
    const invertedBool = !(parseBool(previousStringifiedBool));
    this.setIsVisibleString(elementId, invertedBool);
  }
}