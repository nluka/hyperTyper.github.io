import ElementVisibilityStateStorage from './ElementVisibilityStateStorage.js';
import { parseBool } from './functions.js';

const VISIBILITY_ATTRIBUTE_NAME= 'data-visible';

export default class ElementVisibility {
  public static applyStoredSettings(
      collapsibleElement: HTMLElement,
      collapsibleElementId: string,
      toggleVisibilityButtonElement: HTMLElement,
      defaultVisibilityBool: boolean
  ) {
    const storedBool = ElementVisibilityStateStorage.getBoolIfExists(collapsibleElementId);
    if (storedBool === null) {
      this.applyDefaultSettings(collapsibleElement, toggleVisibilityButtonElement, defaultVisibilityBool);
      return;
    }
    this.set(collapsibleElement, storedBool);
    this.setToggleVisibilityButtonInnerTextBasedOnVisibilityBool(toggleVisibilityButtonElement, storedBool);
  }

  private static applyDefaultSettings(
    collapsibleElement: HTMLElement,
    toggleVisibilityButtonElement: HTMLElement,
    defaultVisibilityBool: boolean
  ) {
    this.set(collapsibleElement, defaultVisibilityBool);
    this.setToggleVisibilityButtonInnerTextBasedOnVisibilityBool(toggleVisibilityButtonElement, defaultVisibilityBool);
  }

  private static setToggleVisibilityButtonInnerTextBasedOnVisibilityBool(toggleVisibilityButtonElement: HTMLElement, isVisible: boolean) {
    if (isVisible) {
      toggleVisibilityButtonElement.innerText = 'Hide';
      return;
    }
    toggleVisibilityButtonElement.innerText = 'Show';
  }

  public static set(element: HTMLElement, bool: boolean) {
    element.setAttribute(VISIBILITY_ATTRIBUTE_NAME, bool.toString());
  }

  public static addToggleButtonClickEventListener(
    collapsibleElement: HTMLElement,
    collapsibleElementId: string,
    toggleVisibilityButtonElement: HTMLElement
  ) {
    toggleVisibilityButtonElement.addEventListener('click', () => {
      ElementVisibilityToggleButtonClickEventListener(
        collapsibleElement,
        collapsibleElementId,
        toggleVisibilityButtonElement
      );
    });
  }

  public static toggle(
    collapsibleElement: HTMLElement,
    collapsibleElementId: string,
    toggleVisibilityButtonElement: HTMLElement
  ) {
    const previousBool = this.getIsVisibleAttributeBool(collapsibleElement);
    const newBool = !previousBool;
    this.setIsVisibleAttribute(collapsibleElement, newBool);
    this.setToggleVisibilityButtonInnerTextBasedOnVisibilityBool(toggleVisibilityButtonElement, newBool);
    ElementVisibilityStateStorage.setBool(collapsibleElementId, newBool);
  }

  private static getIsVisibleAttributeBool(element: HTMLElement) {
    return parseBool(element.getAttribute('data-visible'));
  }

  private static setIsVisibleAttribute(element: HTMLElement, bool: boolean) {
    element.setAttribute(VISIBILITY_ATTRIBUTE_NAME, bool.toString());
  }
}

function ElementVisibilityToggleButtonClickEventListener(
  collapsibleElement: HTMLElement,
  collapsibleElementId: string,
  toggleVisibilityButtonElement: HTMLElement
) {
  ElementVisibility.toggle(collapsibleElement, collapsibleElementId, toggleVisibilityButtonElement);
}