const drawCloud = require('./cloud');
const segmenter = require('./segmenter');

const cloudDiv = document.querySelector('#cloud');
const submit = document.querySelector('#submit');
submit.addEventListener('click', (event) => {
  cloudDiv.textContent = 'loading';

  const textarea = document.form1.textarea1.value;

  segmenter.parseText(textarea).then((words) => {
    document.querySelector('#cloud').textContent = null;
    const _words = segmenter.countWords(words);
    drawCloud(_words);
  });
});

const reset = document.querySelector('#reset');
reset.addEventListener('click', (event) => {
  document.form1.textarea1.value = null;
  cloudDiv.textContent = null;
});
