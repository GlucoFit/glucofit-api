'use strict';
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const fastCsv = require('fast-csv');

const BATCH_SIZE = 50; // Number of rows to insert in each batch
const DELAY_BETWEEN_BATCHES_MS = 1000; // Delay between each batch insertion in milliseconds

// Log file paths
const logFilePath = path.join(__dirname, '../config/seeder.log');
const errorRowsFilePath = path.join(__dirname, '../config/error_rows.csv');

// Function to append log messages to the log file
function logToFile(message) {
  fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
}

// Function to append error rows to the error CSV file
function logErrorRow(row) {
  const ws = fs.createWriteStream(errorRowsFilePath, { flags: 'a' });
  fastCsv.write([row], { headers: !fs.existsSync(errorRowsFilePath) }).pipe(ws);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const csvFilePath = path.join(__dirname, '../config/menu.csv'); // Adjust the path as necessary
    const rows = [];

    // Clean the error rows file if it exists
    if (fs.existsSync(errorRowsFilePath)) {
      fs.unlinkSync(errorRowsFilePath);
    }

    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          logToFile(`Processing row: ${JSON.stringify(row)}`);
          rows.push({
            recipeUri: row['recipe_uri'],
            recipeName: row['recipe_name'],
            calories: parseFloat(row['calories']),
            sugarContent: parseFloat(row['sugar_content(g)']),
            dietLabels: row['diet_labels'],
            ingredients: row['ingredients'],
            imageUrl: row['image_url'],
            instructionUrl: row['instruction_url'],
            servings: row['servings'] 
            // serving: row['serving']
          });

          if (rows.length === BATCH_SIZE) {
            logToFile(`Batch reached ${BATCH_SIZE} rows. Inserting batch...`);
            insertBatch(queryInterface, rows.slice())
              .catch((error) => {
                logToFile(`Error inserting batch: ${error.message}`);
                rows.slice().forEach(logErrorRow);
              });
            rows.length = 0; // Clear the rows array for the next batch
          }
        })
        .on('end', async () => {
          // Insert the remaining rows if any
          if (rows.length > 0) {
            logToFile(`Inserting remaining ${rows.length} rows...`);
            await insertBatch(queryInterface, rows)
              .catch((error) => {
                logToFile(`Error inserting remaining rows: ${error.message}`);
                rows.forEach(logErrorRow);
              });
          }
          logToFile('CSV processing completed.');

          // Retry inserting error rows
          await retryErrorRows(queryInterface);

          resolve();
        })
        .on('error', (error) => {
          logToFile(`Error reading CSV file: ${error.message}`);
          reject(error);
        });
    });
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('foods', null, {});
      logToFile('Database seeding reverted successfully');
    } catch (error) {
      logToFile(`Error reverting database seeding: ${error.message}`);
    }
  }
};

async function insertBatch(queryInterface, rows) {
  try {
    logToFile(`Inserting batch of ${rows.length} rows into the database...`);
    await queryInterface.bulkInsert('foods', rows);
    logToFile(`Inserted ${rows.length} rows into the database successfully.`);
  } catch (error) {
    logToFile(`Error seeding database: ${error.message}`);
    // Log the rows that failed to insert
    rows.forEach(logErrorRow);
  } finally {
    await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_BATCHES_MS));
  }
}

async function retryErrorRows(queryInterface) {
  if (!fs.existsSync(errorRowsFilePath)) {
    return;
  }

  const errorRows = [];

  fs.createReadStream(errorRowsFilePath)
    .pipe(csv())
    .on('data', (row) => {
      errorRows.push(row);
    })
    .on('end', async () => {
      logToFile(`Retrying ${errorRows.length} error rows...`);

      try {
        await queryInterface.bulkInsert('foods', errorRows);
        logToFile(`Successfully retried and inserted ${errorRows.length} error rows.`);
        // Clean up the error rows file after successful retry
        fs.unlinkSync(errorRowsFilePath);
      } catch (error) {
        logToFile(`Error retrying error rows: ${error.message}`);
      }
    })
    .on('error', (error) => {
      logToFile(`Error reading error rows file: ${error.message}`);
    });
}
