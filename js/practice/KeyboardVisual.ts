import {
  keyboardVisual_div,
  backquoteKey_div,
  digit1Key_div,
  digit2Key_div,
  digit3Key_div,
  digit4Key_div,
  digit5Key_div,
  digit6Key_div,
  digit7Key_div,
  digit8Key_div,
  digit9Key_div,
  digit0Key_div,
  minusKey_div,
  equalKey_div,
  backspaceKey_div,
  //tabKey_div,
  qKey_div,
  wKey_div,
  eKey_div,
  rKey_div,
  tKey_div,
  yKey_div,
  uKey_div,
  iKey_div,
  oKey_div,
  pKey_div,
  bracketLeftKey_div,
  bracketRightKey_div,
  backslashKey_div,
  capsLockKey_div,
  aKey_div,
  sKey_div,
  dKey_div,
  fKey_div,
  gKey_div,
  hKey_div,
  jKey_div,
  kKey_div,
  lKey_div,
  semicolonKey_div,
  quoteKey_div,
  enterKey_div,
  shiftLeftKey_div,
  zKey_div,
  xKey_div,
  cKey_div,
  vKey_div,
  bKey_div,
  nKey_div,
  mKey_div,
  commaKey_div,
  periodKey_div,
  slashKey_div,
  shiftRightKey_div,
  controlLeftKey_div,
  altLeftKey_div,
  spaceKey_div,
  altRightKey_div,
  controlRightKey_div,
} from "./page-elements.js";

import { gameInput, settings } from "./main.js";
import { getValueFromObjectByKey, parseBool, throwExceededClassInstanceLimitException } from "../common/functions.js";

export default class KeyboardVisual {
  private static readonly eventCodeToKeyElementMap = {
    "Backquote": backquoteKey_div,
    "Digit1": digit1Key_div,
    "Digit2": digit2Key_div,
    "Digit3": digit3Key_div,
    "Digit4": digit4Key_div,
    "Digit5": digit5Key_div,
    "Digit6": digit6Key_div,
    "Digit7": digit7Key_div,
    "Digit8": digit8Key_div,
    "Digit9": digit9Key_div,
    "Digit0": digit0Key_div,
    "Minus": minusKey_div,
    "Equal": equalKey_div,
    "Backspace": backspaceKey_div,
    //Tab: tabKey_div,
    "KeyQ": qKey_div,
    "KeyW": wKey_div,
    "KeyE": eKey_div,
    "KeyR": rKey_div,
    "KeyT": tKey_div,
    "KeyY": yKey_div,
    "KeyU": uKey_div,
    "KeyI": iKey_div,
    "KeyO": oKey_div,
    "KeyP": pKey_div,
    "BracketLeft": bracketLeftKey_div,
    "BracketRight": bracketRightKey_div,
    "Backslash": backslashKey_div,
    "CapsLock": capsLockKey_div,
    "KeyA": aKey_div,
    "KeyS": sKey_div,
    "KeyD": dKey_div,
    "KeyF": fKey_div,
    "KeyG": gKey_div,
    "KeyH": hKey_div,
    "KeyJ": jKey_div,
    "KeyK": kKey_div,
    "KeyL": lKey_div,
    "Semicolon": semicolonKey_div,
    "Quote": quoteKey_div,
    "Enter": enterKey_div,
    "ShiftLeft": shiftLeftKey_div,
    "KeyZ": zKey_div,
    "KeyX": xKey_div,
    "KeyC": cKey_div,
    "KeyV": vKey_div,
    "KeyB": bKey_div,
    "KeyN": nKey_div,
    "KeyM": mKey_div,
    "Comma": commaKey_div,
    "Period": periodKey_div,
    "Slash": slashKey_div,
    "ShiftRight": shiftRightKey_div,
    "ControlLeft": controlLeftKey_div,
    "AltLeft": altLeftKey_div,
    "Space": spaceKey_div,
    "AltRight": altRightKey_div,
    "ControlRight": controlRightKey_div,
  };

  private readonly containerElement = keyboardVisual_div;
  private keysPressed: HTMLElement[] = [];

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    KeyboardVisual.instanceCount++;
    if (KeyboardVisual.instanceCount > KeyboardVisual.instanceCountLimit) {
      throwExceededClassInstanceLimitException("KeyboardVisual", KeyboardVisual.instanceCountLimit);
    }
  }

  public initializeElementVisibilityState() {
    if (settings.getKeyboardVisual()) {
      this.show();
    }
  }

  public show() {
    this.containerElement.setAttribute("data-visible", `${true}`);
    settings.setKeyboardVisual(true);
  }

  public addAllEventListeners() {
    this.addKeyEventListeners();
    this.addGameInputFocusAndBlurEventListeners();
  }

  private addKeyEventListeners() {
    gameInput.getElement().addEventListener("keydown", () => {
      this.keydownEventHandler(event as KeyboardEvent);
    });
    gameInput.getElement().addEventListener("keyup", () => {
      this.keyupEventHandler(event as KeyboardEvent);
    });
  }

  private addGameInputFocusAndBlurEventListeners() {
    document.addEventListener("click", () => {
      this.gameInputElementFocusEventHandler(event as KeyboardEvent);
      this.gameInputElementBlurEventHandler();
    });
    document.addEventListener("keydown", () => {
      this.gameInputElementFocusEventHandler(event as KeyboardEvent);
      this.gameInputElementBlurEventHandler();
    });
  }

  private keydownEventHandler(event: KeyboardEvent) {
    if (!(event.code in KeyboardVisual.eventCodeToKeyElementMap)) {
      return;
    }
    const pressedKey = getValueFromObjectByKey(KeyboardVisual.eventCodeToKeyElementMap, event.code);
    if (pressedKey !== null && pressedKey !== undefined) {
      this.styleKeyAsPressed(pressedKey);
    }
    if (this.isCapsLockEnabled(event as KeyboardEvent)) {
      this.styleCapsLockAsActive();
      return;
    }
    this.removeActiveStyleFromCapsLock();
  }

  private styleKeyAsPressed(keyElement: HTMLElement) {
    keyElement.classList.add("pressed");
    this.keysPressed.push(keyElement);
  }

  private isCapsLockEnabled(event: KeyboardEvent) {
    return event.getModifierState("CapsLock");
  }

  private styleCapsLockAsActive() {
    KeyboardVisual.eventCodeToKeyElementMap["CapsLock"].classList.add("active");
  }

  private removeActiveStyleFromCapsLock() {
    KeyboardVisual.eventCodeToKeyElementMap["CapsLock"].classList.remove("active");
  }

  private keyupEventHandler(event: KeyboardEvent) {
    if (event === undefined) {
      return;
    }
    if (!this.isVisible() || !KeyboardVisual.doesEventCodeCorrespondToAValidKey(event.code)) {
      return;
    }
    const keyElement = getValueFromObjectByKey(KeyboardVisual.eventCodeToKeyElementMap, event.code);
    this.removePressedStyleFromKey(keyElement);
  }

  public isVisible() {
    return parseBool(this.containerElement.getAttribute("data-visible"));
  }

  private gameInputElementBlurEventHandler() {
    if (document.activeElement === gameInput.getElement()) {
      return;
    }
    this.keysPressed.forEach((key) => {
      this.removePressedStyleFromKey(key);
    });
    this.removeActiveStyleFromCapsLock();
  }

  private gameInputElementFocusEventHandler(event: KeyboardEvent) {
    if (document.activeElement !== gameInput.getElement()) {
      return;
    }
    if (event !== undefined && this.isCapsLockEnabled(event)) {
      this.styleCapsLockAsActive();
    }
  }

  private static doesEventCodeCorrespondToAValidKey(eventCode: string) {
    return (eventCode in this.eventCodeToKeyElementMap);
  }

  private removePressedStyleFromKey(keyElement: HTMLElement) {
    keyElement.classList.remove("pressed");
    const keyElementIndex = this.keysPressed.indexOf(keyElement);
    this.keysPressed.splice(keyElementIndex, 1);
  }

  public hide() {
    this.containerElement.setAttribute("data-visible", `${false}`);
    settings.setKeyboardVisual(false);
  }
}