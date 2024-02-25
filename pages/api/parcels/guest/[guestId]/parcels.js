import axios from 'axios';

export default async function handler(req, res) {
  const { guestId } = req.query;

  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}/guests/${guestId}/parcels`);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
