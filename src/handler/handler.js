const handleSearch = (inputWord, wordListArray) => JSON.stringify({
  result: wordListArray
    .filter((word) => word.includes(inputWord)),
});

module.exports = { handleSearch };
