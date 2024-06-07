const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { writeToStream } = require('fast-csv');

const errorRecipes = [
    {
        recipeName: "MEEN MULAKUETTATHU(fish in chili)",
        imageUrl: "https://www.onmanorama.com/content/dam/mm/en/food/readers-recipe/images/2019/8/7/kannur-fish-curry.jpg.transform/845x440/image.jpg"
    },
    {
        recipeName: "Pepes Ikan Nila - Western Javanese Style Steamed Tilapia in Banana Leaves Wrap",
        imageUrl: "https://amcarmenskitchen.com/wp-content/uploads/2021/08/1935.jpg?w=810"
    },
    {
        recipeName: "By Elma Salsabila recipes",
        imageUrl: "https://asset.kompas.com/crops/dGH17UyZay6vi772ipGxq9BOPM8=/0x292:1000x959/750x500/data/photo/2021/08/02/61081f8d3a20b.jpg"
    },
    {
        recipeName: "MINCED DUCK SATAY / SATE LILIT BEBEK (15-2",
        imageUrl: "https://static.vecteezy.com/system/resources/previews/010/146/948/non_2x/sate-lilit-traditional-balinese-minced-chicken-satay-with-lemongrass-as-skewer-served-with-sambal-matah-photo.jpg"
    },
    {
        recipeName: "ayam isi dibulu",
        imageUrl: "https://cdn.idntimes.com/content-images/post/20220809/40778341-10155186291547255-3707293204425474048-n-03af8f60132f094e1a500425c0b80383_600x400.jpg"
    },
    {
        recipeName: "Endive Spears with Smoked Sable and Sauce Raifort",
        imageUrl: "https://images.theyellowtable.com/best-endive-spears-smoked-salmon-lemon-dill-vinaigrette-recipe-sq.jpg?w=1450&q=45"
    },
    {
        recipeName: "Chacarero -The Chilean National Lunch Solution",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5cbbheY1w6tqJak9JE1uvpEEWIDPT9ybruA&s"
    },
    {
        recipeName: "Sambal Udang Petai – Shrimp and Stin",
        imageUrl: "https://asset.kompas.com/crops/hHFIefQ7wYkPzJ2SVczMDq259vs=/0x320:702x788/750x500/data/photo/2021/02/28/603b2abec88be.jpg"
    },
    {
        recipeName: "Banana Brioche Monkey Bread with Moloko Milk Stout Butterscotch and Smoked Almond Toffee Brittle",
        imageUrl: "https://i.pinimg.com/564x/3c/55/76/3c5576fd182405c91b1f18fdce5cc330.jpg"
    },
    {
        recipeName: "Seafood Appetizer in the Style of Venezia: Misto di Mare alla Veneziana",
        imageUrl: "https://i0.wp.com/memoriediangelina.com/wp-content/uploads/2023/02/Capesante-alla-veneziana-featured.jpg?fit=800%2C534&ssl=1"
    }
];

async function updateCsvWithManualImages(inputCsvPath, outputCsvPath, manualImages) {
    const rows = [];
    
    fs.createReadStream(inputCsvPath)
        .pipe(csv())
        .on('data', (row) => {
            const errorRecipe = manualImages.find(recipe => recipe.recipeName === row['recipe_name']);
            if (errorRecipe) {
                row['image_url'] = errorRecipe.imageUrl;
            }
            rows.push(row);
        })
        .on('end', () => {
            writeCsv(outputCsvPath, rows);
            console.log('CSV updated with manual image URLs');
        });
}

function writeCsv(filePath, data) {
    const ws = fs.createWriteStream(filePath);
    writeToStream(ws, data, { headers: true })
        .on('error', error => console.error('Error writing CSV:', error))
        .on('finish', () => console.log('CSV written to', filePath));
}

const inputCsvPath = path.join(__dirname, '../../config/menu_updated.csv'); // Adjust the path to your menu_updated.csv
const outputCsvPath = path.join(__dirname, '../../menu_with_manual_images.csv'); // Adjust the path for the output CSV file

updateCsvWithManualImages(inputCsvPath, outputCsvPath, errorRecipes);
