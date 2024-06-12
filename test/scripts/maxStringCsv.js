const fs = require('fs');
const csv = require('csv-parser');

// Function to fetch max string length for each column
function fetchMaxStringLength(csvFilePath) {
    const maxStringLengths = {};

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                for (const key in row) {
                    if (row.hasOwnProperty(key)) {
                        const value = row[key];
                        if (typeof value === 'string') {
                            const currentLength = value.length;
                            if (!maxStringLengths[key] || currentLength > maxStringLengths[key]) {
                                maxStringLengths[key] = currentLength;
                            }
                        }
                    }
                }
            })
            .on('end', () => {
                resolve(maxStringLengths);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

// Usage example
const csvFilePath = './config/menu.csv';
fetchMaxStringLength(csvFilePath)
    .then((maxStringLengths) => {
        console.log('Max string lengths for each column:');
        console.log(maxStringLengths);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
