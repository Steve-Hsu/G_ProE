const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB (Database)
connectDB();

// Init Middleware for testing to send body in JSON
app.use(express.json({ extended: false }));

//EndPoint
app.get('/', (req, res) =>
  res.json({
    msg:
      "Welcome to the World Steve, I'm so exciting for this wonderful project",
  })
);

// Defines Routes -------------------
// Authentication
app.use('/api/company', require('./routes/company'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
// Papers
app.use('/api/bom', require('./routes/bom'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
