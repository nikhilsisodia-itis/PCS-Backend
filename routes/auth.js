// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('mssql');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { phoneNumber, email, dateOfBirth, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
        INSERT INTO Users (phoneNumber, email, dateOfBirth, password)
        VALUES ('${phoneNumber}', '${email}', '${dateOfBirth}', '${hashedPassword}')
    `;

    try {
        await sql.query(query);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
});

router.post('/login', async (req, res) => {
    const { phoneNumber, password } = req.body;

    const query = `SELECT * FROM Users WHERE phoneNumber = '${phoneNumber}'`;

    try {
        const result = await sql.query(query);
        const user = result.recordset[0];

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
});

module.exports = router;