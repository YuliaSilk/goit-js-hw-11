import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

// const elements = {
//     body : document.querySelector('body'),
//     searchForm : document.querySelector('.search-form'),
//     input : document.querySelector('.form-input'),
//     searchBtn : document.querySelector('.search-btn'),
//     gallery : document.querySelector('.gallery'),
//     loadMoreBtn : document.querySelector('.load-more'),
// }  -- гублю слово «elements», тому вирішила так
// import { fetchImages } from './js/pixabayAPI';

const searchForm = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

const lightbox = new SimpleLightbox(".photo-card a"); 

const API_KEY = "39213974-396d72fb1f832236dc1554890"; 
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 40;
// const page = 1;
// const query = '';

let page = 1;

searchForm.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const searchQuery = event.target.searchQuery.value;
  if (searchQuery.trim() === "") {
    Notiflix.Notify.failure("Please enter a search query.");
    return;
  }
  page = 1;
  gallery.innerHTML = ""; 
  fetchImages(searchQuery);
}

loadMoreBtn.addEventListener("click", loadMoreImages);
function loadMoreImages() {
  page += 1;
  const searchQuery = searchForm.searchQuery.value;
  fetchImages(searchQuery);
}


async function fetchImages(searchQuery) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: PER_PAGE,
        page: page,
      },
    })
    console.log(response);
    const images = response.data.hits;
    if (images.length === 0) {
      Notiflix.Notify.failure(
        "Sorry, there are no images matching your search query. Please try again."
      );
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    
    const imageCards = images.map((image) => createImageCard(image));
    gallery.insertAdjacentHTML("beforeend", imageCards.join(""));
    
    lightbox.refresh(); 
   
  } 
  catch (error) {
    console.error(error);}
}



function createImageCard(image) {
  return `
    <div class="photo-card">
      <a href="${image.largeImageURL}" class="photo-card-link">
        <img class="photo" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `;
}





  
  
  




