// File: ReorderPages.test.js

import React from 'react';
import { render } from '@testing-library/react';
import ReorderPages from './ReorderPages';

describe('ReorderPages component', () => {
  it('renders without crashing', () => {
    render(<ReorderPages pages={[1, 2, 3]} onReorder={() => {}} />);
  });
});
