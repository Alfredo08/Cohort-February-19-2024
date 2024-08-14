const express = require('express');
const Users = require('./../models/userModel');
const bcrypt = require('bcrypt');
const SECRET = "this_must_be_secret";
const jwt = require("jsonwebtoken");
const validateToken = require('../middlewares/validateToken');

const userController = express.Router();

userController.post('/login', (req, res) => {
    const {email, password} = req.body;

    Users.getOne([email])
        .then((result) => {
            if(result.rows.length === 0){
                return res.status(404).json({message: "This email does not exists!"});
            }

            bcrypt.compare(password, result.rows[0].password)
                .then(bcryptResult => {
                    if(!bcryptResult){
                        return res.status(400).json({message: "Invalid credentials!"});
                    }

                    const payload = {
                        id: result.rows[0].id,
                        first_name: result.rows[0].first_name,
                        last_name: result.rows[0].last_name,
                        email: result.rows[0].email
                    }

                    jwt.sign(payload, SECRET, {expiresIn: '10m'}, (err, token) => {
                        if(err){
                            return res.status(400).json({message: "Something went wrong while generating the token!"})
                        }
                        return res.status(200).json({token});
                    });
                });
        });
});

userController.get('/verify', validateToken, (req, res) => {
    console.log("After middleware");
    return res.json(req.userInfo);
});

module.exports = userController;
