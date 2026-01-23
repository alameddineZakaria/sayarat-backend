// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const sequelize = require('./config/db'); // Sequelize instance
 
const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads folder if not exist
if (!fs.existsSync(process.env.UPLOAD_DIR)) {
  fs.mkdirSync(process.env.UPLOAD_DIR, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.env.UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
app.get('/', (req, res) => res.send('Sayarat Backend Running'));

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

// Serve uploaded files
app.use('/files', express.static(path.join(__dirname, process.env.UPLOAD_DIR)));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', require('./routes'));
app.use('/function', require('./routes/generic-query-runner'));

// Start server after DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit if DB connection fails
  }
})();
