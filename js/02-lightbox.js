import { galleryItems } from "./gallery-items.js";

const createGalleryMarkup = function (galleryMarkupItems) {
  return galleryMarkupItems
    .map(
      (item) => `
    <li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
            <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
        </a>
    </li>`
    )
    .join("");
};

const galleryListRef = document.querySelector(".gallery");

const GalleryMarkup = createGalleryMarkup(galleryItems);
galleryListRef.innerHTML = GalleryMarkup;

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
