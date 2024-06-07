const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { writeToStream } = require('fast-csv');
const axios = require('axios');
require('dotenv').config();
const Bottleneck = require('bottleneck');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Replace with your Google API key
const GOOGLE_CX = process.env.GOOGLE_CX; // Replace with your Custom Search Engine ID

const limiter = new Bottleneck({
  maxConcurrent: 1, // Only one request at a time
  minTime: 1000, // Minimum time between requests (1 second)
});

async function fetchImageUrl(recipeName, retryCount = 3) {
  try {
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(recipeName)}&cx=${GOOGLE_CX}&searchType=image&key=${GOOGLE_API_KEY}`;
    const response = await limiter.schedule(() => axios.get(url));
    const items = response.data.items;
    if (items && items.length > 0) {
      return items[0].link;
    } else {
      throw new Error('No image found');
    }
  } catch (error) {
    if (error.response && error.response.status === 429 && retryCount > 0) {
      console.log(`Rate limit exceeded. Retrying in 5 minutes...`);
      await new Promise(resolve => setTimeout(resolve, 300000)); // Wait for 5 minutes (300,000 milliseconds)
      return fetchImageUrl(recipeName, retryCount - 1); // Retry with reduced retry count
    } else {
      console.error(`Error fetching image for ${recipeName}:`, error);
      return '';
    }
  }
}

async function processRows(rows) {
  const updatedRows = [];

  for (const row of rows) {
    try {
      row['image_url'] = await fetchImageUrl(row['recipe_name']);
    } catch (error) {
      console.error(`Error updating image URL for row:`, row);
    }
    updatedRows.push(row);
  }

  return updatedRows;
}

async function updateCsvWithImages(inputCsvPath, outputCsvPath) {
  const rows = [];
  
  fs.createReadStream(inputCsvPath)
    .pipe(csv())
    .on('data', (row) => {
      rows.push(row);
    })
    .on('end', async () => {
      const chunkSize = 3600; // Process all rows in one batch
      for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        const updatedChunk = await processRows(chunk);
        updatedChunk.forEach((updatedRow, index) => {
          rows[i + index] = updatedRow; // Update rows with fetched data
        });
      }
      writeCsv(outputCsvPath, rows);
    });
}

function writeCsv(filePath, data) {
  const ws = fs.createWriteStream(filePath);
  writeToStream(ws, data, { headers: true }) // Use writeToStream function
    .on('error', error => console.error('Error writing CSV:', error))
    .on('finish', () => console.log('CSV updated with image URLs'));
}

const inputCsvPath = path.join(__dirname, '../../config/menu.csv'); // Correct path to your input CSV file
const outputCsvPath = path.join(__dirname, '../../config/menu_updated.csv'); // Replace with your output CSV file path

updateCsvWithImages(inputCsvPath, outputCsvPath)
  .then(() => console.log('CSV updated with image URLs'))
  .catch((error) => console.error('Error updating CSV:', error));
