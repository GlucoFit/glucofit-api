const scanService = require('../services/scanService');

const uploadImageAndSave = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        
        console.log(req.body);
        console.log(req.file);

        const userId = req.user.id;
        const { objectName } = req.body;
        const { objectSugar } = req.body;
        const { datasetLabel } = req.body;

        if (!objectName) {
            return res.status(400).json({ error: 'Object name and object sugar are required.' });
        }
        // console.log('controller: saving image from controller king');
        const objectImageUrl = await scanService.uploadImage(req.file, 'user-image', userId);
        // console.log('controller: saving image from controller king');
        //========CHANGE THIS OBJECT SUGAR TO PREDICT FUNCTION LATER
        // const objectSugar = 0;
        const savedImage = await scanService.saveImage(objectImageUrl, objectName, objectSugar, userId, datasetLabel);
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

const getSugarByDatasetLabel = async (req,res) => {
    try {
        const datasetLabel = req.params.label;
        const scanDataset = await scanService.getSugarByDatasetLabel(datasetLabel);
        res.status(200).json({ message: 'Food Dataset fetched succesfully', sugar: scanDataset });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteScanById = async (req, res) => {
    try {
        const scanHistoryId = req.params.id;
        await scanService.deleteScanById(scanHistoryId);
        res.status(200).json({ message: 'Scan History with given id successfully deleted'})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const analyzeImage = async (req,res) => {
    try {
        const file = req.file
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        const data = await scanService.analyzeImage(file)
        res.status(200).json({data: data})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    uploadImageAndSave,
    getHistoryMe,
    getSugarByDatasetId,
    getSugarByDatasetLabel,
    deleteScanById,
    analyzeImage
}