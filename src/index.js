import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import onRenderGallery from "./modules/render-gallery";
import {fetchImages} from "./modules/fetch-gallery-images";

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const showMoreBtn = document.querySelector('.show-more__btn');

let page = 1;
let per_page = 40;
let simpleLightBox;
let query = '';

searchForm.addEventListener('submit', onSubmit)
showMoreBtn.addEventListener('click', onLoadMore)

async function onSubmit (e) {
    e.preventDefault();
    document.body.style.marginBottom = '50px';
    page = 1;

    let {searchQuery} = e.currentTarget;
    if (query === searchQuery.value) {
        return
    }
    query = searchQuery.value;

    gallery.innerHTML = '';
    showMoreBtn.classList.add('visually-hidden');

    if (query === '') {
        Notify.failure('Please, enter the name of the image');
        showMoreBtn.classList.add('visually-hidden');
        return;
    } 

    const response = await fetchImages(query, page, per_page)

    if (response.data.hits.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    }
    onRenderGallery(response.data.hits)
    
    Notify.success(`Hooray! We found ${response.data.totalHits} images total!`);
    if (per_page < response.data.totalHits) {
        showMoreBtn.classList.remove('visually-hidden');
    }
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        
}

async function onLoadMore () {
    page += 1;
    simpleLightBox.destroy();
    const response = await fetchImages(query, page, per_page)
    onRenderGallery(response.data.hits)

    simpleLightBox = new SimpleLightbox('.gallery a').refresh();

    if(page > Math.ceil((response.data.totalHits / per_page))) {
        showMoreBtn.classList.add('visually-hidden');
        document.body.style.marginBottom = '80px'
        Notify.failure("We're sorry, but you've reached the end of search results.")
        return;
    }

    const { height } = gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: height * 2,
    behavior: "smooth",
    });
}

/* window.addEventListener('scroll', checkPosition)

function checkPosition() {
    const height = document.body.offsetHeight
    const screenHeight = window.innerHeight

    const scrolled = window.scrollY
  
    const threshold = height - screenHeight / 4
  
    const position = scrolled + screenHeight

    if (position >= threshold) {
        page += 1;
        simpleLightBox.destroy()

    fetchImages(query, page, per_page)
        .then(({data}) => {
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();
            onRenderGallery(data.hits)
            if(page > Math.ceil((data.totalHits / per_page)) && position >= threshold) {
                showMoreBtn.classList.add('visually-hidden');
                return Notify.failure("We're sorry, but you've reached the end of search results.")
            }    
        })
        .catch(error => console.log(error))
    }
  } */