'use strict';

var mySlider = new rSlider({
  target: '#sampleSlider',
  values: [10000, 1000000],
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 10000
});

const estateObject = 7;
const category = 'Недвижимость';

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

const objectArray = [];
const photos = [];


for (let index = 0; index < getRandom(1, 4); index++) {
  photos[index] = `img/${photosArray[getRandom(0, photosArray.length - 1)]}`;
}

for (let i = 0; i < estateObject; i++) {
  objectArray.push(createObject());
}

function createObject() {
  const object = {
    name: nameArray[getRandom(0, nameArray.length - 1)],
    description: descriptionArray[getRandom(0, descriptionArray.length - 1)],
    price: getRandom (250000, 2000000),
    category: category,
    seller: {
      fullname: fullNameArray[getRandom(0, fullNameArray.length - 1)],
      rating: Math.ceil(getRandomFloat(0,5) * 10) / 10
    },
    photos: photos[getRandom(0, photos.length - 1)],
    address: {
      city: cityArray[getRandom(0, cityArray.length - 1)],
      street: streetArray[getRandom(0, streetArray.length -1)],
      building: getRandom(1, 40)
    },
    filters: {
      type: typeArray[getRandom(0, typeArray.length - 1)],
      area: getRandom(30, 250),
      'rooms-count': getRandom(1, 7)
    },
    'publish-date': Date.now()
  };
  return object;
}

console.log(objectArray);


function getRandom(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}