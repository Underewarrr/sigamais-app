require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

const tokenSecret = process.env.TOKEN_SECRET;


const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'sigamais'
});

function authToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    // Bearer token (Token Format)
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
    return res.status(400).json({ error: 'Token não encontrado' });
    }
}

// Private routes
app.get('/users/:id', authToken, async (req, res) => {
    const { id } = req.params
    // get user id without password from database
db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    delete result[0].password;
        if (err) {
            return    res.status(500).send({
                error: err
            });
        } else {
            return    res.json({
                user: result[0]
            });
        }
    }); 
});

// Public routes
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome'
    });
});

app.post('/auth/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match'
            });
        }
        if (!email || !password) {
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
        if (result.length > 0) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }
        else {
            // Hash password
            // Insert user into database
            db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], (err, result) => {
                try {
                if (result) {
                    return res.status(200).json({
                        message: 'User created'
                    });
                }
                } catch (err) {
                    return res.status(400).json({
                        message: 'Something went wrong'
                    });
                }
            });
        }
    });
});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
        if (err) {
            return res.json({
                status: 'error',
                message: err
            });
            
        } else {
            if (result.length > 0) {
                if ((bcrypt.compareSync(password, result[0].password))) {
                    const token = jwt.sign({
                        id: result[0].id
                    }, tokenSecret, {
                        expiresIn: '1h'
                    });
                    return res.status(200).json({
                        status: 'success',
                        message: 'Login realizado com sucesso',
                        token: token
                    });

                } else {
                    return res.json({
                        status: 'error',
                        message: 'Senha incorreta'
                    });

                }
            } else {
                return res.json({
                    status: 'error',
                    message: 'Email não cadastrado'
                });
            }
        }
        }
    );
});           



app.listen(3001,  () => {
    console.log('Server is running on port 3001');
});