var CharacterAnalysis = /** @class */ (function () {
    function CharacterAnalysis() {
        this.mistakeCount = 0;
        this.incorrectInputs = [];
    }
    CharacterAnalysis.prototype.getMistakeCount = function () {
        return this.mistakeCount;
    };
    CharacterAnalysis.prototype.incrementMistakeCount = function () {
        this.mistakeCount++;
    };
    CharacterAnalysis.prototype.getIncorrectInputs = function () {
        return this.incorrectInputs;
    };
    CharacterAnalysis.prototype.addIncorrectInput = function (character) {
        this.incorrectInputs.push(character);
    };
    return CharacterAnalysis;
}());
export default CharacterAnalysis;
