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
const cityArray = ['Иркутск','Москва','Красноярск','Минск'];
const streetArray = [
  'ул. Шахтеров',
  'ул. Полярная',
  'ул. Лиственная',
  'ул. Мира',
  'ул. Советская'
];
const typeArray = ['house','apartament','flat'];
const fullNameArray = [
  'Бюро Семёна',
  'Игнат-Агент',
  'Виталий Петрович',
  'Марья Андреевна'
];

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

for (let i = 0; i < COUNT_CARDS; i++) {
  cards.push({
    name: nameArray[getRandom(0, nameArray.length - 1)],
    description: descriptionArray[getRandom(0, descriptionArray.length - 1)],
    price: getRandom (MIN_PRICE, MAX_PRICE),
    category: CATEGORY,
    seller: {
      fullname: fullNameArray[getRandom(0, fullNameArray.length - 1)],
      rating: getRandom(MIN_SELLER_RATING, MAX_SELLER_RATING * 10) / 10
    },
    photos: photosArrayGenerate(),
    address: {
      city: cityArray[getRandom(0, cityArray.length - 1)],
      street: streetArray[getRandom(0, streetArray.length -1)],
      building: getRandom(ADDRESS_MIN_BUILDING, ADDRESS_MAX_BUILDING)
    },
    filters: {
      type: typeArray[getRandom(0, typeArray.length - 1)],
      area: getRandom(MIN_AREA, MAX_AREA),
      'rooms-count': getRandom(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT)
    },
    'publish-date': new Date()
  });
}

console.log(cards);