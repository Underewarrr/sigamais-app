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
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
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
        if (result.length > 0) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }
        else {
            db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], (err, result) => {
                if (err) {
                    return res.status(400).json({
                        message: 'Something went wrong'
                    });
                }
                return res.status(200).json({
                    message: 'User created'
                });
            });
        }
    });
});




app.listen(3001,  () => {
    console.log('Server is running on port 3001');
});