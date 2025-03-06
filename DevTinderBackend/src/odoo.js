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
    await fetchPartners(userId);  // Fetch a list of partners (contacts)
  }
}

main();
