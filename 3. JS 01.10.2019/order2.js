/**
 * Обучаам баристу инвентаризации.
 * Делается заказ, бариста проверяет, есть ли в меню такие кофе и печенье, 
 * сверяется с рецептом, смотрит наличие ингредиентов
 * и готовит заказ / извиняется и дозаказывает ингредиенты
 */

const recipes = {
    'банановый латте': ['банановый сироп', 'молоко', 'кофе'],
    'черничный капучино': ['черничный сироп', 'молоко', 'кофе'],
    'баунти раф': ['раф-основа', 'кокосовое молоко', 'розовая соль'],
    'американо': ['кофе']
}

const cookies = ['шоколадное', 'овсяное', 'мятное', 'малиновое']

const box = {
    'банановый сироп': 2,
    'черничный сироп': 0,
    'молоко': 10,
    'кофе': 10,
    'раф-основа': 3,
    'кокосовое молоко': 0,
    'розовая соль': 1
}

const checkOrderItem = (item, menu) => menu.includes(item);

const checkIngredients = (coffee, recipes, box) => {
    for (const item of recipes[coffee]) {
        if (box[item] === 0) {
            console.log(`--Памятка: Нужно заказать ${item}`);
            return false;
        }
    }

    return true;
};

function order(coffee, cookie) {
    const dictionary = {
        allOk: `Вот ваш заказ: ${coffee} и ${cookie} печенье! Хорошего дня!`,
        allNotOk: `Мы не можем обработать ваш заказ, извините.`,
        noCookie: `К сожалению, у нас нет такого печенья. Вот ваш ${coffee}`,
        noCoffee: `К сожалению, сейчас не можем приготовить ${coffee}. Вот ваше ${cookie} печенье`,
    }

    const isCookie = checkOrderItem(cookie, cookies);

    const isCoffee = checkOrderItem(coffee, Object.keys(recipes));

    const isIngridients = checkIngredients(coffee, recipes, box);

    switch (true) {
        case isCoffee && isCookie && isIngridients:
            console.log(dictionary.allOk);
            break;
        case !isCookie && !isIngridients:
            console.log(dictionary.allNotOk);
            break;
        case !isCookie && isCoffee:
            console.log(dictionary.noCookie);
            break;
        case isCookie && (!isCoffee || !isIngridients):
            console.log(dictionary.noCoffee);
            break;
    }





    console.log('-----Следующий заказ-----')
}

order('американо', 'мятное')
order('баунти раф', 'апельсиновое')
order('банановый латте', 'мятное')
order('баунти раф', 'малиновое')

// Ожидаемый вывод //
/*
"Вот ваш заказ: американо и мятное печенье! Хорошего дня!"
"-----Следующий заказ-----"
"--Памятка: Нужно заказать кокосовое молоко"
"Мы не можем обработать ваш заказ, извините."
"-----Следующий заказ-----"
"Вот ваш заказ: банановый латте и мятное печенье! Хорошего дня!"
"-----Следующий заказ-----"
"--Памятка: Нужно заказать кокосовое молоко"
"К сожалению, сейчас не можем приготовить баунти раф. Вот ваше малиновое печенье"
"-----Следующий заказ-----"
*/