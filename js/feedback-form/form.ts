import {
  message_textarea,
  messageCharsRemainingCounter_div,
  submitForm_input
} from "./page-elements.js";

function main() {
  addMessageTextareaInputEventListener();
  addFormOnSubmitHandler();
}

function addMessageTextareaInputEventListener() {
  message_textarea.addEventListener("input", () => {
    messageCharsRemainingCounter_div.innerText = `${500 - message_textarea.value.length} characters left`;
  });
}

function addFormOnSubmitHandler() {
  submitForm_input.onsubmit = () => {
    alert("Thank you for feedback submission!");
    window.location.assign("index.html");
  }
}

main();