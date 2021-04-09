import { getFetch } from "../common/functions.js";
import GameText from "./GameText.js";

export default class QuotableApi {
  private static readonly BASE_URL = "https://api.quotable.io/random";

  public static async get() {
    const response = await getFetch(this.BASE_URL);
    return new GameText(response.content, response.author);
  }
}