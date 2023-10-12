// PdfPreview.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import PdfPreview from './PdfPreview';

test('PdfPreview renders a PDF preview', () => {
  render(<PdfPreview pdfUrl="sample.pdf" />);
  const pdfPreviewElement = screen.getByTestId('pdf-preview');
  expect(pdfPreviewElement).toBeInTheDocument();
});
