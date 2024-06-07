const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const url = require('url');

const inputCsvPath = path.join(__dirname, '../../config/menu.csv'); // Correct path to your input CSV file
const outputTxtPath = path.join(__dirname, '../../config/domains.txt'); // Path to save the unique domains

// Function to extract domain from a URL
function getDomainFromUrl(instructionUrl) {
  try {
    const parsedUrl = new URL(instructionUrl);
    return parsedUrl.hostname;
  } catch (error) {
    console.error(`Error parsing URL ${instructionUrl}:`, error);
    return '';
  }
}

// Function to read the CSV and extract unique domains
async function extractUniqueDomains(inputCsvPath, outputTxtPath) {
  const domains = new Set();
  fs.createReadStream(inputCsvPath)
    .pipe(csv())
    .on('data', (row) => {
      const domain = getDomainFromUrl(row['instruction_url']);
      if (domain) {
        domains.add(domain);
      }
    })
    .on('end', () => {
      fs.writeFile(outputTxtPath, Array.from(domains).join('\n'), (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Unique domains have been written to', outputTxtPath);
        }
      });
    });
}

extractUniqueDomains(inputCsvPath, outputTxtPath)
  .then(() => console.log('Domain extraction completed'))
  .catch((error) => console.error('Error during domain extraction:', error));
