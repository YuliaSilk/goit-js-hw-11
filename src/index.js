import { fetchImages } from './js/pixabayAPI';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const elements = {
    body : document.querySelector('body'),
    searchForm : document.querySelector('.search-form'),
    input : document.querySelector('.form-input'),
    searchBtn : document.querySelector('.search-btn'),
    gallery : document.querySelector('.gallery'),
    loadMoreBtn : document.querySelector('.load-more'),
}

// export default { 
//     beforeCreate() { 
//       this.showHideSpinner = true; 
//     }, 
//     mounted() { 
//       this.showHideSpinner = false; 
//     }, 
//     data() { 
//       return { 
//         showHideSpinner: true 
//       }; 
//     } 
//   }; 

let page = 1;

elements.searchForm.addEventListener('submit', handlerSubmit);
function handlerSubmit(evt) {
evt.preverentDefault();
const searchQuery = evt.target.searchQuery.value;
if (searchQuery.trim() === "") {
    Notiflix.Notify.failure("Please enter a search query.");
    return
}
page = 1;
elements.gallery.innerHTML = "";
fetchImages(searchQuery);
}

elements.loadMoreBtn.addEventListener('click', loadMoreImages);
function loadMoreImages() {
    page +=1;
    const searchQuery = searchForm.searchQuery.value;
    fetchImages(searchQuery);
}



function createMarkup(arr) {
  return arr.map(({ webformatURL, largeImageURL, tags, links, views, comments, downloads }) => `
  <div class="photo-card">
  <a href="${largeImageURL} class="photo-card-link"
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    ${likes}</p>
    <p class="info-item">
      <b>Views</b>
    ${views}</p>
    <p class="info-item">
      <b>Comments</b>
   ${comments} </p>
    <p class="info-item">
      <b>Downloads</b>
   ${downloads} </p>
  </div>
  </div>`).join('')
  }
  
  container.insertAdjacentHTML('beforeend', createMarkup(galleryItems));
  
  // console.log(SimpleLightbox);
  // new SimpleLightbox('.gallery a', {
  //     captionsData: "alt",
  //     captionsDelay: 250, });
  
  




