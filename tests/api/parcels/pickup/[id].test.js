import axios from 'axios';
import handler from '../../pages/api/parcels/pickup/[id]';

jest.mock('axios');

describe('/api/parcels/pickup/[id]', () => {
  it('handles parcel pickup on POST', async () => {
    const req = {
      method: 'POST',
      query: { id: '1' },
    };
    const res = { status: jest.fn(() => res), json: jest.fn() };

    // Mock the axios response for successful parcel pickup
    axios.post.mockResolvedValue({ status: 200, data: { message: 'Parcel picked up successfully' } });

    await handler(req, res);


    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Parcel picked up successfully' });
  });

  it('returns method not allowed for non-POST requests', async () => {
    const req = {
      method: 'GET',
      query: { id: '1' },
    };
    const res = { setHeader: jest.fn(), status: jest.fn(() => res), end: jest.fn() };

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith('Allow', ['POST']);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalledWith('Method GET Not Allowed');
  });

});
