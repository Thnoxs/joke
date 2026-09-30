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
const radioInputs = document.querySelectorAll(".radio > input");
const radio = document.querySelectorAll(".radio");
const applyBtn = document.getElementById("apply-btn");
const deleteAPI = document.querySelector(".fa-arrow-rotate-right");

menuBar.addEventListener("click", () => {
  toggleSideBar();
});

radioInputs.forEach((e) => {
  e.addEventListener("change", function () {
    if (e.checked === true) {
      localStorage.setItem("categorie", e.id);
      apiString = `https://v2.jokeapi.dev/joke/${e.id}?type=twopart`;
    }
  });
});

radio.forEach((e) => {
  const categorie = localStorage.getItem("categorie");
  e.addEventListener("click", function () {
    removeActive();
    e.classList.add("active");
  });
  if (e.children[0].textContent === categorie) {
    removeActive();
    e.children[1].checked = true;
    e.classList.add("active");
  }
});

applyBtn.addEventListener("click", function () {
  localStorage.setItem("api", apiString);
  toggleSideBar();
  location.reload();
});

const storageApi = localStorage.getItem("api");
const hasAPI = localStorage.getItem("api") !== null;

if (hasAPI) {
  getNewJoke(storageApi);
} else {
  homePage();
}

btn.addEventListener("click", function () {
  if (hasAPI) {
    getNewJoke(storageApi);
  } else {
    getNewJoke();
  }
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
  genreText.textContent = "Any";
  jokeContainer.classList.add("hidden");
  loading.classList.add("hidden");
}
function removeActive() {
  radio.forEach((e) => {
    e.classList.remove("active");
  });
}
deleteAPI.addEventListener("click", function () {
  if (hasAPI) {
    const askPermission = window.confirm("Are you really wont to delete API? 🤔");
    if (askPermission) {
      localStorage.clear();
      toggleSideBar();
      location.reload();
    } else {
      console.log("Permission denied 🙅");
    }
  } else {
    window.alert("Sorry.. You dont have any Custom API yet 🫣");
  }
});
