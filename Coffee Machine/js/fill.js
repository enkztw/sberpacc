const water = document.getElementById(`water`);
const cup = document.querySelector(`.machine__cup`);

const price = document.querySelector(`.price .value`);
const cups = document.querySelectorAll(`.cup b`);
const [smallCups, bigCups] = cups;
const nameField = document.querySelector(`.name`);

const drinkButtons = document.querySelectorAll(`.drink`)
const defaultDrinks = document.querySelectorAll(`.drink--default`);
const customDrinks = document.querySelectorAll(`.drink--custom`);

const additionalButtons = document.querySelectorAll(`.additional`);
const [milkButton, syrupButton] = additionalButtons;

const payButton = document.querySelector(`.pay`);
const resetButton = document.querySelector(`.reset`);
const machineCounter = document.querySelector(`.machine__counter`);

const CUP = {
    'small': {
        'amount': 5,
        'ml': 250
    },
    'big': {
        'amount': 6,
        'ml': 380
    }
};

const drinks = {
    'espresso': {
        'ml': 100,
        'price': 90
    },
    'latte': {
        'ml': 250,
        'price': 130
    },
    'cappuccino': {
        'ml': 250,
        'price': 110
    },
    'banana latte': {
        'ml': 300,
        'price': 150
    },
    'vanilla cappuccino': {
        'ml': 300,
        'price': 150
    },
    'flat white': {
        'ml': 280,
        'price': 100
    },
    'milk': {
        'ml': 50,
        'price': 25
    },
    'syrup': {
        'ml': 50,
        'price': 35
    }
};

const creationTimeMap = {
    'default': 3,
    'author': 5,
    'custom': 8,
};

const timeouts = [];

const audio = new Audio('https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview124/v4/a5/4d/3f/a54d3fda-b83a-8225-0963-7a1439ee1778/mzaf_41300117649840229.plus.aac.p.m4a');
audio.volume = 0.25;
audio.currentTime = 5.8;

let currentDrink = {
    'base': {
        'name': null,
        'portion': 0,
    },
    'additionals': {
        'milk': 0,
        'syrup': 0
    },
    'type': null
};

let currentPrice = 0;
let fillPercent = 0;
let fillMl = 0;


const disable = (items) => items.forEach((item) => item.setAttribute(`disabled`, true));
const enable = (items) => items.forEach((item) => item.removeAttribute(`disabled`));
const unselect = (items) => items.forEach((item) => item.classList.remove(`selected`));

const fillDrink = (drinkAmount, drinkPrice) => {
    if (fillMl + drinkAmount <= CUP.big.ml) {
        currentPrice += drinkPrice;
        fillMl += drinkAmount;
        fillPercent += 100 / CUP.big.ml * drinkAmount;

        water.style.transform = `translate(0, ${100 - fillPercent}%)`;
        machineCounter.textContent = `${fillMl}ML`;
    }

    checkSpace();
    setName();
    setPrice();
};


const dumpDrink = () => {
    currentDrink.base.name = null;
    currentDrink.type = null;
    currentDrink.base.portion = 0;
    currentDrink.additionals.milk = 0;
    currentDrink.additionals.syrup = 0;

    currentPrice = 0;
    fillPercent = 0;
    fillMl = 0;

    water.style.transform = `translate(0, 110%)`;
    machineCounter.textContent = `${fillMl}ML`;
};


const removeCup = () => {
    if (fillMl <= CUP.small.ml && CUP.small.amount) {
        --CUP.small.amount;
        smallCups.textContent = CUP.small.amount;
    } else {
        --CUP.big.amount;
        bigCups.textContent = CUP.big.amount;
    }

    for (const [cup, props] of Object.entries(CUP)) {
        if (props.amount === 0) {
            eval(cup + `Cups`).classList.add(`empty`);
        }
    }
};

const onDrinkCreated = () => {
    water.style.transitionDuration = `2s`;
    cup.classList.add(`machine__cup--filled`);

    enable([cup]);
    removeCup();

    timeouts.push(setTimeout(() => {
        cup.classList.add(`machine__cup--waited`);
        audio.play();
    }, 5000));

    timeouts.push(setTimeout(() => onCupClick(), 20000));
};

const onDrinkRejected = () => cup.classList.add(`machine__cup--error`);

const checkSupply = (drink) => {
    const promise = new Promise((resolve, reject) => {
        if ((fillMl <= CUP.small.ml && CUP.small.amount)) {
            resolve(drink);
        } else if (fillMl <= CUP.big.ml && CUP.big.amount) {
            resolve(drink);
        }

        reject();
    });

    return promise;
};

const createDrink = (drink) => {
    const promise = new Promise((resolve, reject) => {
        let currentFill = 0;
        let currentPercent = 0;

        water.style.transitionDuration = `0s`;
        water.style.transform = `translate(0, 110%)`;
        machineCounter.textContent = `0ML`;


        const animateFrame = () => {
            if (currentFill < fillMl) {
                currentFill++;
                currentPercent += (fillPercent + 10) / fillMl;
                water.style.transform = `translate(0, ${110 - currentPercent}%)`;
                machineCounter.textContent = `${currentFill}ML`;
            } else {
                clearInterval(interval);
                resolve(drink);
            }
        };

        const interval = setInterval(animateFrame, creationTimeMap[drink.type] * 1000 / fillMl);
    });

    return promise;
};

const setPrice = () => price.textContent = currentPrice;

const setName = () => {
    const getAdditionalName = () => Object.values(currentDrink.additionals).reduce((milk, syrup) => `${milk ? `${milk}x MILK` : ``}${milk && syrup ? ` ` : ``}${syrup ? `${syrup}x SYRUP` : ``}`);

    const baseName = `${currentDrink.base.name ? `${currentDrink.base.portion}x ${currentDrink.base.name.toUpperCase()}` : ``}`;
    const additionalName = getAdditionalName();

    nameField.textContent = `${baseName}${baseName && additionalName ? ` & ` : ``}${additionalName ? `${additionalName}` : ``}`;
};

const checkSpace = () => {
    for (const [drinkName, props] of Object.entries(drinks)) {
        if (fillMl + props.ml > CUP.big.ml) {
            const drink = document.querySelector(`[data-name="${drinkName}"]`);
            disable([drink]);
        }
    }

    if (currentDrink.additionals.syrup >= 2) {
        disable([syrupButton]);
    }
};


const onCupClick = () => {
    cup.classList.remove(`machine__cup--filled`);
    cup.classList.remove(`machine__cup--waited`);

    audio.currentTime = 5.8;
    audio.pause();
    onResetClick();
    disable([cup]);

    timeouts.forEach((timeout) => clearTimeout(timeout));
};

const onDrinkClick = (evt) => {
    const drinkButton = evt.currentTarget;
    const drinkName = drinkButton.getAttribute(`data-name`);
    const drinkAmount = drinks[drinkName].ml;
    const drinkPrice = drinks[drinkName].price;

    currentDrink.base.name = drinkName;
    currentDrink.base.portion++;

    drinkButton.classList.add(`selected`);

    disable([...defaultDrinks, ...customDrinks]);
    enable([payButton, resetButton, drinkButton]);

    if (drinkButton.classList.contains(`drink--custom`)) {
        currentDrink.type = `author`;
        disable([milkButton]);
    } else {
        currentDrink.type ? currentDrink.type = 'custom' : currentDrink.type = 'default';
        enable([syrupButton]);
    }

    fillDrink(drinkAmount, drinkPrice);
};

const onAdditionalClick = (evt) => {
    const additionalButton = evt.currentTarget;
    const additionalName = additionalButton.getAttribute(`data-name`);
    const additionalAmount = drinks[additionalName].ml;
    const additionalPrice = drinks[additionalName].price;

    currentDrink.type = `custom`;
    currentDrink.additionals[additionalName]++;

    additionalButton.classList.add(`selected`);

    disable(customDrinks);
    enable([payButton, resetButton, syrupButton]);

    fillDrink(additionalAmount, additionalPrice);
};

const onResetClick = () => {
    nameField.textContent = ``;
    price.textContent = `0`;
    enable([...drinkButtons, milkButton]);
    disable([payButton, resetButton, syrupButton]);
    unselect([...drinkButtons, milkButton, syrupButton]);

    dumpDrink();
};

const onPayClick = () => {
    disable([payButton, resetButton, syrupButton, milkButton, ...customDrinks, ...defaultDrinks]);

    checkSupply(currentDrink)
        .then((drink) => createDrink(drink))
        .then(() => onDrinkCreated())
        .catch(() => onDrinkRejected());
};

drinkButtons.forEach((drinkButton) => drinkButton.addEventListener(`click`, onDrinkClick));
additionalButtons.forEach((additionalButton) => additionalButton.addEventListener(`click`, onAdditionalClick));
resetButton.addEventListener(`click`, onResetClick);
payButton.addEventListener(`click`, onPayClick);
cup.addEventListener(`click`, onCupClick);

checkSpace();