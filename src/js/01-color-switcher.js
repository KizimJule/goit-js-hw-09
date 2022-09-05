const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
stopBtn.setAttribute('disabled', true);

startBtn.addEventListener('click', () => {
  setInterval(() => {
    const color = getRandomHexColor();
    body.style.backgroundColor = color;
  });
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
});
