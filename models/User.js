// models/User.js
const sql = require('mssql');

const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Users (
            id INT PRIMARY KEY IDENTITY,
            phoneNumber VARCHAR(15) NOT NULL,
            email VARCHAR(50) NOT NULL,
            dateOfBirth DATE NOT NULL,
            password VARCHAR(255) NOT NULL,
            isAdmin BIT DEFAULT 0,
            isApproved BIT DEFAULT 0
        )
    `;
    await sql.query(query);
};

module.exports = { createUserTable };