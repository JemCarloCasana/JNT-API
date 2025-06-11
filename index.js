const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/track', async (req, res) => {
  const awb = req.query.awb;
  if (!awb) return res.status(400).json({ error: 'Missing awb query parameter' });

  try {
    // You're using afzafri's API via PHP here
    const response = await axios.get(`https://raw.githubusercontent.com/afzafri/JNT-Express-Tracking-API/master/api.php?trackingNo=${awb}`);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tracking info' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
