const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
const { json } = require('express');


app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '88147988rA@',
    database: 'sigamais'
});



app.post('/register/users_instagram', (req, res) => {
    const { email, username, codsecurity} = req.body;
    db.query("SELECT * FROM users_instagram WHERE email = ?", [email], (err, result) => {
        if (result.length > 0) {
            res.json({
                status: 'error',
                message: 'Email já cadastrado'
            });
        } else {
            db.query("INSERT INTO users_instagram (email, username, codsecurity) VALUES (?, ?, ?)", [email, username, codsecurity], (err, result) => {
                if (err) {
                    res.json({
                        status: 'error',
                        message: 'Erro ao cadastrar'
                    });
                } else {
                    res.json({
                        status: 'success',
                        message: 'Cadastrado com sucesso'
                    });
                }
            });
        }
    });
});

    
app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
       
            if (result.length > 0) {
                res.json({
                    status: 'error',
                    message: 'Email já cadastrado'
                });

            } else {
                db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], (err, result) => {
                    if (err) {
                        res.json({
                            status: 'error',
                            message: 'Erro ao cadastrar'
                        });
                    } else {
                        res.json({
                            status: 'success',
                            message: 'Cadastrado com sucesso'
                        });
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
            res.json({
                status: 'error',
                message: 'Erro ao logar'
            });
            
        } else {
            if (result.length > 0) {
                if (result[0].password === password) {
                    res.json({
                        status: 'success',
                        message: 'Login realizado com sucesso'
                    });

                } else {
                    res.json({
                        status: 'error',
                        message: 'Senha incorreta'
                    });

                }
            } else {
                res.json({
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
