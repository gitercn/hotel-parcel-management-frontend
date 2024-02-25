import axios from 'axios';
import handler from '../../pages/api/guests/check-in';

jest.mock('axios');

describe('/api/guests/check-in', () => {
  it('checks in a guest on POST', async () => {
    const req = {
      method: 'POST',
      body: { firstName: 'John', lastName: 'Doe', roomNumber: '101' },
    };
    const res = { status: jest.fn(() => res), json: jest.fn() };

    axios.post.mockResolvedValue({ status: 200, data: { id: 1, checkedIn: true } });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, checkedIn: true });
  });
});
