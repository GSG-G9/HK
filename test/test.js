const { handleSearch } = require('../src/handler/handler');

describe('Test handleSearch Function', () => {
  test('Should return object with key:result and value:array of all words match input word', () => {
    const wordListArray = ['a', 'ab', 'abc'];
    const inputWord = 'a';
    const actual = handleSearch(inputWord, wordListArray);
    const expected = '{"result":["a","ab","abc"]}';
    expect(expected).toEqual(actual);
  });
  test('Should return object with key:result and value:empty array when no match exist', () => {
    const wordListArray = ['a', 'ab', 'abc'];
    const inputWord = 'd';
    const actual = handleSearch(inputWord, wordListArray);
    const expected = '{"result":[]}';
    expect(expected).toEqual(actual);
  });
});
