import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
const form = document.querySelector('.form');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', submitPromise);
function submitPromise(evt) {
  evt.preventDefault();
  let delayNumb = delay.valueAsNumber;
  let stepNumb = step.valueAsNumber;
  let amountNumb = amount.valueAsNumber;

  for (let i = 1; i <= amountNumb; i++) {
    createPromise(i, delayNumb)
      .then(({ position, delayNumb }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delayNumb}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delayNumb}ms`);
      });
    delayNumb += stepNumb;
  }
}
