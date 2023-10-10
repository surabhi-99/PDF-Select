const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const pdf = require('./pdfUtils'); // Import the PDF utility module

const port = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.pdf`);
  },
});

const upload = multer({ storage: storage });

// Define a route for uploading PDF files
app.post('/upload', upload.single('pdf'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Successfully uploaded the file
    res.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Define a route to retrieve a stored PDF file
app.get('/pdf/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = `./uploads/${filename}`;

  if (fs.existsSync(filePath)) {
    // Serve the file for download
    res.download(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Define a route to extract selected pages from a PDF
app.post('/extract', async (req, res) => {
  try {
    const { filename, pages } = req.body;

    if (!filename || !pages || !Array.isArray(pages)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Read the uploaded PDF file
    const filePath = `./uploads/${filename}`;
    const pdfData = fs.readFileSync(filePath);

    // Extract selected pages using the PDF utility module
    const extractedPdfData = await pdf.extractPages(pdfData, pages);

    // Create and serve the extracted PDF
    const newFilename = `${filename.replace('.pdf', '')}_extracted.pdf`;
    const newFilePath = `./uploads/${newFilename}`;
    fs.writeFileSync(newFilePath, extractedPdfData);

    res.download(newFilePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
