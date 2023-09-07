import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";


const searchForm = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

const lightbox = new SimpleLightbox(".photo-card a"); 

const API_KEY = "39213974-396d72fb1f832236dc1554890"; 
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 40;
let page = 1;
let totalHits =0;
let hasMoreImages = true;


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

    totalHits = response.data.totalHits;
    if(page * PER_PAGE >= totalHits) {
      hasMoreImages = false;
    }
      Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    
    const imageCards = images.map((image) => createImageCard(image));
    gallery.insertAdjacentHTML("beforeend", imageCards.join(""));

    if(hasMoreImages) {
      loadMoreBtn.classList.replace("load-more-hidden", "load-more-btn");
    } else {
      loadMoreBtn.classList.add("load-more-hidden")
    }
  
    lightbox.refresh(); 
  
    
  } 
  catch (error) {
    console.error(error);}
}



loadMoreBtn.addEventListener("click", loadMoreImages);
function loadMoreImages() {
  if(!hasMoreImages) {
    loadMoreBtn.classList.add("load-more-hidden");
    return;
  }
  page += 1;

  
  const searchQuery = searchForm.searchQuery.value;
  fetchImages(searchQuery);
  
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






  
  
  




