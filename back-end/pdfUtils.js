const pdf = require('pdf-parse');

// Function to extract selected pages from a PDF
async function extractPages(pdfData, selectedPages) {
  try {
    const data = await pdf(pdfData);
    const totalPages = data.numPages;

    // Validate selected page numbers
    const validPages = selectedPages.filter((page) => page >= 1 && page <= totalPages);

    // Extract selected pages and concatenate them into a single PDF
    const pdfjs = require('pdfjs-dist');
    const doc = new pdfjs.Document();

    for (const page of validPages) {
      const pdfPage = await pdfjs.PDFPage.create(data, page);
      doc.addPage(pdfPage);
    }

    const extractedPdfData = await doc.asBuffer();

    return extractedPdfData;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  extractPages,
};
