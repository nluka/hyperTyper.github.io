import { settings } from "./main.js";
var countdownBeepShort_mp3 = new Audio("sound/countdown-beep-short.mp3");
var countdownBeepLong_mp3 = new Audio("sound/countdown-beep-long.mp3");
var soundFiles = [
    countdownBeepShort_mp3,
    countdownBeepLong_mp3
];
var Sound = /** @class */ (function () {
    function Sound() {
    }
    Sound.playEffect = function (soundEffectName) {
        if (!settings.getSoundEffects()) {
            return;
        }
        switch (soundEffectName) {
            case this.COUNTDOWN_BEEP_SHORT: {
                countdownBeepShort_mp3.play();
                return;
            }
            case this.COUNTDOWN_BEEP_LONG: {
                countdownBeepLong_mp3.play();
                return;
            }
            default: {
                throw "soundEffect '" + soundEffectName + "' doesn't exist";
            }
        }
    };
    Sound.setVolume = function (float) {
        if (float > 1.0) {
            float = 1.0;
        }
        else if (float < 0.01) {
            float = 0.01;
        }
        soundFiles.forEach(function (soundFile) {
            soundFile.volume = float;
        });
    };
    Sound.COUNTDOWN_BEEP_SHORT = "countdownBeepShort";
    Sound.COUNTDOWN_BEEP_LONG = "countdownBeepLong";
    return Sound;
}());
export default Sound;
