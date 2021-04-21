import samples from "./gallery-items.js";

const galleryContainer = document.querySelector(".js-gallery");
const modalLightbox = document.querySelector(".js-lightbox");
const modalOverlay = modalLightbox.querySelector(".lightbox__overlay");
const modalBtnClose = document.querySelector(".lightbox__button");
const currentImage = modalLightbox.querySelector(".lightbox__image");

//создаем карточки галереи и вставляем в список (все за 1 раз)
const galleryCards = createGalleryCardsMarkup(samples);
galleryContainer.insertAdjacentHTML("beforeend", galleryCards);

function createGalleryCardsMarkup(samples) {
  return samples
    .map((sample) => {
      const { preview, original, description } = sample;
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
          onclick="event.preventDefault()"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            data-index="${samples.indexOf(sample)}"
          />
        </a>
       </li>`;
    })
    .join("");
}

function onGallaryContainerClick(evt) {
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  currentSlide = evt.target;
  imgAttributeChange(currentSlide);

  if (!modalLightbox.classList.contains("is-open")) {
    modalLightbox.classList.add("is-open");
  }

  if (modalLightbox.classList.contains("is-open")) {
    window.addEventListener("keydown", onChangeImageKeyPress);
  }

  modalBtnClose.addEventListener("click", onModalClose);
  modalOverlay.addEventListener("click", onModalClose);
  window.addEventListener("keydown", onEscKeyPress);
}

galleryContainer.addEventListener("click", onGallaryContainerClick);

let currentSlide = 0;
let slides = document.querySelectorAll(".gallery__image");

function imgAttributeChange(currentSlide) {
  currentImage.src = currentSlide.dataset.source;
  currentImage.alt = currentSlide.alt;
}

function onModalClose() {
  modalLightbox.classList.remove("is-open");
  removeImageSrc();
  window.removeEventListener("keydown", onChangeImageKeyPress);
}

function removeImageSrc() {
  currentImage.src = "";
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = "Escape";
  const escKey = event.code === ESC_KEY_CODE;
  if (escKey) {
    onModalClose();
  }
}

function showNextSlide() {
  if (currentSlide.dataset.index < 8) {
    currentSlide = slides[Number(currentSlide.dataset.index) + 1];
  } else {
    currentSlide = slides[8];
  }
  currentImage.src = currentSlide.dataset.source;
  currentImage.alt = currentSlide.alt;
}

function showPrevSlide() {
  if (currentSlide.dataset.index > 0) {
    currentSlide = slides[Number(currentSlide.dataset.index) - 1];
  } else {
    currentSlide = slides[0];
  }
  currentImage.src = currentSlide.dataset.source;
  currentImage.alt = currentSlide.alt;
}

function onChangeImageKeyPress(event) {
  const NEXT_IMG_KEY_CODE = "ArrowRight";
  const PREV_IMG_KEY_CODE = "ArrowLeft";
  let nextImgKey = event.code === NEXT_IMG_KEY_CODE;
  let prevImgKey = event.code === PREV_IMG_KEY_CODE;
  if (nextImgKey) {
    showNextSlide();
  } else if (prevImgKey) {
    showPrevSlide();
  }
}
