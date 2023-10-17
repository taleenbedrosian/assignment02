const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const productRoutes = require('./productRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the DressStore Application');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://tbedrosi:Fw7j1JjjMhtnRjt6@cluster0.x1hfhld.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

