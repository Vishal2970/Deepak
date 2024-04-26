const express = require('express');
const app = express();
const db = require('./db');
const userRoutes = require('./routes/userRoutes');
const cors = require("cors");

const corsOptions ={
    origin:"http://localhost:3000",
    method:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
  }
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
