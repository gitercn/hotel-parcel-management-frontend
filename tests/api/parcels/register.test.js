import axios from 'axios';
import handler from '../../pages/api/parcels/register';

jest.mock('axios');

describe('/api/parcels/register', () => {
  it('registers a parcel on POST', async () => {
    const req = {
      method: 'POST',
      body: {
        parcelNumber: '123',
        guest: { id: '1' },
        receptionistComment: 'Fragile'
      },
    };
    const res = { status: jest.fn(() => res), json: jest.fn() };

    // Mock the axios response
    axios.post.mockResolvedValue({ status: 200, data: { id: '1', message: 'Parcel registered successfully' } });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: '1', message: 'Parcel registered successfully' });
  });


});
