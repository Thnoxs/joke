let apiString = "https://v2.jokeapi.dev/joke/Any?type=twopart"; 

const menuBar = document.getElementById("menu-bar");
const aside = document.querySelector("aside");
const btn = document.getElementById("btn");
const setupText = document.querySelector(".setText");
const deliveryText = document.querySelector(".deliveryText");
const genreText = document.getElementById("genreText");
const jokeContainer = document.querySelector(".joke-container");
const loading = document.querySelector(".loading");
const info = document.querySelector(".info");
const radio = document.querySelectorAll(".radio > input");
const applyBtn = document.getElementById("apply-btn");
const deleteAPI = document.querySelector(".fa-arrow-rotate-right");

radio.forEach((e) => {
  e.addEventListener("change", function () {
    if (e.checked === true) {
      apiString = `https://v2.jokeapi.dev/joke/${e.id}?type=twopart`;
    }
  });
});
applyBtn.addEventListener("click", function () {
  localStorage.setItem("api", apiString);
  toggleSideBar();
  location.reload();
});

const storageApi = localStorage.getItem("api");
const hasAPI = localStorage.key("api") === "api";

if (hasAPI) {
  getNewJoke(storageApi);
} else {
  homePage();
}

btn.addEventListener("click", function () {
  if (hasAPI) {
    getNewJoke(storageApi);
    console.log(storageApi);
  } else {
    getNewJoke();
  }
});

menuBar.addEventListener("click", () => {
  toggleSideBar();
});

function getNewJoke(newAPI = apiString) {
  loading.classList.remove("hidden");
  jokeContainer.classList.add("hidden");
  info.classList.add("hidden");
  fetch(newAPI)
    .then((response) => response.json())
    .then((data) => {
      setupText.textContent = data.setup;
      deliveryText.textContent = data.delivery;
      genreText.textContent = data.category;
      jokeContainer.classList.remove("hidden");
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

function homePage() {
  genreText.textContent = "Not sleacted"
  jokeContainer.classList.add("hidden");
  loading.classList.add("hidden");
}

deleteAPI.addEventListener("click", function () {
  localStorage.clear();
  toggleSideBar();
  location.reload();
});
