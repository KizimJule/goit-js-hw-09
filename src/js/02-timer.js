import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');

const startTimerBtn = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
let intervalId = null;

//изначально кноака не активна
startTimerBtn.setAttribute('disabled', true);

function par(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = par(Math.floor(ms / day));
  // Remaining hours
  const hours = par(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = par(Math.floor(((ms % day) % hour) / minute));

  const seconds = par(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    // console.log(options.defaultDate);
    //если выбрали дату в прошлом, то выдаст предупреждение и выполнение кода прекратится, если дата в будущем - кнопка станет активной и начнется отсчет времени до выбранной даты
    if (options.defaultDate > selectedDates[0]) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    startTimerBtn.removeAttribute('disabled');
    startTimerBtn.addEventListener('click', () => {
      intervalId = setInterval(() => {
        const timeDifference = selectedDates[0] - new Date();

        if (timeDifference < 1000) {
          clearInterval(intervalId);
        }
        const result = convertMs(timeDifference);
        viewOfTimer(result);
      });
      startTimerBtn.setAttribute('disabled', true);
      input.setAttribute('disabled', true);
    });
  },
};

flatpickr(input, options);

function viewOfTimer({ days, hours, minutes, seconds }) {
  daysSpan.textContent = `${days}`;
  hoursSpan.textContent = `${hours}`;
  minutesSpan.textContent = `${minutes}`;
  secondsSpan.textContent = `${seconds}`;
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
