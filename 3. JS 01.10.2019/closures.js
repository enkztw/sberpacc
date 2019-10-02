const makeMeACoffee = (order) => {
    const ingridients = order.join(`, `);

    const makeACoffee = () => ingridients.concat(` кофе`);

    return makeACoffee();
}

const cocoblond = makeMeACoffee(['малиновый сироп', 'кокосовое молоко', 'светлая обжарка']);
const icedark = makeMeACoffee(['лед', 'темная обжарка']);

console.log(cocoblond);
console.log(icedark);


