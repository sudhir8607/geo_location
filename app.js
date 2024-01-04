const express = require('express');
const xlsx = require('xlsx');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from a .env file

const app = express();
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

app.get('/coordinates', async (req, res) => {
  try {
    const coordinates = readExcelFile('./files/Book1.xlsx');
    //console.log('Coordinates:', coordinates);

    const results = await Promise.all(
      coordinates.map(async ({ latitude, longitude }) => {
        return await getGeolocationData(latitude, longitude);
      })
    );

    res.send(results);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

async function getGeolocationData(latitude, longitude) {
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

        return {
          City: city,
          Address: address,
          'Pin code': pincode,
        };
      } else {
        return { error: 'No results found' };
      }
    } else {
      return { error: 'Request failed' };
    }
  } catch (error) {
    return { error: `Request failed: ${error.message}` };
  }
}

function readExcelFile(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});