import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UnregisterParcelModal from '../components/UnregisterParcelModal';
import axios from 'axios';

// Mock axios for HTTP requests
jest.mock('axios');

describe('UnregisterParcelModal', () => {
  it('calls the unregister API when confirming unregistration', () => {
    const onCloseMock = jest.fn();
    const onConfirmMock = jest.fn();
    const { getByText } = render(
      <UnregisterParcelModal
        isOpen={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        selectedParcels={['p1']}
      />
    );

    fireEvent.click(getByText(/yes, unregister/i));

    expect(onConfirmMock).toHaveBeenCalledWith(['p1']);
  });

});
