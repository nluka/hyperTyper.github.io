import { throwExceededClassInstanceLimitException } from "./functions.js";
import { loader_img, loaderOverlay_div } from "./page-elements.js";

const OVERLAY_FADE_OUT_DURATION_MS = 750;

export default class PageLoader {
  private gifElement = loader_img;
  private overlayElement = loaderOverlay_div;

  private static readonly instanceCountLimit = 1;
  private static instanceCount = 0;

  constructor() {
    PageLoader.instanceCount++;
    if (PageLoader.instanceCount > PageLoader.instanceCountLimit) {
      throwExceededClassInstanceLimitException("PageLoader", PageLoader.instanceCountLimit);
    }
  }

  public removeOverlay() {
    this.fadeOutOverlayElement();
    setTimeout(() => {
        this.removeHtmlElementsFromDom();
      }, OVERLAY_FADE_OUT_DURATION_MS
    );
  }

  private fadeOutOverlayElement() {
    this.overlayElement.animate(
      [
        // keyframes
        {
          opacity: 1
        },
        {
          opacity: 0
        }
      ],
      {
        // timing options
        duration: OVERLAY_FADE_OUT_DURATION_MS,
        iterations: 1,
        fill: "forwards",
        //easing: "cubic-bezier(.85, .2, .75, .95)",
      }
    );
  }

  private removeHtmlElementsFromDom() {
    this.gifElement.remove();
    this.overlayElement.remove();
  }
}