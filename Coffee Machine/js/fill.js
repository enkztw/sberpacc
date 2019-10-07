const water = document.getElementById(`water`);
const cup = document.querySelector(`.machine__cup`);

const price = document.querySelector(`.price .value`);
const smallCups = document.querySelector(`.cup--small b`);
const bigCups = document.querySelector(`.cup--big b`);
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
    cup.classList.add(`machine__cup--filled`);
    if (fillMl <= CUP.small.ml) {
        --CUP.small.amount;
        smallCups.textContent = CUP.small.amount;
    } else {
        --CUP.big.amount;
        bigCups.textContent = CUP.big.amount;
    }
};

const onDrinkCreated = () => {
    water.style.transitionDuration = `2s`;
    cup.classList.add(`machine__cup--filled`);
    removeCup();
};

const createDrink = () => {
    const creationTimeMap = {
        'default': 3,
        'author': 5,
        'custom': 8,
    };

    let currentFill = 0;
    let currentPercent = 0;
    
    water.style.transitionDuration = `0s`;
    water.style.transform = `translate(0, 110%)`;
    machineCounter.textContent = `0ML`;


    console.log(fillPercent);
    console.log(fillMl);


    const animateFrame = () => {
        if (currentFill < fillMl) {
            ++currentFill;
            currentPercent += (fillPercent + 10) / fillMl;
            water.style.transform = `translate(0, ${110 - currentPercent}%)`;
            machineCounter.textContent = `${currentFill}ML`;
        } else {
            onDrinkCreated();
            clearInterval(frameInterval);
        }
    };

    const frameInterval = setInterval(animateFrame, creationTimeMap[currentDrink.type] * 1000 / fillMl);

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
};


// const interval = setInterval(() => {
//     percent++;

//     water.style.transform = `translate(0, ${100 - percent}%)`;
//     if (percent === 100) {
//         clearInterval(interval);
//     }

//     console.log(percent);
// }, 60);

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
        currentDrink.type ? `` : currentDrink.type = 'default';
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
    enable([...drinkButtons, milkButton]);
    disable([payButton, resetButton, syrupButton]);
    unselect([...drinkButtons, milkButton, syrupButton]);

    dumpDrink();
};

const onPayClick = () => {
    // onResetClick();
    disable([payButton, resetButton, syrupButton, milkButton, ...customDrinks, ...defaultDrinks]);

    console.log(currentDrink);
    createDrink();

};

drinkButtons.forEach((drinkButton) => drinkButton.addEventListener(`click`, onDrinkClick));
additionalButtons.forEach((additionalButton) => additionalButton.addEventListener(`click`, onAdditionalClick));
resetButton.addEventListener(`click`, onResetClick);
payButton.addEventListener(`click`, onPayClick);

checkSpace();