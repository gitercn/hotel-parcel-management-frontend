import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RegisterParcelModal from '../components/RegisterParcelModal';
import axios from 'axios';

// Mock axios for HTTP requests
jest.mock('axios');

describe('RegisterParcelModal', () => {
  it('calls the register API when submitting the form', () => {
    const onCloseMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <RegisterParcelModal onClose={onCloseMock} />
    );

    fireEvent.change(getByPlaceholderText(/parcel number/i), {
      target: { value: '123' },
    });
    fireEvent.change(getByPlaceholderText(/guest id/i), {
      target: { value: 'g1' },
    });
    fireEvent.click(getByText(/submit/i));

    expect(axios.post).toHaveBeenCalledWith('/api/parcels/register', {
      parcelNumber: '123',
      guest: { id: 'g1' },
      receptionistComment: '',
    });
  });

});
