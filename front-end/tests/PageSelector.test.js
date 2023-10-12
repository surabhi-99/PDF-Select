// File: PageSelector.test.js

import React from 'react';
import { render } from '@testing-library/react';
import PageSelector from './PageSelector';

describe('PageSelector component', () => {
  it('renders without crashing', () => {
    render(<PageSelector pages={[1, 2, 3]} selectedPages={[1]} onSelect={() => {}} />);
  });
});
