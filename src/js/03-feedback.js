import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const message = document.querySelector('textarea');
const localStorageKey = 'feedback-form-state';

form.addEventListener(
  'input',
  throttle(
    (event => {
      const inputData = {
        email: form.email.value,
        message: form.message.value,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(inputData));
    },
    500)
  )
);

const storageData = localStorage.getItem(localStorageKey);
const parseData = JSON.parse(storageData);

form.addEventListener('submit', event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  localStorage.clear();
});

const resetForm = () => {
  if (parseData !== '') {
    input.value = parseData.email;
    message.value = parseData.message;
  }
};

resetForm();
