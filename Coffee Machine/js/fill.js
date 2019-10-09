const water = document.getElementById(`water`);
const cups = document.querySelectorAll(`.cup b`);
const [smallCups, bigCups] = cups;

const drinksList = [{
        'name': 'espresso',
        'ml': 100,
        'price': 90,
        'type': 'default'
    },
    {
        'name': 'latte',
        'ml': 250,
        'price': 130,
        'type': 'default'
    },
    {
        'name': 'cappuccino',
        'ml': 250,
        'price': 110,
        'type': 'default'
    },
    {
        'name': 'banana latte',
        'ml': 300,
        'price': 150,
        'type': 'authors'
    },
    {
        'name': 'vanilla cappuccino',
        'ml': 300,
        'price': 150,
        'type': 'authors'
    },
    {
        'name': 'flat white',
        'ml': 280,
        'price': 100,
        'type': 'authors'
    },
    {
        'name': 'milk',
        'ml': 50,
        'price': 25,
        'type': 'addition'
    },
    {
        'name': 'syrup',
        'ml': 50,
        'price': 35,
        'type': 'addition'
    }
];

const audio = new Audio('https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview124/v4/a5/4d/3f/a54d3fda-b83a-8225-0963-7a1439ee1778/mzaf_41300117649840229.plus.aac.p.m4a');
audio.volume = 0.05;
audio.currentTime = 5.8;

class Machine {
    constructor(drinksList) {
        this.currentDrink = {
            'name': null,
            'type': null,
            'percent': 0,
            'ml': 0,
            'price': 0,
            'additions': {
                'milk': 0,
                'syrup': 0
            }
        }

        this.board = {
            'name': document.querySelector(`.name`),
            'price': document.querySelector(`.price .value`),
            'counter': document.querySelector(`.machine__counter`)
        }

        this.controls = {
            'reset': document.querySelector(`.reset`),
            'pay': document.querySelector(`.pay`),
            'cup': document.querySelector(`.machine__cup`)
        }

        this.additions = {
            'milk': document.querySelector(`[data-name="milk"]`),
            'syrup': document.querySelector(`[data-name="syrup"]`)
        }

        this.cups = {
            'small': {
                'amount': 5,
                'ml': 250
            },
            'big': {
                'amount': 6,
                'ml': 380
            }
        }
        this.timeMap = {
            'default': 3,
            'author': 5,
            'custom': 8,
        }

        this.drinks = drinksList;
        this.timeouts = [];
        
        this.setCups = this.setCups.bind(this);
        this.createDrink = this.createDrink.bind(this);
        this.onDrinkCreated = this.onDrinkCreated.bind(this);
        this.onPayClick = this.onPayClick.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
        this.onCupClick = this.onCupClick.bind(this);

        this.bind();
    }

    bind() {
        this.controls.pay.addEventListener(`click`, this.onPayClick);
        this.controls.reset.addEventListener(`click`, this.onResetClick);
        this.controls.cup.addEventListener(`click`, this.onCupClick);
    }

    fillDrink = (amount, price) => {
        if (this.currentDrink.ml + amount <= this.cups.big.ml) {
            this.currentDrink.price += price;
            this.currentDrink.ml += amount;
            this.currentDrink.percent += 100 / this.cups.big.ml * amount;

            water.style.transform = `translate(0, ${100 - this.currentDrink.percent}%)`;
            this.board.counter.textContent = `${this.currentDrink.ml}ML`;
        }

        this.checkCupSpace();
        this.setPrice();
        this.setName();
    }

    disable(items) {
        return items.forEach((item) => item.setAttribute(`disabled`, true));
    }

    enable(items) {
        return items.forEach((item) => item.removeAttribute(`disabled`));
    }

    unselect(items) {
        return items.forEach((item) => item.classList.remove(`selected`));
    }

    select(items) {
        return items.forEach((item) => item.classList.add(`selected`));
    }

    checkCupSpace() {
        for (const drink of this.drinks) {
            if (this.currentDrink.ml + drink.ml > this.cups.big.ml) {
                const drinkElement = document.querySelector(`[data-name="${drink.name}"]`)
                this.disable([drinkElement]);
            }
        }

        if (this.currentDrink.additions.syrup >= 2) {
            this.disable([this.additions.syrup]);
        }
    }

    checkIngridients() {
        const promise = new Promise((resolve, reject) => {
            if ((this.currentDrink.ml <= this.cups.small.ml && this.cups.small.amount)) {
                resolve(this.currentDrink);
            } else if (this.currentDrink.ml <= this.cups.big.ml && this.cups.big.amount) {
                resolve(this.currentDrink);
            }

            reject();
        });

        return promise;
    }

    setPrice = () => this.board.price.textContent = this.currentDrink.price;
    setName() {
        const name = Object.keys(this.currentDrink.additions).reduce((name, drink) => {
            if (this.currentDrink.additions[drink]) {
                return `${name ? `${name} &` : ``} ${drink} ${this.currentDrink.additions[drink]}x`;
            }
            return name;
        }, this.currentDrink.name);


        this.board.name.textContent = name;
    }

    setCups() {
        if (this.currentDrink.ml <= this.cups.small.ml && this.cups.small.amount) {
            --this.cups.small.amount;
            smallCups.textContent = this.cups.small.amount;
        } else {
            --this.cups.big.amount;
            bigCups.textContent = this.cups.big.amount;
        }
    
        for (const [cup, props] of Object.entries(this.cups)) {
            if (props.amount === 0) {
                eval(cup + `Cups`).classList.add(`empty`);
            }
        }
    }

    dumpDrink() {
        this.currentDrink.name = null;
        this.currentDrink.type = null;
        this.currentDrink.additions.milk = 0;
        this.currentDrink.additions.syrup = 0;
        this.currentDrink.price = 0;
        this.currentDrink.percent = 0;
        this.currentDrink.ml = 0;
    
    
        water.style.transform = `translate(0, 110%)`;
        this.board.counter.textContent = `${this.currentDrink.ml}ML`;
    }

    createDrink() {
        const promise = new Promise((resolve, reject) => {
            let currentFill = 0;
            let currentPercent = 0;

            water.style.transitionDuration = `0s`;
            water.style.transform = `translate(0, 110%)`;
            this.board.counter.textContent = `0ML`;


            const animateFrame = () => {
                if (currentFill < this.currentDrink.ml) {
                    currentFill++;
                    currentPercent += (this.currentDrink.percent + 10) / this.currentDrink.ml;
                    water.style.transform = `translate(0, ${110 - currentPercent}%)`;
                    this.board.counter.textContent = `${currentFill}ML`;
                } else {
                    clearInterval(interval);
                    resolve(this.currentDrink);
                }
            };

            const interval = setInterval(animateFrame, this.timeMap[this.currentDrink.type] * 1000 / this.currentDrink.ml);
        });

        return promise;
    }

    onDrinkCreated() {
        water.style.transitionDuration = `2s`;
        this.controls.cup.classList.add(`machine__cup--filled`);
    
        this.enable([this.controls.cup]);
        this.setCups(); 
    
        this.timeouts.push(setTimeout(() => {
            this.controls.cup.classList.add(`machine__cup--waited`);
            audio.play();
        }, 5000));
    
        this.timeouts.push(setTimeout(() => this.onCupClick(), 20000));
    }

    onDrinkRejected = () => {
        this.controls.cup.classList.add(`machine__cup--error`);
        this.onResetClick();
    };

    onPayClick() {
        this.disable([...Object.values(this.additions), ...Object.values(this.controls)]);

        this.checkIngridients()
            .then(this.createDrink)
            .then(this.onDrinkCreated)
            .catch(this.onDrinkRejected)
    }

    onResetClick() {
        const drinks = document.querySelectorAll(`.drink`);

        this.board.name.textContent = ``;
        this.board.price.textContent = `0`;
        this.enable([...drinks, this.additions.milk]);
        this.disable([this.controls.pay, this.controls.reset, this.additions.syrup]);
        this.unselect([...drinks, this.additions.milk, this.additions.syrup]);
    
        this.dumpDrink();
    }

    onCupClick() {
        this.controls.cup.classList.remove(`machine__cup--filled`);
        this.controls.cup.classList.remove(`machine__cup--waited`);
    
        audio.currentTime = 5.8;
        audio.pause();

        this.onResetClick();
        this.disable([this.controls.cup]);
    
        this.timeouts.forEach((timeout) => clearTimeout(timeout));
    }
}

class Drink {
    constructor({
        name,
        ml,
        price,
        type
    }, machine) {
        this.machine = machine;
        this.name = name;
        this.ml = ml;
        this.price = price;
        this.type = type;
        this.element = document.querySelector(`[data-name="${this.name}"]`);
        this.bind();
    }

    bind() {
        this.element.addEventListener((`click`), this.onDrinkClick);
    }

    onDrinkClick = () => {
        // Removing error border if exists
        this.machine.controls.cup.classList.remove(`machine__cup--error`);

        // Selecting current drink & enabling controls
        this.machine.select([this.element]);
        this.machine.enable([this.machine.controls.pay, this.machine.controls.reset]);


        // Disabling some drinks or buttons via case
        switch (this.type) {
            case `authors`: {
                const elementsToDisable = this.machine.drinks.map((drink) => document.querySelector(`[data-name="${drink.name}"]`));

                this.machine.currentDrink.name = this.name;
                this.machine.currentDrink.type = 'author';
                this.machine.disable(elementsToDisable);
                break;
            }
            case 'default': {
                const drinksToDisable = this.machine.drinks.filter((drink) => drink.type !== `addition` && drink.name !== this.name);
                const elementsToDisable = drinksToDisable.map((drink) => document.querySelector(`[data-name="${drink.name}"]`));

                this.machine.currentDrink.name = this.name;
                this.machine.currentDrink.type ? this.machine.currentDrink.type = `custom` : this.machine.currentDrink.type = `default`;
                this.machine.enable([this.machine.additions.syrup]);
                this.machine.disable(elementsToDisable);
                break;
            }
            case 'addition': {
                const drinksToDisable = this.machine.drinks.filter((drink) => drink.type === `authors`);
                const elementsToDisable = drinksToDisable.map((drink) => document.querySelector(`[data-name="${drink.name}"]`));

                this.machine.currentDrink.additions[this.name]++;
                this.machine.currentDrink.type = `custom`;
                this.machine.enable([this.machine.additions.syrup]);
                this.machine.disable(elementsToDisable);
                break;
            }
        }


        this.machine.fillDrink(this.ml, this.price);
    }
}

const coffeeMachine = new Machine(drinksList);
const drinks = drinksList.forEach((drink) => new Drink(drink, coffeeMachine));