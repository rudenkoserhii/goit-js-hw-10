
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const refs = {
    body: document.querySelector('body'),
    buttonStart: document.querySelector('button[data-start]'),
    buttonStop: document.querySelector('button[data-stop'),
};

refs.buttonStart.style.padding = "10px";
refs.buttonStart.style.textTransform = "uppercase";
refs.buttonStop.style.padding = "10px";
refs.buttonStop.style.textTransform = "uppercase";


refs.buttonStop.setAttribute("disabled", "");

let intervalId = null;

function onClickStart() {
    intervalId = setInterval(() => {
    refs.body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
    refs.buttonStop.removeAttribute("disabled", "");
    refs.buttonStart.setAttribute("disabled", "");
};

refs.buttonStart.addEventListener('click', onClickStart);

function onClickStop() {
    clearInterval(intervalId);
    refs.buttonStart.removeAttribute("disabled", "");
    refs.buttonStop.setAttribute("disabled", "");

};

refs.buttonStop.addEventListener('click', onClickStop);
