const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// File paths
const firstSetFilePath = './config/menu.csv';
const secondSetFilePath = './config/menu (1).csv';
const outputFilePath = './config/merged_set.csv';

// Read and store the first set data
let firstSetData = [];
fs.createReadStream(firstSetFilePath)
  .pipe(csv())
  .on('data', (row) => {
    firstSetData.push(row);
  })
  .on('end', () => {
    console.log('First CSV file successfully processed');

    // Read and merge the second set data
    let mergedData = [];
    fs.createReadStream(secondSetFilePath)
      .pipe(csv())
      .on('data', (row) => {
        // Find the matching row from the first set
        let matchingRow = firstSetData.find(item => item.recipe_name === row.recipe_name);
        if (matchingRow) {
          // Merge the data
          let mergedRow = {
            recipe_uri: matchingRow.recipe_uri,
            recipe_name: row.recipe_name,
            calories: row.calories,
            sugar_content: row['sugar_content(g)'],
            diet_labels: row.diet_labels,
            ingredients: row.ingredients,
            image_url: matchingRow.image_url,  // Use image_url from the first set
            instruction_url: matchingRow.instruction_url,
            servings: row.servings  // Use servings from the second set
          };
          mergedData.push(mergedRow);
        }
      })
      .on('end', () => {
        console.log('Second CSV file successfully processed');

        // Write the merged data to a new CSV file
        const csvWriter = createCsvWriter({
          path: outputFilePath,
          header: [
            { id: 'recipe_uri', title: 'recipe_uri' },
            { id: 'recipe_name', title: 'recipe_name' },
            { id: 'calories', title: 'calories' },
            { id: 'sugar_content', title: 'sugar_content(g)' },
            { id: 'diet_labels', title: 'diet_labels' },
            { id: 'ingredients', title: 'ingredients' },
            { id: 'image_url', title: 'image_url' },
            { id: 'instruction_url', title: 'instruction_url' },
            { id: 'servings', title: 'servings' }
          ]
        });

        csvWriter.writeRecords(mergedData)
          .then(() => {
            console.log('Merged CSV file successfully written');
          });
      });
  });
