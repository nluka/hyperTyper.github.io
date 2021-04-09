var GameResult = /** @class */ (function () {
    function GameResult(netWordsPerMinute, accuracyPercentage, mistakeCount, secondsElapsed, textLength) {
        this.netWordsPerMinute = netWordsPerMinute;
        this.accuracyPercentage = accuracyPercentage;
        this.mistakeCount = mistakeCount;
        this.secondsElapsed = secondsElapsed;
        this.textLength = textLength;
    }
    return GameResult;
}());
export default GameResult;
