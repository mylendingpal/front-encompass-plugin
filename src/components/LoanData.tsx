import React, { useState } from 'react';
import { searchLoan } from '../API';  // Ensure the casing matches

interface LoanData {
    // Define the structure of loanData here. Example:
    loanNumber: string;
    borrowerName: string;
    loanAmount: number;
    // Add other fields as needed
}

const LoanDataComponent: React.FC = () => {
    const [loanNumber, setLoanNumber] = useState('');
    const [loanData, setLoanData] = useState<LoanData | null>(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const data = await searchLoan(loanNumber);
            setLoanData(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch loan data');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={loanNumber}
                onChange={(e) => setLoanNumber(e.target.value)}
                placeholder="Enter Loan Number"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            {loanData && <pre>{JSON.stringify(loanData, null, 2)}</pre>}
        </div>
    );
};

export default LoanDataComponent;
