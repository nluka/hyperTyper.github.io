export default class CharacterAnalysis {
  private mistakeCount = 0;
  private incorrectInputs: string[] = [];

  public getMistakeCount() {
    return this.mistakeCount;
  }

  public incrementMistakeCount() {
    this.mistakeCount++;
  }

  public getIncorrectInputs() {
    return this.incorrectInputs;
  }

  public addIncorrectInput(character: string) {
    this.incorrectInputs.push(character);
  }
}