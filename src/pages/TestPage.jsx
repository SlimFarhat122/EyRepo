import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import merge from 'deepmerge';
import { Button, Typography, Card, CardHeader, CardBody, IconButton, Input } from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { DocumentMagnifyingGlassIcon, FlagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const images = [
  "/amen.jpg",
  "/atb.jpg",
  "/biat.jpeg",
  "/bt.jpg",
  "/monopriix-logo.jpg",
  "/sg.png",
  "/tt.jpg",
];
const AreaChart = ({ height = 90, series, colors, options }) => {
  const chartOptions = React.useMemo(
    () => ({
      colors,
      ...merge(
        {
          chart: {
            height: height,
            type: 'area',
            zoom: { enabled: false },
            toolbar: { show: false },
          },
          title: { show: '' },
          dataLabels: { enabled: false },
          legend: { show: false },
          markers: {
            size: 0,
            strokeWidth: 0,
            strokeColors: 'transparent',
          },
          stroke: {
            curve: 'smooth',
            width: 2,
          },
          grid: {
            show: false,
            xaxis: { lines: { show: false } },
            padding: { top: 0, right: 0, left: 0, bottom: 0 },
          },
          tooltip: {
            theme: 'dark',
            y: {
              formatter: (value) => `${value.toFixed(2)} DT`,
            },
          },
          yaxis: { labels: { show: false } },
          xaxis: {
            axisTicks: { show: false },
            axisBorder: { show: false },
            labels: { show: false },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.4,
              opacityTo: 0.6,
              stops: [0, 100],
            },
          },
        },
        options || {}
      ),
    }),
    [height, colors, options]
  );

  return <Chart type="area" height={height} series={series} options={chartOptions} />;
};

const TablesExample8 = () => {
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('light');
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch assets from the backend
  useEffect(() => {
    async function fetchAssets() {
      try {
        const response = await fetch('http://localhost:5136/api/tableau'); // Correct API endpoint
        const data = await response.json();
        setFilteredAssets(data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAssets();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearch(query);

    if (query.trim() === '') {
      setFilteredAssets(filteredAssets);
    } else {
      setFilteredAssets(
        filteredAssets.filter((item) =>
          item.digitalAsset.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };


  
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className={`m-10 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <section className="m-10">
        <Card className="h-full w-full dark:bg-gray-900 dark:text-white">
          <CardHeader floated={false} shadow={false} className="rounded-none flex flex-wrap gap-4 justify-between mb-4 dark:bg-gray-800">
            <div>
              <Typography variant="h1" color="blue-gray" className="dark:text-white">
                Tunisienne Stock Market Overview
              </Typography>
            </div>
            <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#E3A008] dark:bg-gray-700 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] dark:shadow-[2px_2px_20px_rgba(255,255,255,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
              <div className="flex items-center justify-center fill-white dark:fill-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                  <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for an asset..."
                value={search}
                onChange={handleSearch}
                className="outline-none text-[20px] bg-transparent w-full text-white dark:text-gray-300 font-normal px-4"
              />
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll !px-0 py-2 dark:bg-gray-800">
            <table className="w-full min-w-max table-auto dark:bg-gray-800">
              <thead>
                <tr>
                  {[
                    { head: 'Digital Asset', customeStyle: '!text-left' },
                    { head: 'Price', customeStyle: 'text-right' },
                    { head: 'Change', customeStyle: 'text-right' },
                    { head: 'Volume', customeStyle: 'text-right' },
                    { head: 'Market Cap', customeStyle: 'text-right' },
                    { head: 'Trend', customeStyle: 'text-right' },
                  ].map(({ head, customeStyle }) => (
                    <th key={head} className={`border-b border-gray-300 !p-4 pb-8 ${customeStyle} dark:border-gray-600`}>
                      <Typography variant="small" className="!font-bold dark:text-white">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((row, index) => {
                    const isLast = index === filteredAssets.length - 1;
                    const classes = isLast ? '!p-4' : '!p-4 border-b border-gray-300 dark:border-gray-600';
                    const trendData = Array.from({ length: 9 }, () => Math.floor(Math.random() * 800) + 100);
                    return (
                      <tr key={row.digitalAsset}>
                        <td className={classes}>
                          <div className="flex items-center gap-4 text-left">
                            <img src={images[index % images.length]} alt={row.digitalAsset} className="border rounded-md p-1 h-10 w-10" />
                            <div>
                              <Typography variant="small" color="blue-gray" className="!font-semibold dark:text-white">
                                {row.digitalAsset}
                              </Typography>
                              <Typography variant="small" className="!font-normal text-gray-600 dark:text-gray-300">
                                {row.detail}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" className="text-right dark:text-white">
                            {row.price}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" className={`text-right ${row.color === 'green' ? 'text-green-500' : 'text-red-500'}`}>
                            {row.change}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" className="text-right dark:text-white">
                            {row.volume}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" className="text-right dark:text-white">
                            {row.market}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="max-w-[12rem] ml-auto h-12 -translate-y-6">
                            <AreaChart colors={['#2196F373']} options={{}} series={[{ name: 'Trend', data: trendData }]} />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-3 text-center dark:text-white">
                      No assets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </section>
    </section>
  );
};

export default TablesExample8;
