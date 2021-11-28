// імпорти
import './css/styles.css';
import axios from 'axios';
import { fetchGalery } from './helpers/fetchGalery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputSerchForm = document.querySelector('#search-form');
const galleryItemsList = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

// слухачі подій
inputSerchForm.addEventListener('submit', onFormSubmit);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

// кнопка за замовчуванням прихована
btnLoadMore.classList.add('is-hidden');

let page = 1;
let inputText = '';
let totalHits;

//сабміт форми
function onFormSubmit(evt) {
    evt.preventDefault();
    inputText = evt.currentTarget.elements.searchQuery.value;
    evt.target.reset() // очищає інпут
    galleryItemsList.innerHTML = ""; // після введених нових даних в інпут - очищає галерею

    if (inputText === '') { // перевіряє на наявність введених даних в інпут
        return Notify.warning('Please enter your search data')
    }
    
    fetchGalery(inputText, page).then(checkrenderGalery)
        .catch(error => console.log('Упс, щось пішло не за планом...', error));
        let lightbox = new SimpleLightbox('.gallery a');
}

function checkrenderGalery(images) {
console.log(images);
    if (images.data.hits.length === 0) {
        btnLoadMore.classList.add('is-hidden');
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }

    totalHits = images.data.hits.total;
    btnLoadMore.classList.remove('is-hidden');
    Notify.success(`Hooray! We found ${totalHits} images.`);
    return renderGalery(images);
}


// кнопка дозагрузки
function onBtnLoadMoreClick() {
    page += 1;
    isAllImages();
    return fetchImages(inputText, page).then(renderGalery)
        .catch(error => console.log('Упс, щось пішло не за планом...', error));
}

//  перевірка загрузки
function isAllImages() {
    if (page * 40 >= totalHits) {
        onBtnLoadMoreClick.classList.add('is-hidden');
        Notify.warning("We're sorry, but you've reached the end of search results.");
    }
}
// створює розмітку галереї
function renderGalery(images) {
    const imagesArray = images.data.hits;
    const marcupGalery = imagesArray.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="galery-container">
    <a class="link" href="${largeImageURL}">
        <div class="photo-card">
            <img src="${webformatURL} " alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes: ${likes}</b>
                </p>
                <p class="info-item">
                <b>Views: ${views}</b>
                </p>
                <p class="info-item">
                <b>Comments: ${comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads: ${downloads}</b>
                </p>
            </div>
        </div>
    </a>
    </div>`
    )
    .join('');
    galleryItemsList.insertAdjacentHTML = ('beforeend', marcupGalery);

    let gallery = new SimpleLightbox('.gallery a');
    gallery.refresh();      
}

