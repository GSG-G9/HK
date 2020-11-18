const fs = require('fs');
const path = require('path');

const handleSearch = (inputWord, wordListArray) => JSON.stringify({
  result: wordListArray
    .filter((word) => word.includes(inputWord)),
});

const handlePublicFiles = (req, res, url, serverErrorCallback) => {
  const mimeTypes = {
    css: 'text/css',
    js: 'test/javascript',
    png: 'image/png',
    html: 'text/html',
    ico: 'image/x-icon',
    json: 'application/json',
  };
  const filePath = path.join(__dirname, '..', '..', url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      serverErrorCallback(error, res);
      return;
    }
    res.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(url).substr(1)],
    });
    res.end(file);
  });
};

module.exports = { handleSearch, handlePublicFiles };
