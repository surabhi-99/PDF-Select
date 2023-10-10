import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import '../App.css'; // Import app.css for component-specific styling

function PdfPreview({ pdfUrl, onClearSelection }) {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <h2>PDF Preview:</h2>
      <button className="upload-btn" onClick={onClearSelection}>Clear Selection</button>
      {pdfUrl && (
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages || 0 }, (_, i) => (
            <Page key={i + 1} pageNumber={i + 1} width={400} />
          ))}
        </Document>
      )}
    </div>
  );
}

export default PdfPreview;
