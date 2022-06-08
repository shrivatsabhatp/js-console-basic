import { curry } from "ramda";

const consoleInput = document.querySelector(".console-input");
const historyContainer = document.querySelector(".console-history");

const CreateElement = (ele) => document.createElement(ele);
const AddClassToElement = curry((ele, cls) => ele.classList.add(cls));
const AppendTextContent = curry((ele, text) => (ele.textContent = text));
const EventListenTo = curry((ele, event, callback) => {
  ele.addEventListener(event, callback);
});

function appendResult(inputAsString, output) {
  const outputAsString =
    output instanceof Array ? `[${output.join(", ")}]` : output.toString();

  const inputLogElement = CreateElement("div");
  const outputLogElement = CreateElement("div");

  AddClassToElement(inputLogElement, "console-input-log");
  AddClassToElement(outputLogElement, "console-output-log");

  AppendTextContent(inputLogElement, `> ${inputAsString}`);
  AppendTextContent(outputLogElement, `${outputAsString}`);

  historyContainer.append(inputLogElement, outputLogElement);
}

const CurriedAppendResult = curry(appendResult);

const ConsoleInputKeyUp = EventListenTo(consoleInput, "keyup");

const handdleConsoleInputKeyUp = (e) => {
  const inputData = consoleInput.value.trim();

  if (inputData.length === 0) {
    return;
  }

  if (e.key === "Enter") {
    try {
      CurriedAppendResult(inputData, eval(inputData));
    } catch (err) {
      CurriedAppendResult(inputData, err);
    }

    consoleInput.value = "";
  }
};

ConsoleInputKeyUp(handdleConsoleInputKeyUp);
