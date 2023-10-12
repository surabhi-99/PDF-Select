// FileUpload.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import FileUpload from './FileUpload';

test('FileUpload renders a file input', () => {
  render(<FileUpload />);
  const fileInputElement = screen.getByTestId('file-input');
  expect(fileInputElement).toBeInTheDocument();
});
