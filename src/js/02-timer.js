import Notiflix from 'notiflix';

import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const refs = {
    btn: document.querySelector('button'),
    timer: document.querySelector('.timer'),
    fields: document.querySelectorAll('.field'),
    values: document.querySelectorAll('.value'),
    labels: document.querySelectorAll('.label'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),

};

refs.timer.style.display = "flex";
refs.timer.style.gap = "10px";

refs.fields.forEach(field => {
    field.style.display = "flex"; field.style.flexDirection = "column"; field.style.width = "50px"; field.style.alignItems = "center";
    field.style.justifyContent = "center";
});

refs.values.forEach(value => {
    value.style.fontSize = "30px";
});

refs.labels.forEach(label => {
    label.style.fontSize = "10px";
    label.style.textTransform = "uppercase";
});

refs.btn.setAttribute('disabled', '');

const date = new Date();
let timeLength = 0;
let timeLengthObject = {};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
    if (selectedDates[0] < date) {
        Notiflix.Notify.warning("Please choose a date in the future");
    } else if (selectedDates[0] >= date) {
        refs.btn.removeAttribute('disabled', '');
        timeLength = selectedDates[0] - date;

        addDateToWindow(timeLength);
console.log(timeLength);
        return timeLength;
    }
},
};
flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function onBtnClick() {
    let timeLeft = null;
    timeLeft = setInterval(() => {
        if (timeLength > 1000) {
            timeLength -= 1000;
            addDateToWindow(timeLength);
        } else {clearInterval(timeLeft);}
    }, 1000);
    refs.btn.setAttribute('disabled', '');
};

refs.btn.addEventListener('click', onBtnClick);

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
};

function addDateToWindow(timeLength) {

    timeLengthObject = convertMs(timeLength);
        
    refs.days.textContent = timeLengthObject.days;
    refs.hours.textContent = addLeadingZero(timeLengthObject.hours);
    refs.minutes.textContent = addLeadingZero(timeLengthObject.minutes);
    refs.seconds.textContent = addLeadingZero(timeLengthObject.seconds);
};


