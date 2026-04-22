const express = require('express');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(express.json());
app.use(contactRoutes);

module.exports = app;