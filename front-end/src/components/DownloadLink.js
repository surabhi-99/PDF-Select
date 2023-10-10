import React from 'react';

function DownloadLink({ pdfUrl }) {
  return (
    <div>
      <h2>Download the New PDF:</h2>
      <a href={pdfUrl} download="new-pdf.pdf">
        Download New PDF
      </a>
    </div>
  );
}

export default DownloadLink;
