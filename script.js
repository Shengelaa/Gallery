let allData = [];

fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    allData = data;
    displayImages(allData);
  })
  .catch((error) => console.error("Error fetching data:", error));

function displayImages(images) {
  const mainDiv = document.querySelector(".mainDiv");

  if (!mainDiv) {
    console.error("Error: .mainDiv element not found!");
    return;
  }

  mainDiv.innerHTML = "";

  images.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = item.image_url;
    img.alt = item.title;
    img.classList.add("thumbnail");

    const ahref = document.createElement("a");
    ahref.href = item.desc;
    ahref.textContent = "More Info";
    ahref.target = "blank";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const category = document.createElement("p");
    category.textContent = `Category: ${item.category}`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(ahref);
    mainDiv.appendChild(card);

    img.addEventListener("click", () => openImageModal(item.image_url));
  });
}

function openImageModal(imageUrl) {
  const existingOverlay = document.querySelector(".overlay");
  if (existingOverlay) {
    existingOverlay.remove();
  }

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const fullImage = document.createElement("img");
  fullImage.src = imageUrl;
  fullImage.classList.add("full-image");

  overlay.addEventListener("click", () => {
    overlay.remove();
  });

  overlay.appendChild(fullImage);
  document.body.appendChild(overlay);
}

function filterCategory(category) {
  let filteredData = allData;

  if (category.toLowerCase() === "cat") {
    filteredData = allData.filter(
      (item) => item.category.toLowerCase() === "cat"
    );
  } else if (category.toLowerCase() === "dog") {
    filteredData = allData.filter(
      (item) => item.category.toLowerCase() === "dog"
    );
  } else if (category.toLowerCase() === "hamster") {
    filteredData = allData.filter(
      (item) => item.category.toLowerCase() === "hamster"
    );
  }

  displayImages(filteredData);
}

document.addEventListener("DOMContentLoaded", () => {
  const catsBtn = document.querySelector(".cats");
  const dogsBtn = document.querySelector(".dogs");
  const hamsterBtn = document.querySelector(".hamsters");
  const allBtn = document.querySelector(".all");

  if (catsBtn) catsBtn.addEventListener("click", () => filterCategory("cat"));
  if (dogsBtn) dogsBtn.addEventListener("click", () => filterCategory("dog"));
  if (hamsterBtn)
    hamsterBtn.addEventListener("click", () => filterCategory("hamster"));
  if (allBtn) allBtn.addEventListener("click", () => filterCategory("all"));
});

function filterSearch(query) {
  const cards = document.querySelectorAll(".card");
  query = query.toLowerCase();

  cards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    if (title.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

document
  .getElementById("searchBar")
  .addEventListener("input", function (event) {
    const query = event.target.value;
    filterSearch(query);
  });
