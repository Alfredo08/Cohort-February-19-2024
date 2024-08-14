const express = require('express');
const Todos = require('./../models/todoModel');
const validateToken = require('./../middlewares/validateToken');

const todoController = express.Router();

todoController.get('/todosByUser', validateToken, (req, res) => {
    const user_id = req.userInfo.id;
    Todos.getTodosByUser([user_id])
        .then(result => {
            return res.status(200).json({todos: result.rows});
        })
        .catch(err => {
            return res.status(500).json({message: "Something went wrong with the query"});
        });
});

module.exports = todoController;
