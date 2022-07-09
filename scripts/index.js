
//HOMEWORK N7

const sideButton = document.querySelectorAll('.leftbar-nav__side-button');
const nestedMenu = document.querySelectorAll('.leftbar-nav__items_nested');
const nestedContainer = document.querySelectorAll('.leftbar-nav__item-container');

function toggleNestedMenus() {
  function toggleNestedMenu(i) {
    sideButton[i].classList.toggle('leftbar-nav__side-icon_active');
    nestedMenu[i].classList.toggle('leftbar-nav__items_nested_hidden');
  }

  for(let i = 0; i<nestedContainer.length; i++) {
    nestedContainer[i].addEventListener('click', () => {
      toggleNestedMenu(i)
    });
  }
};

toggleNestedMenus();



//HOMEWORK N8



const elementTemplate = document.querySelector('.element__template'); //template-элемент с шаблоном карточки
const cardsContainer = document.querySelectorAll('.quests-container__inline'); //находим контейнер для карточек

//функция создания карточки
function createCard(data) {
  const newCard = elementTemplate.content.cloneNode(true); //копируем template-элемент с содержимым
  const elementPicture = newCard.querySelector('.quest__image');

  elementPicture.src = data.link; //находим src картинки и вставляем ссылку из массива
  elementPicture.alt = data.title; //находим alt картинки и вставляем имя из массива

  newCard.querySelector('.quest__title').textContent = data.title; //находим заголовок и вставляем title из массива
  newCard.querySelector('.quest__subtitle').textContent = data.subtitle; //находим подзаголовок и вставляем subtitle из массива
  newCard.querySelector('.quest__date').textContent = data.date; //находим дату и вставляем date из массива

  return newCard;
}

//функция добавления карточек
function addCard (cards, i){
  const newCards = createCard(cards);
  cardsContainer[i].prepend(newCards);
}

//фильтр для групп лекций
function filter(n1, n2) {
  return initialCards.filter((elem) => {
    if (elem.title === n1 || elem.title === n2) {
      return elem;
    };
  });
}

//добавлем карточки из массива на страничку
function addCards(data, i) {
  data.map((item) => {
    addCard(item, i);
  });
}

//проходимся по всем блокам и вставляем карточки
for (let i = 0; i < cardsContainer.length; i++){
  if (i === 1) {
    addCards(filter('JavaScript', 'React'), i);
  } else if (i === 2) {
    addCards(filter('CSS', 'HTML'), i);
  } else {
    addCards(initialCards, i)
  }
}


// //находим все карточки на странице, берем нужные нам поля и складываем в объект
// const allCards =  document.querySelectorAll('.quest');
// let cardsArray = [];

// function addCards(data) {
//   for(let i = 0; i < data.length; i++){
//     cardsArray[i] = {title: '', subtitle: '', link: '', date: ''}
//     cardsArray[i].title = data[i].querySelector('.quest__title').textContent;
//     cardsArray[i].subtitle = data[i].querySelector('.quest__subtitle').textContent;
//     cardsArray[i].date = data[i].querySelector('.quest__date').textContent;
//     cardsArray[i].link = data[i].querySelector('.quest__image').src;
//   }
//   return cardsArray;
// }
// const updatedCards = addCards(allCards);

// //добавлем карточки из массива на страничку
// updatedCards.map(addCard);



// cлайдер
const sliderLine = document.querySelectorAll('.quests-container__inline');
const leftButton = document.querySelectorAll('.side-button_left');
const rightButton = document.querySelectorAll('.side-button_right');

function slider(length, i) {
  let count = 0;
  const sliderLineWidth = length * 265 - 10;
  sliderLine[i].style.width = sliderLineWidth + 'px';
  leftButton[i].addEventListener('click', function() {
    count += 265;
    if(count > 0) {
      count -= 265;
    }
    sliderLine[i].style.left = count + 'px';
  });

  rightButton[i].addEventListener('click', function() {
    count -= 265;
    if(count +20 <= -sliderLineWidth + (265 *  4)) {
      count += 265;
    }
    sliderLine[i].style.left = count + 'px';
  });
}

//слайдер для каждой группы с фильтрацией
for(let i = 0; i<sliderLine.length; i++) {
  function addSlider() {
    if (sliderLine[i].classList.contains('all')) {
      slider(initialCards.length, i)
    } else if (sliderLine[i].classList.contains('js')) {
      const jsrCards = filter('JavaScript', 'React');
      slider(jsrCards.length, i)
    } else {
      const hsCards = filter('CSS', 'HTML');
      slider(hsCards.length, i)
    }
  }
  addSlider()
}

//вывод количества карточек
const allLectures = document.querySelector('.weekly-quests__button_all')
function addNumberCards() {
  function endOfWord(length) {
    const num = length.toString().slice(-1);
    if (length === 1 || (length > 20 && num === '1')) {
      return "лекция";
    } else if ((length > 1 && length < 5) || (length >= 22 && ( num === '2' || num === '3' || num === '4' ))) {
      return "лекции";
    } else {
      return "лекций";
    }
  }
  allLectures.textContent = initialCards.length + ' ' + endOfWord(initialCards.length);
}
addNumberCards()

//фильтрация в группе все лекции

const lectureBtns = document.querySelector('.weekly-quests__btns-container');

lectureBtns.addEventListener('click', (evt) => {
  const name = evt.target.textContent;
  if (name === 'HTML' || name === 'CSS' || name === 'JavaScript') {
    cardsContainer.innerHTML = '';
    sliderLine[0].style.left = 0 + 'px';
    addCards(filter(name), 0);
    slider(filter(name).length, 0);
  } else if(name) {
    cardsContainer.innerHTML = '';
    addCards(initialCards, 0)
    slider(initialCards.length, 0);
  }

  const questTitle = document.querySelectorAll('.quest__title');
  const questSubtitle = document.querySelectorAll('.quest__subtitle');
  changeText(questTitle, questSubtitle);
});



//HOMEWORK N9




const createLecturesObj = () => {
  let lecturesObj = {}
  for (let i = 0; i<initialCards.length; i++){
    let lecturesGroup = initialCards[i].data_group;
    let lection = {
      title: initialCards[i].title,
      description: initialCards[i].subtitle,
      date: initialCards[i].date,
      image: initialCards[i].link,
      label: "лекция",
   }
    if (!lecturesObj[lecturesGroup]){
      lecturesObj[lecturesGroup] = [lection];
    } else {
      lecturesObj[lecturesGroup].push(lection);
    }
  }
  console.log(lecturesObj);
  return lecturesObj;
}

const lecturesObj = createLecturesObj();


//HOMEWORK N6


const questTitle = document.querySelectorAll('.quest__title');
const questSubtitle = document.querySelectorAll('.quest__subtitle');

function changeText(titles, subtitles) {
  Array.from(titles).map((el) => {
    el.textContent = el.textContent.toUpperCase();
  })

  Array.from(subtitles).map((el) => {
    if(el.textContent.length >= 20) {
      el.textContent = el.textContent.slice(0, 20) + '...';
    }
  })
}

changeText(questTitle, questSubtitle);
