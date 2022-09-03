import throttle from 'lodash.throttle';
import storageAPI from './storage';

let form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(hendleInput, 500));
form.addEventListener('submit', handleSubmit);

initPage();

function hendleInput(evt) {
  const { name, value } = evt.target;
  let saveData = storageAPI.load('feedback-form-state');
  saveData = saveData ? saveData : {};
  saveData[name] = value;
  storageAPI.save('feedback-form-state', saveData);
}

function initPage() {
  const saveData = storageAPI.load('feedback-form-state');
  if (!saveData) {
    return;
  }
  //   const saveDataObj = JSON.parse(saveData);
  Object.entries(saveData).forEach(([name, value]) => {
    form.elements[name].value = value;
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  storageAPI.remove('feedback-form-state');
}
