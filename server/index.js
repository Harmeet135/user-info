const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/router');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use(router);

mongoose.set('strictQuery', true);

dotenv.config();

const CONNECTION_URL = process.env.DATABASE;
const PORT = process.env.PORT || 5000;

if (!CONNECTION_URL) {
  console.log('Missing DATABASE environment variable in the .env file');
  process.exit(1); // Exit the application if the variable is missing
}

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`);
    process.exit(1); // Exit the application if there's an error connecting
  });
