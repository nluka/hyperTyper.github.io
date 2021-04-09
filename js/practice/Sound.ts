import { settings } from "./main.js";

const countdownBeepShort_mp3 = new Audio("sound/countdown-beep-short.mp3");
const countdownBeepLong_mp3 = new Audio("sound/countdown-beep-long.mp3");

const soundFiles = [
  countdownBeepShort_mp3,
  countdownBeepLong_mp3
];

export default class Sound {
  public static readonly COUNTDOWN_BEEP_SHORT = "countdownBeepShort";
  public static readonly COUNTDOWN_BEEP_LONG = "countdownBeepLong";

  public static playEffect(soundEffectName: string) {
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
        throw `soundEffect '${soundEffectName}' doesn't exist`;
      }
    }
  }

  public static setVolume(float: number) {
    if (float > 1.0) {
      float = 1.0;
    } else if (float < 0.01) {
      float = 0.01;
    }
    soundFiles.forEach((soundFile) => {
      soundFile.volume = float;
    });
  }
}