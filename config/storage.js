const { Storage } = require('@google-cloud/storage');
require('dotenv').config()

// For development using local service account key
const storage = new Storage({
    keyFilename: {
       type: process.env.SERVICE_ACCOUNT_TYPE,
       project_id: process.env.GCP_PROJECT_ID,
       private_key_id: process.env.SERVICE_ACCOUNT_KEY_ID,
       private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
       client_email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
       auth_uri: process.env.SERVICE_ACCOUNT_AUTH_URI,
       token_uri: process.env.SERVICE_ACCOUNT_TOKEN_URI,
       auth_provider_x509_cert_url: process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
       client_x509_cert_url: process.env.SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
       universe_domain: process.env.SERVICE_ACCOUNT_UNIVERSE_DOMAIN
    },
    projectId: process.env.GCP_PROJECT_ID,
});

// For production using compute engine service account key
// const storage = new Storage();
const bucketName = process.env.GCP_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

module.exports = bucket;
