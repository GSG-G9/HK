const searchInput = document.getElementById('input-word');
const result = document.getElementById('suggestions');

const cachedData = (() => {
  const localData = {};
  return {
    get: () => localData,
    set: (data, key) => {
      localData[key] = data;
    },
  };
})();
const createPElement = (text) => {
  const p = document.createElement('p');
  p.innerText = text;
  p.classList.add('searchSection-p-result');
  p.addEventListener('mouseenter', () => {
    searchInput.value = text;
  });
  p.addEventListener('click', () => {
    addDataToDomBasedOnCache();
  });

  return p;
  // class : inline-block - width : 100%
};

const wordLocalSearch = (word, string) => JSON.stringify({
  text: string
    .split('\n')
    .filter((wd) => wd.includes(word))
    .join('\n'),
});

const addResultToDom = (dataArray) => {
  if (dataArray.length !== 0 && dataArray[0] !== '') {
    result.append(...dataArray.map((element) => createPElement(element)));
  }
};

const requestDataFromApi = (setLocalData, callback) => {
  request('/search', 'POST', `${searchInput.name}=${searchInput.value}`, (error, data) => {
    if (error === 404) {
      window.location.href = '../404.html';
      return;
    } if (error === 500) {
      window.location.href = '../500.html';
      return;
    } if (error) {
      console.log(error);
      return;
    }
    setLocalData(data.result, searchInput.value);
    callback(data.result);
  });
};
const removePrevResult = () => {
  [...result.children].forEach((child) => child.remove());
};

const getDataFromApi = () => {
  removePrevResult();
  if (searchInput.value.length !== 0) {
    requestDataFromApi(cachedData.set, addResultToDom);
  }
};
const getDataFromLocalCache = () => {
  removePrevResult();
  if (searchInput.value.length !== 0) {
    const key = searchInput.value[0];
    const textResultOfKey = cachedData.get()[key];
    const dataArray = JSON.parse(wordLocalSearch(searchInput.value, textResultOfKey.join('\n'))).text;
    addResultToDom(dataArray.split('\n'));
  }
};

function addDataToDomBasedOnCache() {
  if (cachedData.get() && cachedData.get()[searchInput.value[0]]) {
    getDataFromLocalCache();
    return;
  }
  getDataFromApi();
}

searchInput.addEventListener('input', () => {
  addDataToDomBasedOnCache();
});
