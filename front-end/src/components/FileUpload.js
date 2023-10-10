import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PdfPreview from './PdfPreview';
import PageSelector from './PageSelector';
import DownloadLink from './DownloadLink';
import ReorderPages from './ReorderPages'; // Import the ReorderPages component
import '../App.css'; // Import app.css for component-specific styling

function FileUpload() {
  const [file, setFile] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [newPdfUrl, setNewPdfUrl] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the file input element

  const handleFileButtonClick = () => {
    // Programmatically trigger a click event on the hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setSelectedPages([]);
    setPdfPreview(null);
  };

  const handlePageSelection = (pageNumber) => {
    if (selectedPages.includes(pageNumber)) {
      setSelectedPages(selectedPages.filter((page) => page !== pageNumber));
    } else {
      setSelectedPages([...selectedPages, pageNumber]);
    }
  };

  const handleClearSelection = () => {
    setSelectedPages([]);
  };

  const handleReorder = (reorderedPages) => {
    setSelectedPages(reorderedPages);
  };

  const handleCreatePdf = async () => {
    if (!file || selectedPages.length === 0) return;

    const formData = new FormData();
    formData.append('pdfFile', file);
    formData.append('selectedPages', JSON.stringify(selectedPages));

    try {
      const response = await axios.post('/api/create-pdf', formData, {
        responseType: 'blob',
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setNewPdfUrl(pdfUrl);
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  };

  useEffect(() => {
    if (file) {
      const pdfUrl = URL.createObjectURL(file);
      setPdfPreview(pdfUrl);
    }
  }, [file]);

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the file input element
      />
      {/* Styled button for file input selection */}
      <button className="upload-btn" onClick={handleFileButtonClick}>
        Choose File
      </button>
      {file && <PdfPreview pdfUrl={pdfPreview} onClearSelection={handleClearSelection} />}
      {file && (
        <PageSelector
          pages={Array.from({ length: file.numPages }, (_, i) => i + 1)}
          selectedPages={selectedPages}
          onSelect={handlePageSelection}
        />
      )}
      {selectedPages.length > 0 && (
        <div>
          <ReorderPages selectedPages={selectedPages} onReorder={handleReorder} />
          <button className="upload-btn" onClick={handleCreatePdf}>
            Create New PDF
          </button>
        </div>
      )}
      {newPdfUrl && <DownloadLink pdfUrl={newPdfUrl} />}
    </div>
  );
}

export default FileUpload;
