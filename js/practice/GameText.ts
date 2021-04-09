export default class GameText {
  public readonly content: string;
  public readonly author: string;

  constructor(content: string, author: string) {
    this.content = content;
    this.author = author;
  }
}