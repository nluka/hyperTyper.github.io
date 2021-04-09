import { keyboardVisual_div, backquoteKey_div, digit1Key_div, digit2Key_div, digit3Key_div, digit4Key_div, digit5Key_div, digit6Key_div, digit7Key_div, digit8Key_div, digit9Key_div, digit0Key_div, minusKey_div, equalKey_div, backspaceKey_div, 
//tabKey_div,
qKey_div, wKey_div, eKey_div, rKey_div, tKey_div, yKey_div, uKey_div, iKey_div, oKey_div, pKey_div, bracketLeftKey_div, bracketRightKey_div, backslashKey_div, capsLockKey_div, aKey_div, sKey_div, dKey_div, fKey_div, gKey_div, hKey_div, jKey_div, kKey_div, lKey_div, semicolonKey_div, quoteKey_div, enterKey_div, shiftLeftKey_div, zKey_div, xKey_div, cKey_div, vKey_div, bKey_div, nKey_div, mKey_div, commaKey_div, periodKey_div, slashKey_div, shiftRightKey_div, controlLeftKey_div, altLeftKey_div, spaceKey_div, altRightKey_div, controlRightKey_div, } from "./page-elements.js";
import { gameInput, settings } from "./main.js";
import { getValueFromObjectByKey, parseBool, throwExceededClassInstanceLimitException } from "../common/functions.js";
var KeyboardVisual = /** @class */ (function () {
    function KeyboardVisual() {
        this.containerElement = keyboardVisual_div;
        this.keysPressed = [];
        KeyboardVisual.instanceCount++;
        if (KeyboardVisual.instanceCount > KeyboardVisual.instanceCountLimit) {
            throwExceededClassInstanceLimitException("KeyboardVisual", KeyboardVisual.instanceCountLimit);
        }
    }
    KeyboardVisual.prototype.initializeElementVisibilityState = function () {
        if (settings.getKeyboardVisual()) {
            this.show();
        }
    };
    KeyboardVisual.prototype.show = function () {
        this.containerElement.setAttribute("data-visible", "" + true);
        settings.setKeyboardVisual(true);
    };
    KeyboardVisual.prototype.addAllEventListeners = function () {
        this.addKeyEventListeners();
        this.addGameInputFocusAndBlurEventListeners();
    };
    KeyboardVisual.prototype.addKeyEventListeners = function () {
        var _this = this;
        gameInput.getElement().addEventListener("keydown", function () {
            _this.keydownEventHandler(event);
        });
        gameInput.getElement().addEventListener("keyup", function () {
            _this.keyupEventHandler(event);
        });
    };
    KeyboardVisual.prototype.addGameInputFocusAndBlurEventListeners = function () {
        var _this = this;
        document.addEventListener("click", function () {
            _this.gameInputElementFocusEventHandler(event);
            _this.gameInputElementBlurEventHandler();
        });
        document.addEventListener("keydown", function () {
            _this.gameInputElementFocusEventHandler(event);
            _this.gameInputElementBlurEventHandler();
        });
    };
    KeyboardVisual.prototype.keydownEventHandler = function (event) {
        if (!(event.code in KeyboardVisual.eventCodeToKeyElementMap)) {
            return;
        }
        var pressedKey = getValueFromObjectByKey(KeyboardVisual.eventCodeToKeyElementMap, event.code);
        if (pressedKey !== null && pressedKey !== undefined) {
            this.styleKeyAsPressed(pressedKey);
        }
        if (this.isCapsLockEnabled(event)) {
            this.styleCapsLockAsActive();
            return;
        }
        this.removeActiveStyleFromCapsLock();
    };
    KeyboardVisual.prototype.styleKeyAsPressed = function (keyElement) {
        keyElement.classList.add("pressed");
        this.keysPressed.push(keyElement);
    };
    KeyboardVisual.prototype.isCapsLockEnabled = function (event) {
        return event.getModifierState("CapsLock");
    };
    KeyboardVisual.prototype.styleCapsLockAsActive = function () {
        KeyboardVisual.eventCodeToKeyElementMap["CapsLock"].classList.add("active");
    };
    KeyboardVisual.prototype.removeActiveStyleFromCapsLock = function () {
        KeyboardVisual.eventCodeToKeyElementMap["CapsLock"].classList.remove("active");
    };
    KeyboardVisual.prototype.keyupEventHandler = function (event) {
        if (event === undefined) {
            return;
        }
        if (!this.isVisible() || !KeyboardVisual.doesEventCodeCorrespondToAValidKey(event.code)) {
            return;
        }
        var keyElement = getValueFromObjectByKey(KeyboardVisual.eventCodeToKeyElementMap, event.code);
        this.removePressedStyleFromKey(keyElement);
    };
    KeyboardVisual.prototype.isVisible = function () {
        return parseBool(this.containerElement.getAttribute("data-visible"));
    };
    KeyboardVisual.prototype.gameInputElementBlurEventHandler = function () {
        var _this = this;
        if (document.activeElement === gameInput.getElement()) {
            return;
        }
        this.keysPressed.forEach(function (key) {
            _this.removePressedStyleFromKey(key);
        });
        this.removeActiveStyleFromCapsLock();
    };
    KeyboardVisual.prototype.gameInputElementFocusEventHandler = function (event) {
        if (document.activeElement !== gameInput.getElement()) {
            return;
        }
        if (event !== undefined && this.isCapsLockEnabled(event)) {
            this.styleCapsLockAsActive();
        }
    };
    KeyboardVisual.doesEventCodeCorrespondToAValidKey = function (eventCode) {
        return (eventCode in this.eventCodeToKeyElementMap);
    };
    KeyboardVisual.prototype.removePressedStyleFromKey = function (keyElement) {
        keyElement.classList.remove("pressed");
        var keyElementIndex = this.keysPressed.indexOf(keyElement);
        this.keysPressed.splice(keyElementIndex, 1);
    };
    KeyboardVisual.prototype.hide = function () {
        this.containerElement.setAttribute("data-visible", "" + false);
        settings.setKeyboardVisual(false);
    };
    KeyboardVisual.eventCodeToKeyElementMap = {
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
    KeyboardVisual.instanceCountLimit = 1;
    KeyboardVisual.instanceCount = 0;
    return KeyboardVisual;
}());
export default KeyboardVisual;
