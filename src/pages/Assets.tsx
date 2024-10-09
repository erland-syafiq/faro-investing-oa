import React, { useState, useEffect } from 'react';
import stockData from '../assets/stocks.json';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

interface Stock {
  stockName: string;
  industry: string;
  peRatio: number;
  price: number;
}

const Assets: React.FC = () => {
  const [data, setData] = useState<Stock[]>(stockData);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Stock; direction: 'ascending' | 'descending' } | null>(null);
  const [filterName, setFilterName] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const navigate = useNavigate();
  
  const authService = AuthService.Instance;

  if (!authService.isAuthorized()) 
    navigate("/");


  // Sort the data based on the sortConfig
  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  // Handle sorting
  const requestSort = (key: keyof Stock) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter stocks based on the input
  useEffect(() => {
    const filteredData = stockData.filter(
      (stock) =>
        stock.stockName.toLowerCase().includes(filterName.toLowerCase()) &&
        stock.industry.toLowerCase().includes(filterIndustry.toLowerCase())
    );
    setData(filteredData);
  }, [filterName, filterIndustry]);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Assets</h1>

      <div className="mb-4">
        <label className="mr-2">Filter by Stock Name:</label>
        <input
          type="text"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="mr-2">Filter by Industry:</label>
        <input
          type="text"
          value={filterIndustry}
          onChange={(e) => setFilterIndustry(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th
              onClick={() => requestSort('stockName')}
              className="p-4 border-b cursor-pointer">
              Stock Name
            </th>
            <th
              onClick={() => requestSort('industry')}
              className="p-4 border-b cursor-pointer">
              Industry
            </th>
            <th
              onClick={() => requestSort('peRatio')}
              className="p-4 border-b cursor-pointer">
              P/E Ratio
            </th>
            <th
              onClick={() => requestSort('price')}
              className="p-4 border-b cursor-pointer">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((stock) => (
            <tr key={stock.stockName}>
              <td className="p-4 border-b">{stock.stockName}</td>
              <td className="p-4 border-b">{stock.industry}</td>
              <td className="p-4 border-b">{stock.peRatio}</td>
              <td className="p-4 border-b">${stock.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assets;
