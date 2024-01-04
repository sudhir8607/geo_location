// const express = require('express');
// const axios = require('axios');

// const app = express();
// const PORT = 3000;

// app.use(express.json());

// app.post('/get-address', async (req, res) => {
//   const { latitude, longitude } = req.body;


//  const apiKey = 'AIzaSyB0gOBg4sllDFnLgjchDRlD8v3u29yqo9s'; // Replace with your API key
//  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

         

//   try {
//     const response = await axios.get(url);

//     if (response.status === 200) {
//       const data = response.data;
//       if (data.status === 'OK') {
//         const addressComponents = data.results[0].address_components;
//         const city = addressComponents.find(component => component.types.includes('locality'))?.long_name || null;
//         const address = data.results[0].formatted_address;
//         const pincode = addressComponents.find(component => component.types.includes('postal_code'))?.long_name || null;

//         const responseObject = {
//           City: city,
//           Address: address,
//           'Pin code': pincode,
//         };

//         res.json(responseObject);
//       } else {
//         res.status(404).json({ error: 'No results found' });
//       }
//     } else {
//       res.status(500).json({ error: 'Request failed' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: `Request failed: ${error.message}` });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




// const axios = require('axios');
// const xlsx = require('xlsx');
// const fs = require('fs');
// const path = require('path');

// console.log('Absolute Path:', path.resolve(__dirname, 'index', 'files', 'Book1.xlsx'));

// const apiKey = 'AIzaSyB0gOBg4sllDFnLgjchDRlD8v3u29yqo9s'; // Replace with your API key
// //const inputXLSFile = path.join(__dirname, './files/Book1.xlsx');


// // Read latitude and longitude data from XLS file
// const workbook = xlsx.readFile('./files/Book1.xlsx');
// const sheetName = workbook.SheetNames[0];
// const sheet = workbook.Sheets[sheetName];
// const coordinates = xlsx.utils.sheet_to_json(sheet);

// // Function to get geolocation data for a pair of coordinates
// async function getGeolocationData(latitude, longitude) {
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

//   try {
//     const response = await axios.get(url);

//     if (response.status === 200) {
//       const data = response.data;
//       if (data.status === 'OK') {
//         const addressComponents = data.results[0].address_components;
//         const city = addressComponents.find(component => component.types.includes('locality'))?.long_name || null;
//         const address = data.results[0].formatted_address;
//         const pincode = addressComponents.find(component => component.types.includes('postal_code'))?.long_name || null;

//         return {
//           City: city,
//           Address: address,
//           'Pin code': pincode,
//         };
//       } else {
//         return { error: 'No results found' };
//       }
//     } else {
//       return { error: 'Request failed' };
//     }
//   } catch (error) {
//     return { error: `Request failed: ${error.message}` };
//   }
// }

// // Process each pair of coordinates
// async function processData() {
//   const results = [];

//   for (const { Latitude, Longitude } of coordinates) {
//     const geolocationData = await getGeolocationData(Latitude, Longitude);
//     results.push(geolocationData);
//   }

//   // Output the results
//   console.log(results);
// }

// // Call the main processing function
// processData();



// const express = require('express');
// const xlsx = require('xlsx');
// const axios = require('axios');

// const app = express();


//const apiKey = 'AIzaSyB0gOBg4sllDFnLgjchDRlD8v3u29yqo9s';

// app.get('/coordinates', async (req, res) => {
//   try {
//     // Read the Excel file
//     const workbook = xlsx.readFile('./files/Book1.xlsx');
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const coordinates = xlsx.utils.sheet_to_json(sheet);
//         console.log(coordinates);
//     // Process each pair of coordinates
//     const results = [];
//     for (const { Latitude, Longitude } of coordinates) {
//       const geolocationData = await getGeolocationData(Latitude, Longitude);
//       results.push(geolocationData);
//     }

//     // Send the results as the response
//     res.send(results);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });


// async function getGeolocationData(latitude, longitude) {
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

//   try {
//     const response = await axios.get(url);

//     if (response.status === 200) {
//       const data = response.data;
//       if (data.status === 'OK') {
//         const addressComponents = data.results[0].address_components;
//         const city = addressComponents.find(component => component.types.includes('locality'))?.long_name || null;
//         const address = data.results[0].formatted_address;
//         const pincode = addressComponents.find(component => component.types.includes('postal_code'))?.long_name || null;

//         return {
//           City: city,
//           Address: address,
//           'Pin code': pincode,
//         };
//       } else {
//         return { error: 'No results found' };
//       }
//     } else {
//       return { error: 'Request failed' };
//     }
//   } catch (error) {
//     return { error: `Request failed: ${error.message}` };
//   }
// }



// app.listen(3000, () => {
//   console.log('Listening on port 3000');
// });

const express = require('express');
const xlsx = require('xlsx');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
const apiKey = process.env.GOOGLE_MAPS_API_KEY;


app.get('/coordinates', async (req, res) => {
  try {
    // Read the Excel file
    const workbook = xlsx.readFile('./files/Book1.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const coordinates = xlsx.utils.sheet_to_json(sheet);
    
    // Log the coordinates
    console.log('Coordinates:', coordinates);

    // Process each pair of coordinates
    const results = [];
    for (const { latitude, longitude} of coordinates) {
      const geolocationData = await getGeolocationData(latitude, longitude);
      results.push(geolocationData);
      console.log({results})
    }
     
    // Send the results as the response
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

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
