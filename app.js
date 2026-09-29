let api = "https://v2.jokeapi.dev/joke/Any?type=twopart"; // delivery
// const api = "https://official-joke-api.appspot.com/random_joke"; // punchline

const menuBar = document.getElementById("menu-bar");
const aside = document.querySelector("aside");
const btn = document.getElementById("btn");
const setupText = document.querySelector(".setText");
const deliveryText = document.querySelector(".deliveryText");
const genreText = document.getElementById("genreText");
const container = document.querySelector(".joke-container");
const loading = document.querySelector(".loading");
const info = document.querySelector(".info");
const radio = document.querySelectorAll(".radio > input");
const applyBtn = document.getElementById("apply-btn");
console.log(radio);

radio.forEach((e) => {
  e.addEventListener("change", function () {
    if (e.checked === true) {
      localStorage.setItem("api", `https://v2.jokeapi.dev/joke/${e.id}?type=twopart`);
      api = `https://v2.jokeapi.dev/joke/${e.id}?type=twopart`;
      getNewJoke(api);
    }
  });
});
applyBtn.addEventListener("click", function () {
  const storageApi = localStorage.getItem("api");
  getNewJoke(storageApi);
  toggleSideBar();
});

container.classList.add("hidden");
loading.classList.add("hidden");

const clickSound = new Audio("assets/btn-click.wav");

const jokeStorage = [];
btn.addEventListener("click", function () {
  getNewJoke(api);
});

menuBar.addEventListener("click", () => {
  toggleSideBar();
});

function getNewJoke(apiString) {
  clickSound.play();
  loading.classList.remove("hidden");
  container.classList.add("hidden");
  info.classList.add("hidden");
  fetch(apiString)
    .then((response) => response.json())
    .then((data) => {
      const setup = data.setup;
      const delivery = data.delivery;
      const genre = data.category;
      setupText.textContent = setup;
      deliveryText.textContent = delivery;
      genreText.textContent = genre;
      container.classList.remove("hidden");
      loading.classList.add("hidden");
    })
    .catch((error) => {
      console.error(error);
      loading.classList.add("hidden");
      info.textContent = "Failed to get the joke. Try again.";
      info.classList.remove("hidden");
    });
}

function toggleSideBar() {
  const isHidden = aside.classList.contains("hidden");
  aside.classList.toggle("hidden", !isHidden);
  menuBar.classList.toggle("fa-bars");
  menuBar.classList.toggle("fa-xmark");
}
