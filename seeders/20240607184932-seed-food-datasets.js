'use strict';
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const BATCH_SIZE = 100; // Number of rows to insert in each batch
const DELAY_BETWEEN_BATCHES_MS = 1000; // Delay between each batch insertion in milliseconds

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const csvFilePath = path.join(__dirname, '../config/menu.csv'); // Adjust the path as necessary
    const rows = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          rows.push({
            recipeUri: row['recipe_uri'],
            recipeName: row['recipe_name'],
            calories: parseFloat(row['calories']),
            sugarContent: parseFloat(row['sugar_content(g)']),
            dietLabels: row['diet_labels'],
            ingredients: row['ingredients'],
            imageUrl: row['image_url'],
            instructionUrl: row['instruction_url']
          });

          if (rows.length === BATCH_SIZE) {
            insertBatch(queryInterface, rows.slice()); // Pass a copy of rows to avoid mutation issues
            rows.length = 0; // Clear the rows array for the next batch
          }
        })
        .on('end', async () => {
          // Insert the remaining rows if any
          if (rows.length > 0) {
            insertBatch(queryInterface, rows);
          }
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('foods', null, {});
      console.log('Database seeding reverted successfully');
    } catch (error) {
      console.error('Error reverting database seeding:', error);
    }
  }
};

async function insertBatch(queryInterface, rows) {
  try {
    console.log(`Inserting batch of ${rows.length} rows into the database...`);
    await queryInterface.bulkInsert('foods', rows);
    console.log(`Inserted ${rows.length} rows into the database successfully.`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_BATCHES_MS));
  }
}
