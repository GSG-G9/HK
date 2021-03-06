const request = (url, method, data = null, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(null, JSON.parse(xhr.responseText));
      } else {
        callback(xhr.status);
      }
    }
    xhr.onerror = (error) => {
      callback(error);
    };
  };
  xhr.open(method, url);
  xhr.send(data);
};
