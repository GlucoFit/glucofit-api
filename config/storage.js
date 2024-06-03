const { Storage } = require('@google-cloud/storage');
const path = require('path');

const serviceKey = path.join(__dirname, 'serviceAccountKey.json');

// For development using local service account key
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'capstone-playground-423804',
});

// For production using compute engine service account key
// const storage = new Storage();
const bucketName = 'glucofit-test-bucket';
const bucket = storage.bucket(bucketName);

module.exports = bucket;
