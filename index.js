const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');

const app = express();
const PORT =  3000;

app.use(express.json());
app.use(morgan('dev'));

app.use(helmet());

app.use('/auth', authRoutes);


mongoose.connect('mongodb://localhost:27017/cureka', { useNewUrlParser: true, useUnifiedTopology: true });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



