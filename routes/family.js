// routes/family.js
const express = require('express');
const sql = require('mssql');

const router = express.Router();

router.post('/add-family', async (req, res) => {
    const { userId, numberOfChildren } = req.body;

    const query = `
        INSERT INTO Families (userId, numberOfChildren)
        VALUES (${userId}, ${numberOfChildren})
    `;

    try {
        await sql.query(query);
        res.status(201).json({ message: 'Family added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding family', error: err });
    }
});

router.post('/add-family-member', async (req, res) => {
    const { familyId, name, age } = req.body;

    const query = `
        INSERT INTO FamilyMembers (familyId, name, age)
        VALUES ('${familyId}', '${name}', ${age})
    `;

    try {
        await sql.query(query);
        res.status(201).json({ message: 'Family member added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding family member', error: err });
    }
});

module.exports = router;