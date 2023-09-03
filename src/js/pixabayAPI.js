// import axios from "axios";
// const axios =  require ("axios").default;
// import Notiflix from "notiflix";

// axios.defaults.baseURL = 'https://pixabay.com/api/';

// const API_KEY = '39213974-396d72fb1f832236dc1554890';
// const BASE_URL = "https://pixabay.com/api/";
// const PER_PAGE = 40;
// const page = 1;
// const query = '';

// function fetchImages(searchQuery) {
//   axios
//     .get(BASE_URL, {
//       params: {
//         key: API_KEY,
//         q: searchQuery,
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: "true",
//         per_page: PER_PAGE,
//         page: page,
//       },
//     })
//     .then((response) => {
//       const images = response.data.hits;
//       if (images.length === 0) {
//         Notiflix.Notify.failure(
//           "Sorry, there are no images matching your search query. Please try again."
//         );
//         return;
//       }

//       Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      
//       const imageCards = images.map((image) => createImageCard(image));
//       gallery.insertAdjacentHTML("beforeend", imageCards.join(""));
      
//       lightbox.refresh(); // Оновлення галереї SimpleLightbox
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
//   export { fetchImages };