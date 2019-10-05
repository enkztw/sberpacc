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
    const charTemplate = document.querySelector(`#char-template`).content.querySelector(`.chars-list__item`);
    const charItem = charTemplate.cloneNode(true);
    const charInput = charItem.querySelector(`input`);
    const charLabel = charItem.querySelector(`label`);

    charInput.id = char.id;
    charInput.setAttribute(`data-name`, char.name);

    charLabel.textContent = char.name;
    charLabel.setAttribute(`for`, char.id);


    charItem.addEventListener(`click`, async () => {
        const image = await dataService.getCharImage(char.name);
        charImage.src = URL.createObjectURL(image);
        console.log(image);
        renderItems(playersList, char.people.slice(0, MAX_PLAYERS_ON_BOARD), createPlayer);
        playersSection.classList.remove(`none`);
        infoSection.classList.add(`none`);
    });

    return charItem;
}

const createPlayer = (player, index) => {
    const playerTemplate = document.querySelector(`#player-template`).content.querySelector(`.players-list__item`);
    const playerItem = playerTemplate.cloneNode(true);
    const playerInput = playerItem.querySelector(`input`);
    const playerLabel = playerItem.querySelector(`label`);

    playerInput.id = player;

    playerLabel.textContent = `Player №${parseInt(index) + 1}`;
    playerLabel.setAttribute(`for`, player);

    playerItem.addEventListener(`click`, async () => {
        const stats = await dataService.getPlayerStat(player);

        renderItems(infoList, Object.entries(stats), createStat);
        playersSection.classList.add(`none`);
        infoSection.classList.remove(`none`);
    });

    return playerItem;
}

const createStat = ([key, value]) => {
    if ([`name`, `eye_color`, `gender`, `films`].some((item) => item === key)) {
        const statTemplate = document.querySelector(`#stat-template`).content.querySelector(`.info-list__item`);
        const statItem = statTemplate.cloneNode(true);
        const statKey = statItem.querySelector(`.key`);
        const statValue = statItem.querySelector(`.value`);

        statKey.textContent = `${key}: `;
        statValue.textContent = value;

        return statItem;
    }

    return ``;
}

// Render multiple items in list w/ a callback
const renderItems = (list, items, createItem) => {
    list.innerHTML = ``;

    const fragment = document.createDocumentFragment();

    for (const [index, item] of Object.entries(items)) {
        fragment.append(createItem(item, index));
    }

    list.append(fragment);
}

// Data operations
const dataService = {
    async getAllChars() {
        const response = await fetch('https://ghibliapi.herokuapp.com/species');
        const data = await response.json();

        return data;
    },
    async getCharImage(name) {
        const image = await fetch(`https://source.unsplash.com/200x200/?${name}`);

        return image.blob();
    },
    async getPlayerStat(url) {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }
};

// Controller
async function main() {
    try {
        const chars = await dataService.getAllChars();
        renderItems(charsList, chars, createChar);
    } catch (error) {
        throw new Error(error);
    }
}

main();