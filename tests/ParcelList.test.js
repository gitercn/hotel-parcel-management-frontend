import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ParcelList from '../components/ParcelList';
import { useQuery } from 'react-query';

// Mock the useQuery hook
jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

describe('ParcelList', () => {
  it('displays loading state initially', () => {
    useQuery.mockReturnValue({ isLoading: true });
    render(<ParcelList />);
    expect(screen.getByText(/loading guests/i)).toBeInTheDocument();
  });

  it('displays parcels once loaded', async () => {
    useQuery.mockReturnValue({
      isLoading: false,
      data: [
        {
          id: '1',
          guest: { checkOut: '2024-02-26' },
          parcels: [{ id: 'p1', parcelNumber: '123' }],
        },
      ],
    });
    render(<ParcelList />);
    await waitFor(() => {
      expect(screen.getByText(/123/i)).toBeInTheDocument();
    });
  });

});
