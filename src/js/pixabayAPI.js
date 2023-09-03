import axios from "axios";
// const axios =  require ("axios").default;
import Notiflix from "notiflix";

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '39213974-396d72fb1f832236dc1554890';
// const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 40;
const page = 1;
const query = '';

axios
.get('https://pixabay.com/api/?key=39213974-396d72fb1f832236dc1554890&q=text&image_type=photo&orientation=horizontal&safesearch=true',
{ 
    //  params = {
            page: "page",
            q: "query",
            per_page: "PER_PAGE",
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,}
        // }
        )
  .then(res => {
    console.log(res.data);
  })
.catch((error) => {
    console.error(error);
})
// fetch('https://pixabay.com/api/?key=39213974-396d72fb1f832236dc1554890&q=text&image_type=photo&orientation=horizontal&safesearch=true')

