import axios from "axios";

const photosBtn = document.getElementById("photosBtn");
const factsBtn = document.getElementById("factsBtn");
const factsInput = document.getElementById("factsNo");
const photosInput = document.getElementById("photosNo");
const displayResults = document.getElementById("displayResults");

factsBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const count = factsInput.value;
  console.log(count);
  displayResults.innerHTML = '<div class="loader"></div>';
  try {
    const response = await axios.get(
      `https://meowfacts.herokuapp.com/?count=${count}`,
    );
    // if(!response.ok) throw new Error("somthing went wrongs");

    const facts = response.data.data;
    console.log(facts);
    const results = facts
      .slice(0, 50)
      .map((fact) => {
        return `<li>${fact}</li>`;
      })
      .join("");

    displayResults.innerHTML = `<div class="facts-show"><ol>${results}</ol></div>`;
  } catch (error) {
    console.log("something went wrong", error);
  }
});
photosBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const numberOfCatPhotos = photosInput.value;
  displayResults.innerHTML = '<div class="loader"></div>';

  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=${numberOfCatPhotos}`,
    );
    const photos = response.data;
    console.log(photos);

    const result = photos
      .map((photo) => {
        return `<div class="image-container"><img src="${photo.url}"></div>`;
      })
      .join("");

    displayResults.innerHTML = `<div class="images">${result}</div>`;
  } catch (error) {
    console.log("Something went wrong", error);
    displayResults.innerHTML = `<p>Error loading cat photos: ${error.message}</p>`;
  }
});
