import { galleryItems } from "./gallery-items.js";

const createMarkup = function (markupData) {
  return markupData
    .map(
      (img) =>
        `<li class="gallery__item">
            <a class="gallery__link" href="${img.original}">
                <img
                    class="gallery__image"
                    data-source="${img.original}" 
                    src="${img.preview}" 
                    alt="${img.description} 
                    loading="lazy"
                />
            </a>
        </li>`
    )
    .join("");
};

const onGalleryListClick = function (e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }

  const img = e.target;
  const modalOverlay = basicLightbox.create(
    `<img src="${img.getAttribute("data-source")}" alt="${img.alt}"/>`,
    {
      onShow: (instance) => closeModalOnEscape(instance),
      onClose: () => enableScroll(),
    }
  );

  modalOverlay.show();
};

const closeModalOnEscape = function (modal) {
  const onModalEscapeClick = function (e) {
    if (e.key !== "Escape") {
      return;
    }

    document.removeEventListener("keydown", onModalEscapeClick);
    modal.close();
  };

  disableScroll();
  document.addEventListener("keydown", onModalEscapeClick);
};

const disableScroll = function () {
  body.classList.add("disable-scroll");
};

const enableScroll = function () {
  body.classList.remove("disable-scroll");
};

const body = document.body;
const galleryListRef = document.querySelector(".gallery");

const galleryMarkup = createMarkup(galleryItems);

galleryListRef.innerHTML = galleryMarkup;
galleryListRef.addEventListener("click", onGalleryListClick);
