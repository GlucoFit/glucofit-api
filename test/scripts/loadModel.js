const tf = require('@tensorflow/tfjs-node');
const path = require('path');
require('dotenv').config();

// Path to the image file you want to test
const imagePath = path.join(__dirname, 'apple.jpeg');

// Function to load and predict the image
async function predictImage() {
  try {
    // Load the model
    console.log('Loading model...');
    const model = await tf.loadLayersModel(process.env.MODEL_CBF_HISTORY);
    console.log('Model loaded successfully.');

    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    let tensor = tf.node.decodeImage(imageBuffer);

    // Preprocess the image
    const resizedImage = tensor.resizeNearestNeighbor([224, 224]); // Adjust size as required by your model
    const batchedImage = resizedImage.expandDims(0);
    const input = batchedImage.toFloat().div(tf.scalar(255));

    // Make predictions
    const predictions = await model.predict(input).data();
    const predictionArray = Array.from(predictions);
    console.log('Predictions:', predictionArray);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the prediction function
predictImage();
