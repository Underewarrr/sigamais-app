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
    const email = req.body.email;
    const password = req.body.password;
  
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.length > 0) {
                if (result[0].password === password) {
                    res.status(200).send("Login realizado com sucesso");
                } else {
                    res.status(400).send("Senha incorreta");
                }
            } else {
                res.status(400).send("Usuário não existe");
            }
        }
        }
    );
  });


app.listen(3001,  () => {
    console.log('Server is running on port 3001');
});
