import {fetchImages} from "./modules/fetch-gallery-images";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import onRenderGallery from "./modules/render-gallery";

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const showMoreBtn = document.querySelector('.show-more__btn');

let page = 1;
let per_page = 40;
let lightbox;

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    gallery.innerHTML = '';
    showMoreBtn.classList.add('visually-hidden');

    let {searchQuery} = e.currentTarget;
    let query = searchQuery.value;

    if (query === '') {
        Notify.failure('Please, enter the name of the image');
        showMoreBtn.classList.add('visually-hidden');
        return;
    }

    fetchImages(query, page, per_page)
        .then(({data}) => {
            if (data.hits.length === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            }
            onRenderGallery(data.hits)

            if (per_page < data.totalHits) {
                showMoreBtn.classList.remove('visually-hidden');
            }
            lightbox = new SimpleLightbox('.gallery a').refresh();
        })
        .catch(error => console.log(error))
})

showMoreBtn.addEventListener('click', () => {
    page += 1;
    lightbox.destroy();
    fetchImages(query = '', page, per_page)
        .then(({data}) => {
            Notify.success(`Hooray! We found ${per_page} images more!`);
            onRenderGallery(data.hits)
            
            if(page >= Math.round((data.totalHits / data.hits))) {
                showMoreBtn.classList.add('visually-hidden');
                Notify.failure("We're sorry, but you've reached the end of search results.")
            }
            const { height } = gallery.firstElementChild.getBoundingClientRect();

            window.scrollBy({
            top: height * 2,
            behavior: "smooth",
            });

            const link = document.querySelectorAll('.gallery_link')
            console.log(link)
            lightbox = new SimpleLightbox('.gallery a').refresh();
        })

})