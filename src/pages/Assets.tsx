import React, { useState, useEffect } from 'react';
import stockData from '../assets/stocks.json';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import SortButton from '../components/SortButton';

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
    <div className="lg:p-8 p-6 bg-base">
      <div className='max-w-6xl mx-auto'>
        <div className="bg-primary h-3 w-24 mb-6"></div>
        <h1 className="text-6xl mb-4 font-raleway">Assets</h1>

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

        <table className="min-w-full bg-white border-collapse border border-gray-200 mt-8">
          <thead>
            <tr className='bg-primary font-raleway text-white'>
              <th className="p-4 border-b text-left">
                Stock Name
                <SortButton onClick={() => requestSort('stockName')} direction={sortConfig?.key === 'stockName' ? sortConfig.direction : null} />
              </th>
              <th className="p-4 border-b text-left">
                Industry
                <SortButton onClick={() => requestSort('industry')} direction={sortConfig?.key === 'industry' ? sortConfig.direction : null} />
              </th>
              <th className="p-4 border-b text-left">
                P/E Ratio
                <SortButton onClick={() => requestSort('peRatio')} direction={sortConfig?.key === 'peRatio' ? sortConfig.direction : null} />
              </th>
              <th className="p-4 border-b text-left">
                Price
                <SortButton onClick={() => requestSort('price')} direction={sortConfig?.key === 'price' ? sortConfig.direction : null} />
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
    </div>
  );
};

export default Assets;
