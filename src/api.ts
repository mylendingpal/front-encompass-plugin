import axios from 'axios';
import * as qs from 'qs';

const getAccessToken = async () => {
    try {
        const data = qs.stringify({
            'grant_type': 'password',
            'username': import.meta.env.VITE_ENCOMPASS_USERNAME,
            'password': import.meta.env.VITE_ENCOMPASS_PASSWORD,
            'client_id': import.meta.env.VITE_ENCOMPASS_CLIENT_ID,
            'client_secret': import.meta.env.VITE_ENCOMPASS_CLIENT_SECRET,
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.elliemae.com/oauth2/v1/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        const response = await axios.request(config);
        return response.data.access_token;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error getting access token:', error.response ? error.response.data : error.message);
        } else {
            console.error('Unexpected error:', error);
        }
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
        if (axios.isAxiosError(error)) {
            console.error('Error fetching loan data:', error.response ? error.response.data : error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw new Error('Failed to fetch loan data');
    }
};

export { searchLoan };
