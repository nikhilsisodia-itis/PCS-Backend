// initDB.js
const sql = require('mssql');
const { createUserTable } = require('./models/User');
const { createFamilyTable, createFamilyMembersTable } = require('./models/Family');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

const initializeDatabase = async () => {
    try {
        await sql.connect(config);
        await createUserTable();
        await createFamilyTable();
        await createFamilyMembersTable();
        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Database initialization failed: ', err);
    }
};

module.exports = initializeDatabase;