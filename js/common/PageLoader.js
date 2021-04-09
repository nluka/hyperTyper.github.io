import { throwExceededClassInstanceLimitException } from "./functions.js";
import { loader_img, loaderOverlay_div } from "./page-elements.js";
var OVERLAY_FADE_OUT_DURATION_MS = 750;
var PageLoader = /** @class */ (function () {
    function PageLoader() {
        this.gifElement = loader_img;
        this.overlayElement = loaderOverlay_div;
        PageLoader.instanceCount++;
        if (PageLoader.instanceCount > PageLoader.instanceCountLimit) {
            throwExceededClassInstanceLimitException("PageLoader", PageLoader.instanceCountLimit);
        }
    }
    PageLoader.prototype.removeOverlay = function () {
        var _this = this;
        this.fadeOutOverlayElement();
        setTimeout(function () {
            _this.removeHtmlElementsFromDom();
        }, OVERLAY_FADE_OUT_DURATION_MS);
    };
    PageLoader.prototype.fadeOutOverlayElement = function () {
        this.overlayElement.animate([
            // keyframes
            {
                opacity: 1
            },
            {
                opacity: 0
            }
        ], {
            // timing options
            duration: OVERLAY_FADE_OUT_DURATION_MS,
            iterations: 1,
            fill: "forwards",
            //easing: "cubic-bezier(.85, .2, .75, .95)",
        });
    };
    PageLoader.prototype.removeHtmlElementsFromDom = function () {
        this.gifElement.remove();
        this.overlayElement.remove();
    };
    PageLoader.instanceCountLimit = 1;
    PageLoader.instanceCount = 0;
    return PageLoader;
}());
export default PageLoader;
