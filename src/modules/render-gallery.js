const gallery = document.querySelector('.gallery');

function onRenderGallery (images) {
    const markup = images
    .map(image => {
        const {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = image;
       
     return `
        <a class="gallery__link" href=${largeImageURL}>
            <div class="gallery__photo-card">
                <img class="gallery__image" src=${webformatURL} alt=${tags} loading="lazy" />
                <ul class="info__list">
                    <li class="info__item">
                        <b>Likes</b>
                        ${likes}
                    </li>
                    <li class="info__item">
                        <b>Views</b>
                        ${views}
                    </li>
                    <li class="info__item">
                        <b>Comments</b>
                        ${comments}
                    </li>
                    <li class="info__item">
                        <b>Downloads</b>
                        ${downloads}
                    </li>
                </ul>
            </div>
        </a>
        `
        })
    .join("")
    gallery.insertAdjacentHTML('beforeend', markup)
}

export default onRenderGallery;