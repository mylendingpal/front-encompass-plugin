import React, { useState } from 'react';
import { fetchLoanData } from '../API';

const LoanData: React.FC = () => {
  const [loanNumber, setLoanNumber] = useState('');
  const [loanData, setLoanData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await fetchLoanData(loanNumber);
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

export default LoanData;
