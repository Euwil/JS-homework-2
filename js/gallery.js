import refs from "../references/refs.js";
import images from "../references/app.js";

const { galleryList, modal, originalImg } = refs;

//СОЗДАНИЕ ГАЛЕРЕИ
function createItems(array) {
  return array.reduce(
    (acc, elem) =>
      acc +
      `<li class="gallery__item"><img src="${elem.preview}" alt="${elem.description}" data-source="${elem.original}" class="gallery__image"></li>`,
    ""
  );
}
const img = createItems(images);
galleryList.insertAdjacentHTML("afterbegin", img);

//ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
galleryList.addEventListener("click", onModalOpen);
const sources = images.map(img => img.original)
function onModalOpen(event) {
    event.preventDefault()
    const condition = event.target.nodeName === "IMG";
    if (condition) {
      modal.classList.add("is-open");
      modal.addEventListener("click", onModalClose);
      window.addEventListener("keydown", onModalClose);
      window.addEventListener('keydown', slideModalByKey)
      
    }
    originalImg.attributes.src.value = event.target.dataset.source;
}  
//закрытие модального окна
function onModalClose(event) {
  if (
    event.target.classList.contains("lightbox__overlay") ||
    event.target.classList.contains("lightbox__button") ||
    event.code === "Escape"
  ) {
    modal.classList.remove("is-open");
    modal.removeEventListener("click", onModalClose)
    modal.removeEventListener("keydown", onModalClose)
    window.removeEventListener('keydown', slideModalByKey)
    originalImg.attributes.src.value = ""
  }
}

//перелистывание
function slideModalByKey(e) {
    if (e.code === 'ArrowLeft') {
      byLeft(sources)
    } else if (e.code === 'ArrowRight') {
      byRight(sources)
    }
  }
function byLeft(array) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] === originalImg.attributes.src.value && i > 0) {
        i--
        originalImg.attributes.src.value = array[i]
      }
    }
  }
  function byRight(array) {
    for (let i = 0; i < array.length - 1; i += 1) {
      if (array[i] === originalImg.attributes.src.value) {
        i++
        originalImg.attributes.src.value = array[i]
      }
    }
  }
