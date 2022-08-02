require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome'
    });
});
app.listen(3001,  () => {
    console.log('Server is running on port 3001');
});