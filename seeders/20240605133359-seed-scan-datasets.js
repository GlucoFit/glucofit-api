'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();

    await queryInterface.bulkInsert('scan_datasets', [
      { id: 1, name: 'Apple Pie', sugar: 25, createdAt: currentDate, updatedAt: currentDate },
      { id: 2, name: 'Baby Back Ribs', sugar: 15, createdAt: currentDate, updatedAt: currentDate },
      { id: 3, name: 'Baklava', sugar: 30, createdAt: currentDate, updatedAt: currentDate },
      { id: 4, name: 'Beef Carpaccio', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 5, name: 'Beef Tartare', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 6, name: 'Beet Salad', sugar: 9, createdAt: currentDate, updatedAt: currentDate },
      { id: 7, name: 'Beignets', sugar: 20, createdAt: currentDate, updatedAt: currentDate },
      { id: 8, name: 'Bibimbap', sugar: 6, createdAt: currentDate, updatedAt: currentDate },
      { id: 9, name: 'Bread Pudding', sugar: 22, createdAt: currentDate, updatedAt: currentDate },
      { id: 10, name: 'Breakfast Burrito', sugar: 4, createdAt: currentDate, updatedAt: currentDate },
      { id: 11, name: 'Bruschetta', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 12, name: 'Caesar Salad', sugar: 2.81, createdAt: currentDate, updatedAt: currentDate },
      { id: 13, name: 'Cannoli', sugar: 17, createdAt: currentDate, updatedAt: currentDate },
      { id: 14, name: 'Caprese Salad', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 15, name: 'Carrot Cake', sugar: 31, createdAt: currentDate, updatedAt: currentDate },
      { id: 16, name: 'Ceviche', sugar: 3, createdAt: currentDate, updatedAt: currentDate },
      { id: 17, name: 'Cheesecake', sugar: 21.8, createdAt: currentDate, updatedAt: currentDate },
      { id: 18, name: 'Cheese Plate', sugar: 1, createdAt: currentDate, updatedAt: currentDate },
      { id: 19, name: 'Chicken Curry', sugar: 3.3, createdAt: currentDate, updatedAt: currentDate },
      { id: 20, name: 'Chicken Quesadilla', sugar: 1.88, createdAt: currentDate, updatedAt: currentDate },
      { id: 21, name: 'Chicken Wings', sugar: 6, createdAt: currentDate, updatedAt: currentDate },
      { id: 22, name: 'Chocolate Cake', sugar: 35, createdAt: currentDate, updatedAt: currentDate },
      { id: 23, name: 'Chocolate Mousse', sugar: 24, createdAt: currentDate, updatedAt: currentDate },
      { id: 24, name: 'Churros', sugar: 14, createdAt: currentDate, updatedAt: currentDate },
      { id: 25, name: 'Clam Chowder', sugar: 0.23, createdAt: currentDate, updatedAt: currentDate },
      { id: 26, name: 'Club Sandwich', sugar: 14.1, createdAt: currentDate, updatedAt: currentDate },
      { id: 27, name: 'Crab Cakes', sugar: 1, createdAt: currentDate, updatedAt: currentDate },
      { id: 28, name: 'Creme Brulee', sugar: 26, createdAt: currentDate, updatedAt: currentDate },
      { id: 29, name: 'Croque Madame', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 30, name: 'Cup Cakes', sugar: 29, createdAt: currentDate, updatedAt: currentDate },
      { id: 31, name: 'Deviled Eggs', sugar: 1, createdAt: currentDate, updatedAt: currentDate },
      { id: 32, name: 'Donuts', sugar: 19, createdAt: currentDate, updatedAt: currentDate },
      { id: 33, name: 'Dumplings', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 34, name: 'Edamame', sugar: 2.18, createdAt: currentDate, updatedAt: currentDate },
      { id: 35, name: 'Eggs Benedict', sugar: 1, createdAt: currentDate, updatedAt: currentDate },
      { id: 36, name: 'Escargots', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 37, name: 'Falafel', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 38, name: 'Filet Mignon', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 39, name: 'Fish and Chips', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 40, name: 'Foie Gras', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 41, name: 'French Fries', sugar: 0.21, createdAt: currentDate, updatedAt: currentDate },
      { id: 42, name: 'French Onion Soup', sugar: 3.17, createdAt: currentDate, updatedAt: currentDate },
      { id: 43, name: 'French Toast', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 44, name: 'Fried Calamari', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 45, name: 'Fried Rice', sugar: 0.56, createdAt: currentDate, updatedAt: currentDate },
      { id: 46, name: 'Frozen Yogurt', sugar: 5.3, createdAt: currentDate, updatedAt: currentDate },
      { id: 47, name: 'Garlic Bread', sugar: 3.69, createdAt: currentDate, updatedAt: currentDate },
      { id: 48, name: 'Gnocchi', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 49, name: 'Greek Salad', sugar: 3, createdAt: currentDate, updatedAt: currentDate },
      { id: 50, name: 'Grilled Cheese Sandwich', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 51, name: 'Grilled Salmon', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 52, name: 'Guacamole', sugar: 1, createdAt: currentDate, updatedAt: currentDate },
      { id: 53, name: 'Gyoza', sugar: 1, createdAt: currentDate, updatedAt: currentDate },
      { id: 54, name: 'Hamburger', sugar: 6.03, createdAt: currentDate, updatedAt: currentDate },
      { id: 55, name: 'Hot and Sour Soup', sugar: 9.83, createdAt: currentDate, updatedAt: currentDate },
      { id: 56, name: 'Hot Dog', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 57, name: 'Huevos Rancheros', sugar: 3, createdAt: currentDate, updatedAt: currentDate },
      { id: 58, name: 'Hummus', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 59, name: 'Ice Cream', sugar: 21.22, createdAt: currentDate, updatedAt: currentDate },
      { id: 60, name: 'Lasagna', sugar: 11.27, createdAt: currentDate, updatedAt: currentDate },
      { id: 61, name: 'Lobster Bisque', sugar: 3, createdAt: currentDate, updatedAt: currentDate },
      { id: 62, name: 'Lobster Roll Sandwich', sugar: 4, createdAt: currentDate, updatedAt: currentDate },
      { id: 63, name: 'Macaroni and Cheese', sugar: 0.5, createdAt: currentDate, updatedAt: currentDate },
      { id: 64, name: 'Macarons', sugar: 21, createdAt: currentDate, updatedAt: currentDate },
      { id: 65, name: 'Miso Soup', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 66, name: 'Mussels', sugar: 1, createdAt: currentDate, updatedAt: currentDate },
      { id: 67, name: 'Nachos', sugar: 2.17, createdAt: currentDate, updatedAt: currentDate },
      { id: 68, name: 'Omelette', sugar: 1, createdAt: currentDate, updatedAt: currentDate },
      { id: 69, name: 'Onion Rings', sugar: 4.68, createdAt: currentDate, updatedAt: currentDate },
      { id: 70, name: 'Oysters', sugar: 1, createdAt: currentDate, updatedAt: currentDate },
      { id: 71, name: 'Pad Thai', sugar: 9, createdAt: currentDate, updatedAt: currentDate },
      { id: 72, name: 'Paella', sugar: 3, createdAt: currentDate, updatedAt: currentDate },
      { id: 73, name: 'Pancakes', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 74, name: 'Panna Cotta', sugar: 18, createdAt: currentDate, updatedAt: currentDate },
      { id: 75, name: 'Peking Duck', sugar: 5, createdAt: currentDate, updatedAt: currentDate },
      { id: 76, name: 'Pho', sugar: 3, createdAt: currentDate, updatedAt: currentDate },
      { id: 77, name: 'Pizza', sugar: 3.57, createdAt: currentDate, updatedAt: currentDate },
      { id: 78, name: 'Pork Chop', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 79, name: 'Poutine', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 80, name: 'Prime Rib', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 81, name: 'Pulled Pork Sandwich', sugar: 12, createdAt: currentDate, updatedAt: currentDate },
      { id: 82, name: 'Ramen', sugar: 1.98, createdAt: currentDate, updatedAt: currentDate },
      { id: 83, name: 'Ravioli', sugar: 3.72, createdAt: currentDate, updatedAt: currentDate },
      { id: 84, name: 'Red Velvet Cake', sugar: 34, createdAt: currentDate, updatedAt: currentDate },
      { id: 85, name: 'Risotto', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 86, name: 'Samosa', sugar: 3, createdAt: currentDate, updatedAt: currentDate },
      { id: 87, name: 'Sashimi', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 88, name: 'Scallops', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 89, name: 'Seaweed Salad', sugar: 0.49, createdAt: currentDate, updatedAt: currentDate },
      { id: 90, name: 'Shrimp and Grits', sugar: 5, createdAt: currentDate, updatedAt: currentDate },
      { id: 91, name: 'Spaghetti Bolognese', sugar: 2.6, createdAt: currentDate, updatedAt: currentDate },
      { id: 92, name: 'Spaghetti Carbonara', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 93, name: 'Spring Rolls', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 94, name: 'Steak', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 95, name: 'Strawberry Shortcake', sugar: 18, createdAt: currentDate, updatedAt: currentDate },
      { id: 96, name: 'Sushi', sugar: 3, createdAt: currentDate, updatedAt: currentDate },
      { id: 97, name: 'Tacos', sugar: 3, createdAt: currentDate, updatedAt: currentDate },
      { id: 98, name: 'Takoyaki', sugar: 2, createdAt: currentDate, updatedAt: currentDate },
      { id: 99, name: 'Tiramisu', sugar: 28, createdAt: currentDate, updatedAt: currentDate },
      { id: 100, name: 'Tuna Tartare', sugar: 0, createdAt: currentDate, updatedAt: currentDate },
      { id: 101, name: 'Waffles', sugar: 4.91, createdAt: currentDate, updatedAt: currentDate },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('scan_datasets', null, {});
  }
};