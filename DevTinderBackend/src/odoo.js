// const axios = require('axios');

// // Odoo server connection details
// const url = 'http://34.126.214.157';  // Replace with your Odoo server URL
// const db = 'demo';  // Replace with your Odoo database name
// const username = 'admin';  // Replace with your Odoo username
// const password = 'admin';  // Replace with your Odoo password

// // Odoo API JSON-RPC endpoint
// const odooUrl = `${url}/jsonrpc`;

// // Function to authenticate and get the user session
// async function authenticate() {
//   const data = {
//     jsonrpc: '2.0',
//     method: 'call',
//     params: {
//       service: 'common',
//       method: 'login',
//       args: [db, username, password]
//     },
//     id: 1
//   };

//   try {
//     const response = await axios.post(odooUrl, data);
//     console.log('Authentication Response:', response.data, response);
//     if (response.data.result) {
//       console.log('Authenticated successfully!');
//       return response.data.result;  // Returning the user ID
//     } else {
//       console.error('Failed to authenticate');
//     }
//   } catch (error) {
//     console.error('Error during authentication:', error);
//   }
// }

// // Function to fetch data (e.g., list all partners)
// async function fetchPartners(userId) {
//   const data = {
//     jsonrpc: '2.0',
//     method: 'call',
//     params: {
//       service: 'object',
//       method: 'execute',
//       args: [db, userId, password, 'res.partner', 'search', [], ['name', 'email']]
//     },
//     id: 2
//   };

//   try {
//     const response = await axios.post(odooUrl, data);
//     console.log('Partners:', response.data.result);
//   } catch (error) {
//     console.error('Error fetching partners:', error);
//   }
// }

// // Main function to execute the flow
// async function main() {
//   const userId = await authenticate();
//   if (userId) {
//     await fetchPartners(userId);  // Fetch a list of partners (contacts)
//   }
// }

// main();
// // create data for odoo db and fetch details 
// // orm values inbuild funciton 

// // master data for user logged in to website
// // seprate database to connect 


const axios = require('axios');

// Odoo server connection details
const url = 'http://34.126.214.157';  // Replace with your Odoo server URL
const db = 'demo';  // Replace with your Odoo database name
const username = 'admin';  // Replace with your Odoo username
const password = 'admin';  // Replace with your Odoo password

// Odoo API JSON-RPC endpoint
const odooUrl = `${url}/jsonrpc`;

// Function to authenticate and get the user session
async function authenticate() {
  const data = {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      service: 'common',
      method: 'login',
      args: [db, username, password]
    },
    id: 1
  };

  try {
    const response = await axios.post(odooUrl, data);
    console.log('Authentication Response:', response.data);
    if (response.data.result) {
      console.log('Authenticated successfully!');
      return response.data.result;  // Returning the user ID
    } else {
      console.error('Failed to authenticate');
    }
  } catch (error) {
    console.error('Error during authentication:', error);
  }
}

// Function to create data (e.g., create a new partner)
async function createPartner(userId, partnerData) {
  const data = {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      service: 'object',
      method: 'execute',
      args: [
        db,  // Database name
        userId,  // User ID from authentication
        password,  // Password
        'res.partner',  // Model name (res.partner for partners)
        'create',  // ORM method to create a record
        partnerData  // The data to create a new partner
      ]
    },
    id: 3
  };

  try {
    const response = await axios.post(odooUrl, data);
    console.log('Partner Created:', response.data);
    return response.data.result;  // The ID of the newly created partner
  } catch (error) {
    console.error('Error creating partner:', error);
  }
}

// Function to fetch data (e.g., list all partners)
async function fetchPartners(userId) {
  const data = {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      service: 'object',
      method: 'execute',
      args: [db, userId, password, 'res.partner', 'search', [], ['name', 'email']]
    },
    id: 2
  };

  try {
    const response = await axios.post(odooUrl, data);
    console.log('Partners:', response.data.result);
  } catch (error) {
    console.error('Error fetching partners:', error);
  }
}

// Main function to execute the flow
async function main() {
  const userId = await authenticate();
  if (userId) {
    // Create a new partner record
    const partnerData = {
      name: 'John Doe',  // Name of the partner
      email: 'johndoe@example.com',  // Email of the partner
      company_type: 'person',  // Type of company (person or company)
      street: '123 Main St',  // Street address (optional)
      city: 'Metropolis',  // City (optional)
      zip: '12345'  // Postal code (optional)
    };
    const newPartnerId = await createPartner(userId, partnerData);

    // After creating the partner, fetch and log all partners
    if (newPartnerId) {
      console.log('New Partner ID:', newPartnerId);
      await fetchPartners(userId);
    }
  }
}

main();
