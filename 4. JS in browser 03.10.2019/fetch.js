/** Создать простую страничку которая выводит в выпадающий список
 * всех персонажей (people) с name 'Cat' по запросу https://ghibliapi.herokuapp.com/species
 * для начала, пусть в значении опции будет просто порядковый номер.
 * после выбора опции, отсылается запрос на url https://ghibliapi.herokuapp.com/people/{id}
 * внизу появляется информация о персонаже -
 * // name, eye_color, gender, films
 * а так же изображение (случайное с unsplash)
 * https://ghibliapi.herokuapp.com/#
 **/

const MAX_PLAYERS_ON_BOARD = 5;

const charControls = document.querySelector(`.chars__controls`);
const charsList = document.querySelector(`.chars-list`);
const charImage = document.querySelector(`.char__image`);

const playersSection = document.querySelector(`.players`);
const playersList = playersSection.querySelector(`.players-list`);

const infoSection = document.querySelector(`.info`);
const infoList = infoSection.querySelector(`.info-list`);

// DOM operations for chars
const createChar = (char) => {
    const charItem = document.createElement(`li`);
    charItem.classList.add(`chars-list__item`);

    const charInput = document.createElement(`input`);
    charInput.type = 'radio';
    charInput.name = `char`;
    charInput.id = char.id;
    charInput.setAttribute(`data-name`, char.name);

    const charLabel = document.createElement(`label`);
    charLabel.textContent = char.name;
    charLabel.setAttribute(`for`, char.id);

    charItem.append(charInput);
    charItem.append(charLabel);


    charItem.addEventListener(`click`, async () => {
        await renderCharImage(char.name);
        renderItems(playersList, char.people.slice(0, MAX_PLAYERS_ON_BOARD), createPlayer);
        playersSection.classList.remove(`none`);
        infoSection.classList.add(`none`);
    });

    return charItem;
}

const createPlayer = (player, index) => {
    const playerItem = document.createElement(`li`);
    playerItem.classList.add(`players-list__item`);


    const playerInput = document.createElement(`input`);
    playerInput.type = 'radio';
    playerInput.name = `player`;
    playerInput.id = player;

    const playerLabel = document.createElement(`label`);
    playerLabel.textContent = `Player №${parseInt(index) + 1}`;
    playerLabel.setAttribute(`for`, player);

    playerItem.append(playerInput);
    playerItem.append(playerLabel);

    playerItem.addEventListener(`click`, async () => {
        await getPlayerStats(player);
        playersSection.classList.add(`none`);
        infoSection.classList.remove(`none`);
    });

    return playerItem;
}

const createStats = (stats) => {
    infoList.innerHTML = ``;
    const fragment = document.createDocumentFragment();

    for (let [stat, value] of Object.entries(stats)) {
        const statElement = document.createElement(`li`);
        const statKeyElement = document.createElement(`span`);
        const statInfoElement = document.createElement(`span`);

        statElement.classList.add(`info-list__item`);
        statKeyElement.classList.add(`key`);
        statKeyElement.textContent = `${stat}: `;
        statInfoElement.textContent = value;

        statElement.append(statKeyElement);
        statElement.append(statInfoElement);

        fragment.append(statElement);
    }

    return fragment;
}



const renderItems = (list, items, create) => {
    list.innerHTML = ``;

    const fragment = document.createDocumentFragment();

    for (const [index, item] of Object.entries(items)) {
        fragment.append(create(item, index));
    }

    list.append(fragment);
}



async function renderCharImage(name) {
    const preloadedImage = await loadImage(`https://source.unsplash.com/200x200/?${name}`);
    charImage.src = URL.createObjectURL(preloadedImage);
};


// Data operations for chars
async function loadImage(url) {
    const image = await fetch(url);

    return image.blob();
}

async function getAllChars() {
    try {
        const rawData = await fetch('https://ghibliapi.herokuapp.com/species');
        const data = await rawData.json();

        console.log(data);
        renderItems(charsList, data, createChar);
    } catch (err) {
        console.log(err);
    }
};

async function getPlayerStats(url) {
    try {
        const rawData = await fetch(url);
        const data = await rawData.json();

        infoList.append(createStats(data));
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};


getAllChars();