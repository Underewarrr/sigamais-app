const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');


const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'dbpassword',
    database: 'dbname'
});



app.post("/register", (req, res) => {

    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, (err, result) => {
            if (result.length > 0) {
                reject({
                    error: "Email já cadastrado"
                });
            } else {
                db.query(`INSERT INTO users (email, password) VALUES ('${req.body.email}', '${req.body.password}')`, (err, result) => {
                    if (err) {
                        reject({
                            error: "Erro ao cadastrar usuário"
                        });
                    } else {
                        resolve({
                            message: "Usuário cadastrado com sucesso"
                        });
                    }
                });
            }
        });
    }).then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    });
});

app.post("/login", (req, res) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, (err, result) => {
            if (result.length > 0) {
                resolve({
                    message: "Usuário logado com sucesso"
                });
            } else {
                reject({
                    error: "Usuário ou senha incorretos"
                });
            }
        });
    }).then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    });
});


app.listen(3001,  () => {
    console.log('Server is running on port 3001');
});
