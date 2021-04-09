var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { MILLISECONDS_PER_HOUR, MILLISECONDS_PER_MINUTE, MILLISECONDS_PER_SECOND } from "../common/constants.js";
import { sleepMs, throwExceededClassInstanceLimitException } from "../common/functions.js";
import { gameTimer_div } from "./page-elements.js";
import Sound from "./Sound.js";
var GameTimer = /** @class */ (function () {
    function GameTimer() {
        this.element = gameTimer_div;
        this.intervalId = null;
        this.startDate = null;
        this.stopDate = null;
        this.timeElapsedInSeconds = null;
        GameTimer.instanceCount++;
        if (GameTimer.instanceCount > GameTimer.instanceCountLimit) {
            throwExceededClassInstanceLimitException("GameTimer", GameTimer.instanceCountLimit);
        }
    }
    GameTimer.prototype.countDownFromMs = function (milliseconds) {
        return __awaiter(this, void 0, void 0, function () {
            var secondsRemaining;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secondsRemaining = milliseconds / MILLISECONDS_PER_SECOND;
                        _a.label = 1;
                    case 1:
                        if (!(secondsRemaining >= 0)) return [3 /*break*/, 5];
                        if (!(secondsRemaining > 0)) return [3 /*break*/, 3];
                        this.countdownTick(secondsRemaining);
                        return [4 /*yield*/, sleepMs(MILLISECONDS_PER_SECOND)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.finalCountdownTick();
                        _a.label = 4;
                    case 4:
                        secondsRemaining--;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GameTimer.prototype.countdownTick = function (secondsRemaining) {
        Sound.playEffect(Sound.COUNTDOWN_BEEP_SHORT);
        this.setInnerText("" + secondsRemaining);
        this.setInnerTextColorForCountdownTick(secondsRemaining);
        this.animateInnerTextSize();
    };
    GameTimer.prototype.setInnerText = function (text) {
        this.element.innerText = text;
    };
    GameTimer.prototype.setInnerTextColorForCountdownTick = function (secondsRemaining) {
        if (secondsRemaining >= 3) {
            this.element.style.color = "rgb(255,0,0)";
            return;
        }
        if (secondsRemaining === 2) {
            this.element.style.color = "rgb(255,125,0)";
            return;
        }
        this.element.style.color = "rgb(255,255,0)";
    };
    GameTimer.prototype.animateInnerTextSize = function () {
        var normalFontSizePx = parseInt(getComputedStyle(this.element).fontSize);
        this.element.animate([
            // keyframes
            {
                fontSize: normalFontSizePx * 1.5 + "px"
            },
            {
                fontSize: normalFontSizePx + "px"
            }
        ], {
            // timing options
            duration: MILLISECONDS_PER_SECOND / 8,
            iterations: 1,
            easing: "ease-in"
        });
    };
    GameTimer.prototype.finalCountdownTick = function () {
        Sound.playEffect(Sound.COUNTDOWN_BEEP_LONG);
        this.animateInnerTextColorForFinalCountdownTick();
    };
    GameTimer.prototype.animateInnerTextColorForFinalCountdownTick = function () {
        var _this = this;
        this.element.animate([
            // keyframes
            {
                color: "rgb(150,255,150)"
            },
            {
                color: "white"
            }
        ], {
            // timing options
            duration: MILLISECONDS_PER_SECOND,
            iterations: 1,
            easing: "ease-in"
        });
        setTimeout(function () {
            _this.removeInlineStyles();
        }, MILLISECONDS_PER_SECOND);
    };
    GameTimer.prototype.removeInlineStyles = function () {
        this.element.removeAttribute("style");
    };
    GameTimer.prototype.start = function () {
        var _this = this;
        this.setInnerText("0:00");
        this.startDate = new Date();
        this.intervalId = setInterval(function () {
            _this.updateInnerText();
        }, MILLISECONDS_PER_SECOND);
    };
    GameTimer.prototype.updateInnerText = function () {
        var hoursElapsedFloored = Math.floor(this.getHoursElapsedSinceStartDate());
        var minutesElapsedFloored = Math.floor(this.getMinutesElapsedSinceStartDate());
        var secondsElapsedFloored = Math.floor(this.getSecondsElapsedSinceStartDate());
        this.setInnerText(this.getFormattedTimeString(hoursElapsedFloored, minutesElapsedFloored, secondsElapsedFloored));
    };
    GameTimer.prototype.getHoursElapsedSinceStartDate = function () {
        if (this.startDate !== null && this.startDate !== undefined) {
            return (new Date().getTime() - this.startDate.getTime()) / MILLISECONDS_PER_HOUR;
        }
        throw "this.startDate is null or undefined";
    };
    GameTimer.prototype.getMinutesElapsedSinceStartDate = function () {
        if (this.startDate !== null && this.startDate !== undefined) {
            return (new Date().getTime() - this.startDate.getTime()) / MILLISECONDS_PER_MINUTE;
        }
        throw "this.startDate is null or undefined";
    };
    GameTimer.prototype.getSecondsElapsedSinceStartDate = function () {
        if (this.startDate !== null && this.startDate !== undefined) {
            return (new Date().getTime() - this.startDate.getTime()) / MILLISECONDS_PER_SECOND;
        }
        throw "this.startDate is null or undefined";
    };
    GameTimer.prototype.getFormattedTimeString = function (hours, minutes, seconds) {
        var string = "";
        if (hours > 0) {
            string = hours + ":";
            if (minutes < 10) {
                string += "0"; // to have h:mm:ss instead of h:m:ss
            }
        }
        string += minutes + ":";
        if (seconds < 10.0) {
            string += "0"; // to have mm:ss instead of mm:s
        }
        string += seconds;
        return string;
    };
    GameTimer.prototype.stop = function () {
        if (this.intervalId === null || this.startDate === null) {
            return;
        }
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.stopDate = new Date();
        this.timeElapsedInSeconds = (this.stopDate.getTime() - this.startDate.getTime()) / MILLISECONDS_PER_SECOND;
    };
    GameTimer.prototype.getStartDate = function () {
        return this.startDate;
    };
    GameTimer.prototype.getTimeElapsedInSeconds = function () {
        return this.timeElapsedInSeconds;
    };
    GameTimer.prototype.clear = function () {
        this.setInnerText(GameTimer.INACTIVE_STATE_TEXT);
    };
    GameTimer.INACTIVE_STATE_TEXT = "--:--";
    GameTimer.instanceCountLimit = 1;
    GameTimer.instanceCount = 0;
    return GameTimer;
}());
export default GameTimer;
