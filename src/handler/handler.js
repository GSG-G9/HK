const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const handleSearch = (inputWord, wordListArray) => JSON.stringify({
  result: wordListArray
    .filter((word) => word.startsWith(inputWord)),
});

const handlePublicFiles = (request, response, url, serverErrorCallback) => {
  const mimeTypes = {
    css: 'text/css',
    js: 'test/javascript',
    png: 'image/png',
    html: 'text/html',
    ico: 'image/x-icon',
    json: 'application/json',
    jpeg: 'image/jpeg',
  };
  const filePath = path.join(__dirname, '..', '..', url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      serverErrorCallback(error, response);
      return;
    }
    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(url).substr(1)],
    });
    response.end(file);
  });
};

const homeHandler = (request, response) => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500);
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    }
  });
};

const errorHandler = (request, response, url) => {
  const filePath = path.join(__dirname, '..', '..', url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500);
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    }
  });
};

const autocompleteHandler = (request, response) => {
  let allData = '';
  request.on('data', (chunkOfData) => {
    allData += chunkOfData;
  });

  request.on('end', () => {
    const receivedData = querystring.parse(allData);
    const filePath = path.join(__dirname, '..', './data/word.txt');
    fs.readFile(filePath, 'utf8', (error, file) => {
      if (error) {
        response.writeHead(500);
        response.end();
      } else {
        const result = handleSearch(receivedData.text, file.split('\n'));
        response.writeHead(200);
        response.end(result);
      }
    });
  });
};

const notFoundHandler = (request, response) => {
  const filePath = path.join(__dirname, '..', '..', 'public', '404.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500);
      response.end();
    } else {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end(file);
    }
  });
};

module.exports = {
  handleSearch, handlePublicFiles, homeHandler, errorHandler, autocompleteHandler, notFoundHandler,
};
