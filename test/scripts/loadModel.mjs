import * as tf from '@tensorflow/tfjs-node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Convert __dirname to work in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the image file you want to test
const imagePath = path.join(__dirname, 'apple.jpeg');

// Function to load and predict the image
async function predictImage() {
  try {
    // Log the starting of the process
    console.log('Starting prediction process...');

    // Load the model
    console.log('Loading model...');
    const modelPath = path.join(__dirname, '..', 'config', 'image_recognition', 'model.json');
    console.log(`Model path: ${modelPath}`);
    const model = await tf.loadGraphModel(`file://${modelPath}`);
    console.log('Model loaded successfully.');

    // Read the image file
    console.log(`Reading image from: ${imagePath}`);
    const imageBuffer = fs.readFileSync(imagePath);
    let tensor = tf.node.decodeImage(imageBuffer);

    // Preprocess the image
    const resizedImage = tensor.resizeNearestNeighbor([224, 224]); // Adjust size as required by your model
    const batchedImage = resizedImage.expandDims(0);
    const input = batchedImage.toFloat().div(tf.scalar(255));

    // Make predictions
    console.log('Making predictions...');
    const predictions = await model.predict(input).data();
    const predictionArray = Array.from(predictions);
    console.log('Predictions:', predictionArray);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the prediction function
predictImage();
