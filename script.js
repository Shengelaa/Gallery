let allData = [];

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    allData = data;
    const mainDiv = document.querySelector(".mainDiv");

    displayImages(allData);
  })
  .catch((error) => console.error("Error fetching data:", error));

function displayImages(images) {
  const mainDiv = document.querySelector(".mainDiv");

  mainDiv.innerHTML = "";

  images.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = item.image_url;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const category = document.createElement("p");
    category.textContent = `Category: ${item.category}`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(category);
    mainDiv.appendChild(card);
  });
}

function filterCategory(category) {
  let filteredData = [];

  if (category.toLowerCase() === "cat") {
    filteredData = allData.filter(
      (item) => item.category.toLowerCase() === "cat"
    );
  } else if (category.toLowerCase() === "dog") {
    filteredData = allData.filter(
      (item) => item.category.toLowerCase() === "dog"
    );
  } else {
    filteredData = allData;
  }

  displayImages(filteredData);
}

document
  .querySelector(".cats")
  .addEventListener("click", () => filterCategory("cat"));
document
  .querySelector(".dogs")
  .addEventListener("click", () => filterCategory("dog"));
document
  .querySelector(".all")
  .addEventListener("click", () => filterCategory("all"));
