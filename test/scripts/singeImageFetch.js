const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const axios = require('axios');
require('dotenv').config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Replace with your Google API key
const GOOGLE_CX = process.env.GOOGLE_CX; // Replace with your Custom Search Engine ID

async function fetchImageUrl(recipeName) {
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(recipeName)}&cx=${GOOGLE_CX}&searchType=image&key=${GOOGLE_API_KEY}`;
  try {
    const response = await axios.get(url);
    const items = response.data.items;
    if (items && items.length > 0) {
      return items[0].link;
    } else {
      throw new Error('No image found');
    }
  } catch (error) {
    console.error(`Error fetching image for ${recipeName}:`, error);
    return '';
  }
}

async function testSingleFetch(inputCsvPath) {
  const rows = [];
  fs.createReadStream(inputCsvPath)
    .pipe(csv())
    .on('data', (row) => {
      rows.push(row);
    })
    .on('end', async () => {
      if (rows.length > 0) {
        const row = rows[0]; // Process only the first row
        const imageUrl = await fetchImageUrl(row['recipe_name']);
        console.log(`Recipe: ${row['recipe_name']}, Fetched Image URL: ${imageUrl}`);
      } else {
        console.log('No data found in CSV.');
      }
    });
}

const inputCsvPath = path.join(__dirname, '../../config/menu.csv'); // Correct path to your input CSV file

testSingleFetch(inputCsvPath)
  .then(() => console.log('Single fetch test completed'))
  .catch((error) => console.error('Error in single fetch test:', error));
