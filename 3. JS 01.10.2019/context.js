const van = {
    name: `КоФе На КоЛеСаХ`,
    makeADrink() {
        console.log(`"${this.name}" уже приступил к выполнению заказа`)
    }
}

van.makeADrink();

// GLOBAL EXECUTION CONTEXT
const drink = `Латте с ванильным сиропом`;

function makeADrink() {
    const ingridients = [`зерна`, `молоко`, `сироп`];
    console.log(`Начинаем готовить ${this.drink} со следующими ингридиентами: ${ingridients.join(`, `)}.`);
}

makeADrink();

// OBJECT LEVEL EXECUTION CONTEXT
const hangover = {
    drink: `Ирландский кофе`,
    makeADrink() {
        console.log(`Начинаем готовить лучший ${this.drink.toLowerCase()} в городе.`)
    }
}

hangover.makeADrink();

// MISSING CONTEXT
const hipsterElite = {
    drink: `Кислородный коктейль`,
    makeADrink() {
        console.log(`Начинаем готовить почти лучший ${this.drink.toLowerCase()} в городе.`);
    }
}

// Ooops undefined trying to get window.drink
const firstHipsterTry = hipsterElite.makeADrink;
// firstHipsterTry();

const secondHipsterTry = hipsterElite.makeADrink.bind(hipsterElite);
secondHipsterTry();

const vegansMafia = {
    drink: `Томатный сок`,
    ingridients: [`Петрушка`, `Томат`, `Сельдерей`],
    whatInside() {
        this.ingridients.forEach((item) => console.log(`В составе ${this.drink} есть Дон ${item}.`));
    }
}

vegansMafia.whatInside();