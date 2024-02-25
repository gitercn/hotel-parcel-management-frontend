import axios from 'axios';
import handler from '../../pages/api/guests/[guestId]/parcels';

jest.mock('axios');

describe('/api/guests/[guestId]/parcels', () => {
  it('fetches parcels for a guest on GET', async () => {
    const guestId = '1';
    const req = {
      method: 'GET',
      query: { guestId },
    };
    const res = { status: jest.fn(() => res), json: jest.fn() };

    // Mock the axios response for fetching parcels
    const parcels = [
      { id: '1', guestId: guestId, description: 'Box' },
      // ... other parcel data
    ];
    axios.get.mockResolvedValue({ status: 200, data: parcels });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(parcels);
  });

  it('returns method not allowed for non-GET requests', async () => {
    const guestId = '1';
    const req = {
      method: 'POST',
      query: { guestId },
    };
    const res = { setHeader: jest.fn(), status: jest.fn(() => res), end: jest.fn() };

    await handler(req, res);


    expect(res.setHeader).toHaveBeenCalledWith('Allow', ['GET']);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalledWith('Method POST Not Allowed');
  });

});
