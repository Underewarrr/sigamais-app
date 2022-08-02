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
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({
            message: 'Please fill all fields'
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {
        username,
        email,
        password: hashedPassword
    };
    // check if user already exists
    const userExists = await db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
       if (!email || !password) {
              return res.status(400).json({
                    message: 'Please fill all fields'
                });
            }

        if (result.length > 0) {
           return res.status(400).json({
               message: 'User already exists'
           });
       }
    const insertUser = db.query("INSERT INTO users SET ?", user, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong'
            });
        }
       if (result) {
           return res.status(201).json({
               message: 'User created'
           });
       }
    });
});

        

});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
        if (result.length === 0) {
            res.status(400).json({
                message: 'User does not exist'
            });
        }
        const user = result[0];
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                message: 'Incorrect password'
            });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(200).json({
            message: 'Logged in',
            token
        });
    })
})
app.listen(3001,  () => {
    console.log('Server is running on port 3001');
});