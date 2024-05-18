import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
    const [loanNumber, setLoanNumber] = useState('');
    const [loanData, setLoanData] = useState(null);
    const [error, setError] = useState('');

    const searchLoan = async () => {
        try {
            const response = await axios.get(`/api/loans/${loanNumber}`);
            setLoanData(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching loan data:', error);
            setError('Failed to fetch loan data');
        }
    };

    return (
        <div>
            <h1>Encompass Loan Search</h1>
            <input value={loanNumber} onChange={(e) => setLoanNumber(e.target.value)} placeholder="Enter Loan Number" />
            <button onClick={searchLoan}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loanData && (
                <div>
                    <h2>Loan Data</h2>
                    <pre>{JSON.stringify(loanData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
