const items = [
  {id: 1, name: 'Americano', price: 3.95, calorie: 15},
  {id: 2, name: 'Pink Drink', price: 5.45, calorie: 140},
  {id: 3, name: 'Hot Chocolate', price: 4.91, calorie: 370},
  {id: 4, name: 'Mocha Cookie Crumble Frappuccino', price: 5.95, calorie: 480},
  {id: 5, name: 'Caramel Frappuccino', price: 6.25, calorie: 380}
];

const getAll = () => {
  return items;
};

const getItem = (id) => {
  return items.find((item) => item.id === id);
};

module.exports = { getAll, getItem };