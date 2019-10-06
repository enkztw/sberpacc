const cup = document.querySelector(`.machine__fill`);
const water = document.getElementById(`water`);
const drinksButtons = document.querySelectorAll(`.drink`);
const additionalButtons = document.querySelectorAll(`.additional`);
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
}

const drinks = {
    'espresso': {
        'ml': 100
    },
    'latte': {
        'ml': 250
    },
    'cappuccino': {
        'ml': 250
    },
    'banana latte': {
        'ml': 300
    },
    'vanilla cappuccino': {
        'ml': 300
    },
    'flat white': {
        'ml': 280
    }
}

let currentDrink = ``;
let fillPercent = 0;
let fillMl = 0;


const disableDrinks = (items) => items.forEach((item) => item.classList.add(`disabled`));
const enableAdditionals = (items) => items.forEach((item) => item.classList.remove(`disabled`));

const onDrinkButtonClick = (evt) => {
    if (!currentDrink) {
        const drinkButton = evt.target;
        const drinkName = drinkButton.getAttribute(`data-name`);
        const drinkAmount = drinks[drinkName].ml;

        currentDrink = drinkName;
        fillMl += drinkAmount;
        fillPercent += 100 / CUP.big.ml * drinkAmount;

        enableAdditionals(additionalButtons);
        disableDrinks(drinksButtons);

        drinkButton.classList.remove(`disabled`);
        drinkButton.classList.add(`drink--selected`);

        machineCounter.textContent = `${fillMl}ML`;
        water.style.transform = `translate(0, ${100 - fillPercent}%)`;
    }
};

drinksButtons.forEach((drinkButton) => drinkButton.addEventListener(`click`, onDrinkButtonClick));

// const interval = setInterval(() => {
//     percent++;

//     water.style.transform = `translate(0, ${100 - percent}%)`;
//     if (percent === 100) {
//         clearInterval(interval);
//     }

//     console.log(percent);
// }, 60);