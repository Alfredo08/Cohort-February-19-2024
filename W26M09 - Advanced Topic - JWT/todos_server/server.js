const express = require('express');
const userController = require('./controllers/userController');
const todoController = require('./controllers/todoController');

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes/Endpoints
app.use(userController);
app.use(todoController);

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});