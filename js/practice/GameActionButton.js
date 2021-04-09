import { gameAction_button } from "./page-elements.js";
import { throwExceededClassInstanceLimitException } from "../common/functions.js";
import GameDirector from "./GameDirector.js";
import GameStopCode from "./GameStopCode.js";
var GameActionButton = /** @class */ (function () {
    function GameActionButton() {
        this.element = gameAction_button;
        GameActionButton.instanceCount++;
        if (GameActionButton.instanceCount > GameActionButton.instanceCountLimit) {
            throwExceededClassInstanceLimitException("GameActionButton", GameActionButton.instanceCountLimit);
        }
    }
    GameActionButton.prototype.setInnerText = function (text) {
        this.element.innerText = text;
    };
    GameActionButton.prototype.enableStartState = function () {
        this.setInnerText("Start");
        this.element.addEventListener("click", startButtonClickEventHandler);
        this.element.removeAttribute("disabled");
    };
    GameActionButton.prototype.disableStartState = function () {
        this.element.blur();
        this.element.setAttribute("disabled", "" + true);
        this.element.removeEventListener("click", startButtonClickEventHandler);
        this.setInnerText("···");
    };
    GameActionButton.prototype.enableAbortState = function () {
        this.setInnerText("Abort");
        this.element.addEventListener("click", abortButtonClickEventHandler);
        this.element.removeAttribute("disabled");
    };
    GameActionButton.prototype.disableAbortState = function () {
        this.element.blur();
        this.element.setAttribute("disabled", "" + true);
        this.element.removeEventListener("click", abortButtonClickEventHandler);
        this.setInnerText("···");
    };
    GameActionButton.instanceCountLimit = 1;
    GameActionButton.instanceCount = 0;
    return GameActionButton;
}());
export default GameActionButton;
function startButtonClickEventHandler() {
    GameDirector.tryToRunGame();
}
function abortButtonClickEventHandler() {
    GameDirector.stopGame(GameStopCode.ABORTED);
}
