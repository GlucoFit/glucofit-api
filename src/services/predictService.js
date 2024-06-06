// const {User, Scan, Assessment} = require('../models');
// const bucket = require('../../config/storage');
// const tf = require('@tensorflow/tfjs-node');
// const sharp = require('sharp');
// const path = require('path');

// let model;

// const loadModel = async () => {
//     if (!model) {
//         model = await tf.loadGraphModel(process.env.MODEL_IMAGE_RECOGNITION3);
//     }
//     return model;
// }

// const uploadImage = (file, folder = 'user-image', userId) => {
//     return new Promise((resolve, reject) => {
//         const blob = bucket.file(`${folder}/${Date.now()}_${userId}_${file.originalname}`);
//         const blobStream = blob.createWriteStream({
//             resumable: false
//         });

//         blobStream.on('error', (err) => {
//             reject(err);
//         });

//         blobStream.on('finish', () => {
//             const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//             resolve(publicUrl);
//         });

//         blobStream.end(file.buffer);
//     });
// }

// const saveImage = (file, userId) => {
//     const scan = Scan.create
// }

// const processImage = async (imageBuffer) => {
//     const processedImage = await sharp(imageBuffer)
//     .resize(224, 224) // Resize to the input size your model expects
//     .toFormat('png')
//     .toBuffer();
//     const imageTensor = tf.node.decodeImage(processedImage);
//     const expandedImageTensor = imageTensor.expandDims(0); // Add batch dimension
//     return expandedImageTensor;
// }

// const predictScan = async (imageUrl, userId) => {
//     console.log('loading model');
//     const model = await loadModel();
//     console.log('model loaded');

//     const response = await fetch(imageUrl);
//     console.log('image fetched');
//     const imageBuffer = await response.buffer();
//     console.log('image buffred');
//     const processedImage = await processImage(imageBuffer);
//     console.log('image processed');
//     const prediction = model.predict(processedImage);
//     console.log('image predicted');
//     const predictionResult = prediction.arraySync();

//     // Use your specific logic here to extract the relevant information from the prediction result
//     const objectName = 'Extracted Object Name'; // Replace with actual logic
//     const objectSugar = Math.round(predictionResult[0][0]); // Example logic

//     // Save the scan result to the database
//     const scan = await Scan.create({
//         object_image: imageUrl,
//         object_name: objectName,
//         object_sugar: objectSugar,
//         userId,
//     });

//     return scan;
// }

// module.exports = {uploadImage, saveImage, /*predictScan*/}