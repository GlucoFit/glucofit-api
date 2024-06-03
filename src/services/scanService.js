const {User, Scan} = require('../models');
const bucket = require('../../config/storage');

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

const saveImage = async (objectImageUrl, objectName, objectSugar, userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const scan = await Scan.create({objectImageUrl, objectName, objectSugar, userId});
    return scan;
}

const getHistoryMe = async (userId) => {
    const scans = await Scan.findAll({
        where: {userId},
        attributes: ['id', 'objectImageUrl', 'objectName', 'objectSugar', 'createdAt'],
        order: [['createdAt', 'DESC']]
    });

    return scans;
}

module.exports = {
    uploadImage,
    saveImage,
    getHistoryMe
};