// models/Family.js
const sql = require('mssql');

const createFamilyTable = async () => {
    const query = `
        CREATE TABLE Families (
            id INT PRIMARY KEY IDENTITY,
            familyId UNIQUEIDENTIFIER DEFAULT NEWID(),
            userId INT FOREIGN KEY REFERENCES Users(id),
            numberOfChildren INT DEFAULT 0
        )
    `;
    await sql.query(query);
};

const createFamilyMembersTable = async () => {
    const query = `
        CREATE TABLE FamilyMembers (
            id INT PRIMARY KEY IDENTITY,
            familyId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Families(familyId),
            name VARCHAR(50) NOT NULL,
            age INT NOT NULL
        )
    `;
    await sql.query(query);
};

module.exports = { createFamilyTable, createFamilyMembersTable };