'use strict';

const MIN_PRICE = 250000;
const MAX_PRICE = 2000000;
const MIN_SELLER_RATING = 0;
const MAX_SELLER_RATING = 5;
const ADDRESS_MIN_BUILDING = 1;
const ADDRESS_MAX_BUILDING = 40;
const MIN_AREA = 30;
const MAX_AREA = 250;
const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 7;
const MIN_IMAGE_COUNT = 1;
const MAX_IMAGE_COUNT = 4;
const COUNT_CARDS = 7;
const CATEGORY = 'Недвижимость';
const MAX_DAYS_BEFORE = 518400000;
const YESTERDAY = 86400000;
const BEFORE_YESTERDAY = 172800000;

var mySlider = new rSlider({
  target: '#sampleSlider',
  values: [10000, 1000000],
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 10000
});

const nameArray = [
  'Двушка в центре Питера',
  'Однушка в спальнике Питера',
  'Трешка рядом с Кремлем',
  'Студия для аскетов',
  'Апартаменты для фрилансера'
];
const descriptionArray = [
  'Студия с лаконичным дизайном возле Ангары.',
  'Трёхкомнатная квартира для большой семьи рядом с Кремлём.',
  '2 минуты до набережной и прекрасного вида на Волгу.',
  'В квартире есть сауна, джакузи и домашний кинотеатр.Перепланировка согласована.',
  'Уютная однушка в тихом спальном районе. Рядом лес и озёра.'
];
const photosArray = [
  'apt_1.png',
  'apt_2.png',
  'apt_3.png',
  'apt_4.png',
  'apt_5.png',
  'apt_6.png',
  'house_1.png',
  'house_2.png',
  'house_3.png',
  'house_4.png'
];
const cityArray = ['Иркутск', 'Москва', 'Красноярск', 'Минск'];
const streetArray = [
  'ул. Шахтеров',
  'ул. Полярная',
  'ул. Лиственная',
  'ул. Мира',
  'ул. Советская'
];
const typeArray = ['house', 'apartament', 'flat'];
const fullNameArray = [
  'Бюро Семёна',
  'Игнат-Агент',
  'Виталий Петрович',
  'Марья Андреевна'
];
const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

const getRandom = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const getTeg = (textTeg) =>{
  const div = document.createElement('div');
  div.insertAdjacentHTML("beforeEnd", textTeg);
  return div.firstElementChild;
}

const cards = [];

const photosArrayGenerate = () => {
  const photos = [];
  for (let index = 0; index < getRandom(MIN_IMAGE_COUNT, MAX_IMAGE_COUNT); index++) {
    photos.push(`img/${photosArray[getRandom(0, photosArray.length - 1)]}`);
  }
  return photos;
}

const getNumbersDate = () =>{
  const date = Date.now();
  const randomDate = getRandom(0, MAX_DAYS_BEFORE);
  return date - randomDate;
}

const getCardsDate = (card) => {
  const date = Date.now();
  if (card <= date && card > date - YESTERDAY) {
    return "Сегодня";
  } else
  if (card <= date - YESTERDAY && card > date - BEFORE_YESTERDAY) {
    return "Вчера";
  }else
  {
    return `${new Date(card).getDay() + 1} ${months[new Date(card).getMonth()]} ${new Date(card).getFullYear()} года`;
  }
}

for (let i = 0; i < COUNT_CARDS; i++) {
  cards.push({
    name: nameArray[getRandom(0, nameArray.length - 1)],
    description: descriptionArray[getRandom(0, descriptionArray.length - 1)],
    price: getRandom(MIN_PRICE, MAX_PRICE),
    category: CATEGORY,
    seller: {
      fullname: fullNameArray[getRandom(0, fullNameArray.length - 1)],
      rating: getRandom(MIN_SELLER_RATING, MAX_SELLER_RATING * 10) / 10
    },
    photos: photosArrayGenerate(),
    address: {
      city: cityArray[getRandom(0, cityArray.length - 1)],
      street: streetArray[getRandom(0, streetArray.length - 1)],
      building: getRandom(ADDRESS_MIN_BUILDING, ADDRESS_MAX_BUILDING)
    },
    filters: {
      type: typeArray[getRandom(0, typeArray.length - 1)],
      area: getRandom(MIN_AREA, MAX_AREA),
      roomsCount: getRandom(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT)
    },
    publishDate: getNumbersDate()
  });
}

console.log(cards);

//2 task

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const cardInsert = (cards) => {
    const textTeg =
    `<li class="results__item product">
      <button class="product__favourite fav-add" type="button" aria-label="Добавить в избранное">
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
            stroke="white" stroke-width="2" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="product__image">
        <img src="${cards.photos[0]}" width="318" height="220" alt="${cards.name}">
      </div>
        <div class="product__content">
          <h3 class="product__title">
            <a href="#">${cards.name}</a>
          </h3>
        <div class="product__price">${numberWithSpaces(cards.price)} ₽</div>
        <div class="product__address">${cards.address.city}, ${cards.address.street}</div>
        <div class="product__date">${getCardsDate(cards.publishDate)}</div>
      </div>
    </li>
    `;
  return textTeg;
};

const cardEvent = (cards) => {
  const textTeg = `
  <div class="popup__inner">
    <button class="popup__close" type="button" aria-label="Закрыть">
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"/>
      </svg>
    </button>
    <div class="popup__date">${getCardsDate(cards.publishDate)}</div>
    <h3 class="popup__title">${cards.name}</h3>
    <div class="popup__price">${numberWithSpaces(cards.price)} ₽</div>
    <div class="popup__columns">
      <div class="popup__left">
        <div class="popup__gallery gallery">
          <button class="gallery__favourite fav-add">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="gallery__main-pic">
            <img src="${cards.photos[0]}" width="520" height="340" alt="${cards.name}">
          </div>
          <ul class="gallery__list">
            <li class="gallery__item gallery__item--active">
              <img src="img/house_1.png" width="124" height="80" alt="Загородный дом">
            </li>
            <li class="gallery__item">
              <img src="img/house_2.png" width="124" height="80" alt="Загородный дом">
            </li>
            <li class="gallery__item">
              <img src="img/house_3.png" width="124" height="80" alt="Загородный дом">
            </li>
            <li class="gallery__item">
              <img src="img/house_4.png" width="124" height="80" alt="Загородный дом">
            </li>
          </ul>
        </div>
        <ul class="popup__chars chars">
          <li class="chars__item">
            <div class="chars__name">Площадь</div>
            <div class="chars__value">${cards.filters.area}</div>
          </li>
          <li class="chars__item">
            <div class="chars__name">Количество комнат</div>
            <div class="chars__value">${cards.filters.roomsCount}</div>
          </li>
          <li class="chars__item">
            <div class="chars__name">Тип недвижимости</div>
            <div class="chars__value">${cards.filters.type}</div>
          </li>
        </ul>
        <div class="popup__seller seller seller--good">
          <h3>Продавец</h3>
          <div class="seller__inner">
            <a class="seller__name" href="#">${cards.seller.fullName}</a>
            <div class="seller__rating"><span>${cards.seller.rating}</span></div>
          </div>
        </div>
        <div class="popup__description">
          <h3>Описание товара</h3>
          <p>${cards.description}</p>
        </div>
      </div>
      <div class="popup__right">
        <div class="popup__map">
          <img src="img/map.jpg" width="268" height="180" alt="${cards.address.city}, ${cards.address.street}, дом ${cards.address.building}">
        </div>
        <div class="popup__address">${cards.address.city}, ${cards.address.street}, дом ${cards.address.building}</div>
      </div>
    </div>
  </div>
`;
  return textTeg;
};

const productGaleryImage = (photoLink, alt) =>{ 
  const textTeg = 
  `
    <li class="gallery__item">
      <img src="${photoLink}" width="124" height="80" alt="${alt}">
    </li>
  `;
  return textTeg;
};

let cardsSortCopyArr = cards.slice();
const catalogList = document.querySelector('.results__list');

const renderCatalogList = () => {
  const fragment = document.createDocumentFragment();
  cardsSortCopyArr.slice(0, COUNT_CARDS).forEach((it) => {
    fragment.appendChild(getTeg(cardInsert(it)));
  });

  catalogList.innerHTML = '';
  catalogList.appendChild(fragment);
};

renderCatalogList();

const modal = document.querySelector(".popup");
const productImages = document.querySelectorAll(".product__image");
const productTitles = document.querySelectorAll(".product__title");

const renderPhotos = (modalElementData) => {
  const modalGalery = modal.querySelector(".gallery__list");
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < modalElementData.photos.length; index++) {
    fragment.appendChild(getTeg(productGaleryImage(modalElementData.photos[index],modalElementData.name)));
  }
  modalGalery.innerHTML = '';
  modalGalery.appendChild(fragment);
};

const addListenerOnGalery = () =>{
  const galeryImages = modal.querySelectorAll(".gallery__item");
  const galeryMainImage = modal.querySelector(".gallery__main-pic");

  galeryImages[0].classList.add("gallery__item--active");

  for (let index = 0; index < galeryImages.length; index++) {
    galeryImages[index].addEventListener('click', (evt) => {
        if (!galeryImages[index].classList.contains("gallery__item--active")) {
          for (let index = 0; index < galeryImages.length; index++) {
            galeryImages[index].classList.remove("gallery__item--active");
          }
          galeryImages[index].classList.add("gallery__item--active");
          galeryMainImage.firstElementChild.src = galeryImages[index].firstElementChild.src;
        }
    })
  }
};

const renderModalItemData = (index) =>{
  const fragment = document.createDocumentFragment();
  fragment.appendChild(getTeg(cardEvent(cardsSortCopyArr[index])));

  modal.innerHTML = '';
  modal.appendChild(fragment);
  renderPhotos(cardsSortCopyArr[index]);
  addListenerOnGalery();
};

const findCloseButton = () => {
  const modalCloseBtn = modal.querySelector(".popup__close");
  return modalCloseBtn;
};

const openModal = () => {
  modal.classList.add("popup--active");
};

const closeModal = () => {
  modal.classList.remove("popup--active");
};

const onCloseBtnClick = () => {
  removeModalListeners(findCloseButton());
  closeModal();
};

const onShowClick = (index) => {
  renderModalItemData(index);
  initModalListeners(findCloseButton());
  openModal();
};

const onModalMoveOutClose = () => {
  document.removeEventListener('keydown',onModalKeyDownClose);
  document.removeEventListener('mouseout',onModalMoveOutClose);
}

const onModalKeyDownClose = (evt) => {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    onCloseBtnClick();
  };
}

const onCloseBtnMove = (evt) => {
  document.addEventListener('keydown',onModalKeyDownClose);
  document.addEventListener('mouseout',onModalMoveOutClose);
}

const onModalKeyDown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    onCloseBtnClick();
  };
};

const onModalOutLineClick = (evt) =>{
  if (evt.target === modal) {
      onCloseBtnClick();
  }
};

const removeModalListeners = (modalCloseBtn) => {
    modalCloseBtn.removeEventListener("click",onCloseBtnClick);
    modalCloseBtn.removeEventListener("mouseover",onCloseBtnMove);
    document.removeEventListener('keydown',onModalKeyDown); 
    window.removeEventListener("click",onModalOutLineClick);
};
const initModalListeners = (modalCloseBtn) => {  
    modalCloseBtn.addEventListener("click",onCloseBtnClick);
    modalCloseBtn.addEventListener("mouseover",onCloseBtnMove);
    document.addEventListener('keydown',onModalKeyDown); 
    window.addEventListener("click",onModalOutLineClick);
};

for (let index = 0; index < productTitles.length; index++) {
  productTitles[index].addEventListener('click', (evt) => {
    onShowClick(index);
  })
  productImages[index].addEventListener('click', (evt) => {
    onShowClick(index);
  })
}