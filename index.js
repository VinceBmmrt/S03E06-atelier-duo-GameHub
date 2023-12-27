const express = require('express');
const app = express();

const PORT = 3000;

const loggerMw = require('./app/middlewares/logger');
const notFound = require('./app/middlewares/notFound');
const router = require('./app/router');

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('public'));

app.use(loggerMw);

app.use(router)

app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server is listening @http://localhost:${PORT}`)
});