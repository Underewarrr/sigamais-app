require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'sigamais'
});

// Public routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome'
    });
});

app.post('/auth/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: 'Passwords do not match'
        });
    }
    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'Please fill in all fields'
        });
    }
    if (password.length < 8) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters long'
        });
    }
    if (!email.includes('@')) {
        return res.status(400).json({
            message: 'Please enter a valid email address'
        });
    }
    if (username.length < 3) {
        return res.status(400).json({
            message: 'Username must be at least 3 characters long'
        });
    }
   // check if user exist
    const [user] = await db.query(
        'SELECT * FROM users WHERE username = ? OR email = ?',
        [username, email]
    );
    if (user) {
        return res.status(400).json({
            message: 'User already exists'
        });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // insert user into database
    try {
    const [result] = await db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );
    } catch (error) {
    if (result.affectedRows === 0) {
        return res.status(400).json({
            message: 'Something went wrong'
        });
    }
}
});


app.listen(3001,  () => {
    console.log('Server is running on port 3001');
});