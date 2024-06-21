# Glucofit API

GlucoFit is a mobile app designed to combat diabetes in Indonesia by empowering users with tools for informed dietary choices. Using advanced image recognition and personalized recommendations, GlucoFit helps users track their daily sugar intake and offers tailored recipes. This innovative solution promotes healthier eating habits, catering to Indonesian teenagers and adults aiming for a healthier lifestyle.

This repository is purposed for storing Glucofit Application backend using Express.js

## Table of Contents

- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running Migrations and Seeds](#running-migrations-and-seeds)
- [Usage](#usage)
- [Contributors](#contributors)
- [License](#license)

## Installation

Follow these steps to get a local copy of the project up and running:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your/repository.git
   cd repository
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   Create `.env` on project root and update the environment variables as needed.

   ```plaintext
   JWT_SECRET=[your value]
   
   NODE_ENV=development
   PORT=8080
   
   GOOGLE_CLIENT_ID=[your google client id]
   GOOGLE_CLIENT_SECRET=[your google client secret]
   
   JWT_SECRET=[your jwt secret]
   GCP_PROJECT_ID=[your gcp project id]
   GCP_BUCKET_NAME=[your gcp bucket name]
   
   WEBSERVICE_PREDICT_URL_MRS=[your value]
   WEBSERVICE_PREDICT_URL_PROD_MRS=https://flask-app-l76ziq6bya-et.a.run.app/predictMRS
   WEBSERVICE_PREDICT_URL_PROD_IR=https://ir-prediction-l76ziq6bya-et.a.run.app/predictIR
   WEBSERVICE_PREDICT_URL_PROD_RSI=https://rsi-prediction-l76ziq6bya-uc.a.run.app/predictRSI
   
   DB_USER=[your db user]
   DB_PASSWORD=[your db password]
   DB_NAME=[your db name]
   DB_HOST=[your db host]
   
   SERVICE_ACCOUNT_TYPE=service_account
   SERVICE_ACCOUNT_PROJECT_ID=[your service account project id]
   SERVICE_ACCOUNT_PRIVATE_KEY_ID=[your service account private key id]
   SERVICE_ACCOUNT_PRIVATE_KEY=[your service account private key]
   SERVICE_ACCOUNT_CLIENT_EMAIL=[your service account client email]
   SERVICE_ACCOUNT_CLIENT_ID=[your service account client id]
   SERVICE_ACCOUNT_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   SERVICE_ACCOUNT_TOKEN_ID=https://oauth2.googleapis.com/token
   SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
   SERVICE_ACCOUNT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/[your service account client email]
   SERVICE_ACCOUNT_UNIVERSE_DOMAIN=googleapis.com
   
   # DEV ONLY
   GOOGLE_API_KEY=[your google api key]
   GOOGLE_CX=[your google cx]
   ```

## Database Setup

1. **Install database dependencies:**

   Make sure you have XAMPP and MySQL installed and running. Update the database configuration in the `.env` file.

2. **Create the database:**

   ```bash
   npx sequelize db:create
   ```

## Running Migrations and Seeds

1. **Run migrations:**

   ```bash
   npx sequelize db:migrate
   ```

2. **Run seeders:**

   ```bash
   npx sequelize db:seed:all
   ```

## Usage

1. **Start the development server:**

   ```bash
   npm run start:dev
   ```

   The server will start on `http://localhost:8080`.

2. **Access the application:**

   Open your browser and go to `http://localhost:8080`. Or you can test it with postman/hopscotch tools. For API documentation please contact contributors.

## Contributors

- [Muhammad Rafif Tri Risqullah](https://github.com/zeon-kun)
- [Luqman Hidayat](https://github.com/luqmanhdyt)

## License

This project is non-licensed and open source. If you are interested to develop this into something greater - let us know !
