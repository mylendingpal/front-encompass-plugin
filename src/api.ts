import axios from 'axios';

const getAccessToken = async () => {
  try {
    const response = await axios.post('https://api.elliemae.com/oauth2/v1/token', {
      grant_type: 'client_credentials',
      client_id: import.meta.env.VITE_ENCOMPASS_CLIENT_ID,
      client_secret: import.meta.env.VITE_ENCOMPASS_CLIENT_SECRET,
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get access token');
  }
};

const searchLoan = async (loanNumber: string) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`https://api.elliemae.com/encompass/v3/loans/${loanNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching loan data:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch loan data');
  }
};

export { searchLoan };
