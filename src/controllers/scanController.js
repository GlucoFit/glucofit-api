const { data } = require('@tensorflow/tfjs');
const scanService = require('../services/scanService');

const uploadImageAndSave = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        // console.log(req);
        const userId = req.user.id;
        const { objectName } = req.body;

        if (!objectName) {
            return res.status(400).json({ error: 'Object name and object sugar are required.' });
        }

        const objectImageUrl = await scanService.uploadImage(req.file, 'user-image', userId);
        // console.log('controller: saving image from controller king');
        const savedImage = await scanService.saveImage(objectImageUrl, objectName, userId);
        res.status(201).json({ message: 'Image uploaded and saved successfully.' , data: savedImage});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHistoryMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await scanService.getHistoryMe(userId);
        res.status(200).json({ message: 'History fetched succesfully', data: history})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getSugarByDatasetId = async (req, res) => {
    try {
        const datasetId = req.params.id;
        const scanDataset = await scanService.getSugarByDatasetId(datasetId);
        res.status(200).json({ message: 'Food Dataset fetched succesfully', sugar: scanDataset });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    uploadImageAndSave,
    getHistoryMe,
    getSugarByDatasetId
}