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
    const email = req.body.email;
    const password = req.body.password;
  
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
       
            if (result.length > 0) {
                res.status(400).send("Usuário já existe");
            } else {
                db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send("Usuário criado com sucesso");
                    }
                });
        }
        }
    );
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
