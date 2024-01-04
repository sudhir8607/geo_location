const express = require('express');
 const axios = require('axios');

 const app = express();
 const PORT = 3000;

 app.use(express.json());

 app.post('/get-address', async (req, res) => {
   const { latitude, longitude } = req.body;


   const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Replace with your API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

         

   try {
     const response = await axios.get(url);

     if (response.status === 200) {
       const data = response.data;
       if (data.status === 'OK') {
         const addressComponents = data.results[0].address_components;
         const city = addressComponents.find(component => component.types.includes('locality'))?.long_name || null;
         const address = data.results[0].formatted_address;
         const pincode = addressComponents.find(component => component.types.includes('postal_code'))?.long_name || null;
         const responseObject = {
           City: city,
           Address: address,
           'Pin code': pincode,
         };

         res.json(responseObject);
       } else {
         res.status(404).json({ error: 'No results found' });
       }
     } else {
       res.status(500).json({ error: 'Request failed' });
     }
   } catch (error) {
     res.status(500).json({ error: `Request failed: ${error.message}` });
   }
 });

 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 });
