const express = require('express');
const userController = require('./controllers/userController');
const todoController = require('./controllers/todoController');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://localhost:3000' // This is our react client
}));

// Routes/Endpoints
app.use(userController);
app.use(todoController);

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});