/** Бабулькины рецепты. 
 * На чердаке нашлись несколько тетрадок с рецептами кофе от бабушки, она была еще та любительница этого напитка. 
 * В меню уже был раздел с её рецептом, 'oldfashion'. Теперь вы хотите удалить этот раздел и создать новый (grannys), со всеми известными
 * бабулькиными рецептами (из текущего oldfashion тоже). Цена будет на все одна - 140.
 * Обновите меню (создайте функцию menuRenovation, обновляющую текущее меню)
 */

const myCoffeeShopMenu = {
  classic: [{
    'latte': 130
  }, {
    'cappuccino': 120
  }, {
    'americano': 80
  }],
  author: [{
    'banana raf': 150
  }, {
    'cherry pie latte': 150
  }],
  ethic: [{
    'vegan apple cookie latte': 190
  }],
  oldfashion: [{
    'cezve turkish delight': 140
  }]
}



const grannysNote1 = ['hot sand coffee', 'brazilian night dark roast']
const grannysNote2 = ['Midterranian delux', 'Black Sea Flat white']

const menuRenovation = (notes, menu, oldSection, newSection) => {
  const pricedNotes = notes.map((note) => ({[note]: 140}));
  menu[newSection] = [...pricedNotes, ...menu[oldSection]];

  delete menu[oldSection];

  console.log(menu);
}

menuRenovation([...grannysNote1, ...grannysNote2], myCoffeeShopMenu, 'oldfashion', 'grannys');

console.log(`---------------------------------`);