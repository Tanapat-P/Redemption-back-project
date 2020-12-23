'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rewards', [
      {
        name: 'Supreme spa',
        description: 'Marinara sauce, basil, italian sausage, roma tomatoes, olives, and pesto',
        picture: 'http://localhost:8000/spa_1.jpg',
        pointForExchanging: 50,
      },
      {
        name: 'Hawaiian Spa',
        description: 'Marinara sauce, basil, italian sausage, roma tomatoes, olives, and pesto',
        picture: 'http://localhost:8000/spa_2.jpg',
        pointForExchanging: 30,
      },
      {
        name: 'Veggie Spa',
        description: 'Marinara sauce, basil, italian sausage, roma tomatoes, olives, and pesto',
        picture: 'http://localhost:8000/spa_3.jpg',
        pointForExchanging: 20,
      },
      {
        name: 'Doughlicious',
        description: 'Belgian chocolate glazed donuts covered in icing with sprinkles on top',
        picture: 'http://localhost:8000/food_1.jpg',
        pointForExchanging: 9,
      },
      {
        name: 'Caramel Wonder',
        description: 'Vanilla ice cream covered with caramel and chocolate glaze topped with a coco stick',
        picture: 'http://localhost:8000/food_2.jpg',
        pointForExchanging: 20,
      },
      {
        name: 'Brownie Bunch',
        description: 'Double fudge brownie squares topped with white chocolate pieces and macadamia nuts',
        picture: 'http://localhost:8000/food_3.jpg',
        pointForExchanging: 15,
      },
      {
        name: 'DDD',
        description: 'Belgian chocolate glazed donuts covered in icing with sprinkles on top',
        picture: 'http://localhost:8000/travel_1.png',
        pointForExchanging: 60,
      },
      {
        name: 'CCC',
        description: 'Vanilla ice cream covered with caramel and chocolate glaze topped with a coco stick',
        picture: 'http://localhost:8000/travel_2.png',
        pointForExchanging: 30,
      },
      {
        name: 'BBB',
        description: 'Double fudge brownie squares topped with white chocolate pieces and macadamia nuts',
        picture: 'http://localhost:8000/travel_3.png',
        pointForExchanging: 50,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rewards', null, {});
  },
};
