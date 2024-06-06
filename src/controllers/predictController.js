// const predictService = require('../services/predictService');

// const uploadImageAndPredict = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded.' });
//         }
//         const userId = req.user.id;
//         const imageUrl = await predictService.uploadImage(req.file, 'user-image', userId);
//         console.log('controller: saving image from controller king');
//         const savedImage = await predictService.saveImage(req.file, userId);
//         // const predictionResult = await predictService.predictScan(imageUrl, userId);
//         res.status(200).json({ message: 'Image uploaded and saved successfully.' , data: savedImage});
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = {uploadImageAndPredict}