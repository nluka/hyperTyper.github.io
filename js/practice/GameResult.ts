export default class GameResult {
  public readonly netWordsPerMinute: number;
  public readonly accuracyPercentage: number;
  public readonly mistakeCount: number;
  public readonly secondsElapsed: number;
  public readonly textLength: number;

  constructor(
    netWordsPerMinute: number,
    accuracyPercentage: number,
    mistakeCount: number,
    secondsElapsed: number,
    textLength: number
  ) {
    this.netWordsPerMinute = netWordsPerMinute;
    this.accuracyPercentage = accuracyPercentage;
    this.mistakeCount = mistakeCount;
    this.secondsElapsed = secondsElapsed;
    this.textLength = textLength;
  }
}