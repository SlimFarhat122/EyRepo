// src/components/TableauTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableauTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5136/api/tableau');
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Loading state
  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Digital Asset</th>
              <th className="py-2 px-4 text-left">Price ($)</th>
              <th className="py-2 px-4 text-left">Change (%)</th>
              <th className="py-2 px-4 text-left">Market</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4">{item.digitalAsset}</td>
                <td className="py-2 px-4">{item.price}</td>
                <td
                  className="py-2 px-4"
                  style={{ color: item.color }}
                >
                  {item.change}%
                </td>
                <td className="py-2 px-4">{item.market}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableauTable;
