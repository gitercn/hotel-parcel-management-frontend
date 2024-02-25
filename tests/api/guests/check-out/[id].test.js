import axios from 'axios';
import handler from '../../pages/api/guests/check-out/[id]';

jest.mock('axios');

describe('/api/guests/check-out/[id]', () => {
  it('checks out a guest on POST', async () => {
    const req = { method: 'POST', query: { id: '1' } };
    const res = { status: jest.fn(() => res), json: jest.fn() };

    axios.post.mockResolvedValue({ status: 200, data: { id: 1, checkedIn: false } });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, checkedIn: false });
  });
});
