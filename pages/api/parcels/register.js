import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { parcelNumber, guest: { id: guestId }, receptionistComment } = req.body;
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/parcels/register`, {
        parcelNumber,
        guest: {
          id: guestId
        },
        receptionistComment: receptionistComment
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
