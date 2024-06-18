const {User, Scan, ScanDataset} = require('../models');
const bucket = require('../../config/storage');
const axios = require('axios')
const FormData = require('form-data')

const uploadImage = (file, folder = 'user-image', userId) => {
    return new Promise((resolve, reject) => {
        const blob = bucket.file(`${folder}/${Date.now()}_${userId}_${file.originalname}`);
        const blobStream = blob.createWriteStream({
            resumable: false
        });

        blobStream.on('error', (err) => {
            reject(err);
        });

        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
}

const saveImage = async (objectImageUrl, objectName, objectSugar, userId, datasetLabel) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const name = datasetLabel
    const dataset = await ScanDataset.findAll({
        where: {name}
    });
    const datasetId = dataset.id;

    const scan = await Scan.create({objectImageUrl, objectName, objectSugar, userId, datasetId});
    return scan;
}

const getHistoryMe = async (userId) => {
    const scans = await Scan.findAll({
        where: {userId},
        attributes: ['id', 'objectImageUrl', 'objectName', 'objectSugar', 'datasetId', 'createdAt'],
        order: [['createdAt', 'DESC']]
    });

    return scans;
}

const getSugarByDatasetId = async (datasetId) => {
    const dataset = await ScanDataset.findByPk(datasetId);
    if (!dataset) {
        throw new Error ('Food dataset not found');
    }
    return dataset;
}

const getSugarByDatasetLabel = async (datasetLabel) => {
    const name = datasetLabel
    let dataset = await ScanDataset.findAll({
        where: {name},
    });
    
    if (!dataset) {
        throw new Error ('Food dataset not found');
    }

    dataset = dataset.map(item => {
        return {
            ...item.dataValues,
            datasetLabel
        }
    });
    return dataset;
}
    
const deleteImageFromGCS = async (fileName) => {
    const fileNameModified = fileName.split('/').pop();
    const file = bucket.file(`user-image/${fileNameModified}`);
    await file.delete();
    console.log(`gs://${bucket.name}/user-image/${fileNameModified} deleted.`);
};

const deleteScanById = async (scanHistoryId) => {
    const scan = await Scan.findByPk(scanHistoryId);
    if (!scan) throw new Error('Scan History not found');
    await deleteImageFromGCS(scan.objectImageUrl);
    return scan.destroy();
}

const analyzeImage = async (file) => {
    try {
        const formData = new FormData();
        
        // Append the image file to the form data as a buffer
        formData.append('image', file.buffer, file.originalname);

        const response = await axios.post(process.env.WEBSERVICE_PREDICT_URL_PROD_IR, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw new Error('Failed to fetch recommendations');
    }
};

module.exports = {
    uploadImage,
    saveImage,
    getHistoryMe,
    getSugarByDatasetId,
    getSugarByDatasetLabel,
    deleteScanById,
    analyzeImage
};