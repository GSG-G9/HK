const searchInput = document.getElementById("input-word");
const result = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
  request("/search", "POST", searchInput.name + "=" + searchInput.value , (x, data) => {
    if (x === 404) {
      window.location.href = "../404.html";
      return;
    } else if (x === 500) {
      window.location.href = "../500.html";
      return;
    } else if (x) {
      window.location.href = "../404.html";
    }
    result.innerText = data.result;
    return;
  });
});
