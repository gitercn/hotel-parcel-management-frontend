import axios from 'axios';
import handler from '../../pages/api/guests/checked-in';

jest.mock('axios');

describe('/api/guests/checked-in', () => {
  it('fetches checked-in guests on GET', async () => {
    const req = {
      method: 'GET'
    };
    const res = { status: jest.fn(() => res), json: jest.fn() };

    // Mock the axios response
    const guests = [
      { id: '1', name: 'John Doe', roomNumber: '101', checkIn: '2024-02-25', checkOut: '2024-02-28' },
    ];
    axios.get.mockResolvedValue({ status: 200, data: guests });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(guests);
  });

  it('returns method not allowed for non-GET requests', async () => {
    const req = {
      method: 'POST'
    };
    const res = { setHeader: jest.fn(), status: jest.fn(() => res), end: jest.fn() };

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith('Allow', ['GET']);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalledWith('Method POST Not Allowed');
  });

});
