const kuromoji = require('kuromoji');
const { join, dirname } = require('path');

function parseText(text) {
  return new Promise((resolve, error) => {
    kuromoji
      .builder({ dicPath: join(dirname(__dirname), 'assets', 'dict') })
      .build((err, tokenizer) => {
        if (err) {
          console.log(err);
          error(err);
        }
        const tokens = tokenizer
          .tokenize(text)
          .filter((t) => ['名詞', '動詞', '形容詞'].includes(t.pos))
          .map((t) => (t.basic_form === '*' ? t.surface_form : t.basic_form));
        resolve(tokens);
      });
  });
}
function countWords(words) {
  const wordsLength = words.length;
  const count = words.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(count).map((wordCount) => {
    return { text: wordCount[0], size: (wordCount[1] / wordsLength) * 1000 };
  });
}
module.exports = {
  parseText: parseText,
  countWords: countWords,
};
