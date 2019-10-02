const makeMeACoffee = (order) => {
    const ingridients = order.join(`, `);

    const makeACoffee = () => ingridients.concat(` кофе`);

    return makeACoffee();
}

const cocoblond = makeMeACoffee(['малиновый сироп', 'кокосовое молоко', 'светлая обжарка']);
const icedark = makeMeACoffee(['лед', 'темная обжарка']);

console.log(cocoblond);
console.log(icedark);


const makeMeACoffeeV2 = (order) => {
    let pshik = 2;
    const ingridients = order.join(`, `);

    const makeACoffee = () => ingridients.concat(` кофе`);
    const addSyrup = () => ingridients.concat(` кофе с ${++pshik} пшиками карамели`);

    return {
        addSyrup: () => addSyrup(),
        noSyrup: () => makeACoffee()
    }
};

const icedark2 = makeMeACoffeeV2(['лед', 'темная обжарка']);
const cocoblond2 = makeMeACoffeeV2(['малиновый сироп', 'кокосовое молоко', 'светлая обжарка']);

console.log(icedark2.noSyrup());
console.log(cocoblond2.addSyrup());
console.log(cocoblond2.addSyrup());
console.log(cocoblond2.addSyrup());
console.log(cocoblond2.addSyrup());
console.log(cocoblond2.addSyrup());
console.log(cocoblond2.addSyrup());
