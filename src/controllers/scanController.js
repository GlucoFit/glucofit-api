const scanService = require('../services/scanService');

const uploadImageAndSave = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        // console.log(req);
        const userId = req.user.id;
        const { objectName } = req.body; // Read from req.body
        let { objectSugar } = req.body;

        if (!objectName || !objectSugar) {
            return res.status(400).json({ error: 'Object name and object sugar are required.' });
        }

        objectSugar = parseInt(objectSugar, 10);
        if (isNaN(objectSugar)) {
            return res.status(400).json({ error: 'Object sugar must be a valid number.' });
        }

        const objectImageUrl = await scanService.uploadImage(req.file, 'user-image', userId);
        // console.log('controller: saving image from controller king');
        const savedImage = await scanService.saveImage(objectImageUrl, objectName, objectSugar, userId);
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

module.exports = {
    uploadImageAndSave,
    getHistoryMe
}