// DownloadLink.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import DownloadLink from './DownloadLink';

test('DownloadLink renders a link', () => {
  render(<DownloadLink pdfUrl="sample.pdf" />);
  const linkElement = screen.getByText('Download PDF');
  expect(linkElement).toBeInTheDocument();
});
