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

const photosArrayGenerate = () => {
  const photos = [];
  for (let index = 0; index < getRandom(MIN_IMAGE_COUNT, MAX_IMAGE_COUNT); index++) {
    photos.push(`img/${photosArray[getRandom(0, photosArray.length - 1)]}`);
  }
  return photos;
}


const cards = [];

const getCards = () => {
  const date = Date.now();
  const lastDate = date - MAX_DAYS_BEFORE;
  const card = getRandom(lastDate, date);
  let cardStr;
  if (card<=date && card>date-YESTERDAY) {
    cardStr = "Сегодня";
  } else
  if (card<=date-YESTERDAY && card>date-BEFORE_YESTERDAY) {
    cardStr = "Вчера";
  }else
  {
    cardStr = `${new Date(card).getDay() + 1} ${months[new Date(card).getMonth()]} ${new Date(card).getFullYear()} года`;
  }
  return cardStr;
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
      building: 'д. ' + getRandom(ADDRESS_MIN_BUILDING, ADDRESS_MAX_BUILDING)
    },
    filters: {
      type: typeArray[getRandom(0, typeArray.length - 1)],
      area: getRandom(MIN_AREA, MAX_AREA),
      roomsCount: getRandom(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT)
    },
    publishDate: getCards()
  });
}

console.log(cards);

//2 task

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const cardInsert = (cards) => {
    const li = document.createElement('li');
    li.classList.add('product');
    li.classList.add('results__item');
    li.innerHTML =
    `
      <button class="product__favourite fav-add" type="button" aria-label="Добавить в избранное">
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
            stroke="white" stroke-width="2" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="product__image">
        <img src="${cards.photos[0]}" width="318" height="220" alt="${cards.description}">
      </div>
        <div class="product__content">
          <h3 class="product__title">
            <a href="#">${cards.name}</a>
          </h3>
        <div class="product__price">${numberWithSpaces(cards.price)} ₽</div>
        <div class="product__address">${cards.address.city}, ${cards.address.street}</div>
        <div class="product__date">${cards.publishDate}</div>
      </div>
    `;
  return li;
};


let productsSortCopyArr = cards.slice();
const catalogList = document.querySelector('.results__list');

const renderCatalogList = () => {
  const fragment = document.createDocumentFragment();
  productsSortCopyArr.slice(0, COUNT_CARDS).forEach((it) => {
    fragment.appendChild(cardInsert(it));
  });

  catalogList.innerHTML = '';
  catalogList.appendChild(fragment);
};

renderCatalogList();

const modal = document.querySelector(".popup");
const productImages = document.querySelectorAll(".product__image");
const productTitles = document.querySelectorAll(".product__title");
const productCloseBtn = document.querySelector(".popup__close");

const openModal = () => {
  modal.classList.add("popup--active");
};

const closeModal = () => {
  modal.classList.remove("popup--active");
};

const onCloseBtnClick = () => {
  closeModal();
  removeModalListeners();
};

const onShowClick = () => {
  openModal();
  initModalListeners();
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
  console.log(evt.target);
  if (evt.target === modal) {
      onCloseBtnClick();
  }
};

const removeModalListeners = () => {
    productCloseBtn.removeEventListener("click",onCloseBtnClick);
    productCloseBtn.removeEventListener("mouseover",onCloseBtnMove);
    document.removeEventListener('keydown',onModalKeyDown); 
    window.removeEventListener("click",onModalOutLineClick);
};
const initModalListeners = () => {  
    productCloseBtn.addEventListener("click",onCloseBtnClick);
    productCloseBtn.addEventListener("mouseover",onCloseBtnMove);
    document.addEventListener('keydown',onModalKeyDown); 
    window.addEventListener("click",onModalOutLineClick);
};
 

for (let index = 0; index < productTitles.length; index++) {
  productTitles[index].addEventListener('click', (evt) => {
    onShowClick();
  })
  productImages[index].addEventListener('click', (evt) => {
    onShowClick();
  })
}