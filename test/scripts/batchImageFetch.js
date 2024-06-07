const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { parse } = require('fast-csv');
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

async function updateCsvWithImages(inputCsvPath, outputCsvPath) {
  const rows = [];
  fs.createReadStream(inputCsvPath)
    .pipe(csv())
    .on('data', (row) => {
      rows.push(row);
    })
    .on('end', async () => {
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        row['image_url'] = await fetchImageUrl(row['recipe_name']);
        // Add a delay to avoid hitting API rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      writeCsv(outputCsvPath, rows);
    });
}

function writeCsv(filePath, data) {
  const ws = fs.createWriteStream(filePath);
  parse.write(data, { headers: true }).pipe(ws);
}

const inputCsvPath = path.join(__dirname, '../../config/menu.csv'); // Correct path to your input CSV file
const outputCsvPath = path.join(__dirname, '../../config/menu_updated.csv'); // Replace with your output CSV file path

updateCsvWithImages(inputCsvPath, outputCsvPath)
  .then(() => console.log('CSV updated with image URLs'))
  .catch((error) => console.error('Error updating CSV:', error));
