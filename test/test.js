/* eslint-disable no-undef */
const supertest = require('supertest');
const { handleSearch } = require('../src/handler/handler');
const router = require('../src/router');

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

describe('Test Routers', () => {
  test('GET / should return status code 200', (done) => {
    supertest(router)
      .get('/')
      .expect(200, done);
  });

  test('GET /search should return status code 200', (done) => {
    supertest(router)
      .get('/')
      .send({ text: 'a' })
      .expect(200, done);
  });

  test('GET /unknown should return status code 404', (done) => {
    supertest(router)
      .get('/unknown')
      .expect('Content-Type', /html/)
      .expect(404, done);
  });
  test('GET /404.html should return status code 404', (done) => {
    supertest(router)
      .get('/unknown')
      .expect('Content-Type', /html/)
      .expect(404, done);
  });
});
