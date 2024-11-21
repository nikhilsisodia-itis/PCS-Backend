// index.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mssql = require('mssql');
const authRoutes = require('./routes/auth');
const familyRoutes = require('./routes/family');
const initializeDatabase = require('./initDB');

dotenv.config();

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_SERVER:', process.env.DB_SERVER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

const app = express();
app.use(bodyParser.json());

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

mssql.connect(config, err => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Database connected successfully');
        initializeDatabase();
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/family', familyRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});