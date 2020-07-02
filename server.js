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

// Defines Routes ---------------------------------------------------------------
// Authentication -------------------------
// @Steve   --------------
// Only me access  - Register a company
app.use('/registercom', require('./routes/00_company'));

// @COMPANY --------------
// Compnay login
app.use('/api/auth/company', require('./routes/10_authCom'));
// Register a User
app.use('/api/users', require('./routes/11_users'));

// @Users   --------------
// User login
app.use('/api/auth/user', require('./routes/20_authUser'));
// Cases
app.use('/api/case', require('./routes/21_case'));
// Bom, it treat bom in the case and materials
app.use('/api/case/query', require('./routes/22_queryCase'));
// mPrice, extract materials & MIC from mtrl
app.use('/api/srmtrl', require('./routes/30_srMtrl'));
// mPrice Query
app.use('/api/srmtrl/query', require('./routes/31_querySrMtrl'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
