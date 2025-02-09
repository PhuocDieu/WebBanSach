const express = require('express');
const mongoose = require('mongoose');
const booksRoute = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use('/books', booksRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
