import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import merge from "deepmerge";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Input,
} from "@material-tailwind/react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  DocumentMagnifyingGlassIcon,
  FlagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

function AreaChart({ height = 90, series, colors, options }) {
  const chartOptions = React.useMemo(
    () => ({
      colors,
      ...merge(
        {
          chart: {
            height: height,
            type: "area",
            zoom: { enabled: false },
            toolbar: { show: false },
          },
          title: { show: "" },
          dataLabels: { enabled: false },
          legend: { show: false },
          markers: {
            size: 0,
            strokeWidth: 0,
            strokeColors: "transparent",
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          grid: {
            show: false,
            xaxis: { lines: { show: false } },
            padding: { top: 0, right: 0, left: 0, bottom: 0 },
          },
          tooltip: {
            theme: "dark",
            y: {
              formatter: (value) => `${value.toFixed(2)} DT`, // Formats price for Tunisian Dinars
            },
          },
                    yaxis: { labels: { show: false } },
          xaxis: {
            axisTicks: { show: false },
            axisBorder: { show: false },
            labels: { show: false },
          },
          fill: {
            type: "gradient",
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
}

const TABLE_ROW = [
  {
    img: "public/biat.jpeg",
    digitalAsset: "BIAT",
    detail: "Banque Internationale Arabe Tunisie",
    price: "97.30 DT",
    change: "+2.92%",
    volume: "2.8K",
    market: "3.97B",
    color: "green",
    trend: 4,
  },
  {
    img: "public/amen.jpg",
    digitalAsset: "AB",
    detail: "Amen Bank",
    price: "2.50 DT",
    change: "+1.15%",
    volume: "1.2K",
    market: "1.32B",
    color: "green",
    trend: 3,
  },
  {
    img: "public/atb.jpg",
    digitalAsset: "ATB",
    detail: "Attijari Bank",
    price: "34.20 DT",
    change: "-0.85%",
    volume: "3.5K",
    market: "2.45B",
    color: "red",
    trend: 2,
  },
  {
    img: "public/bt.jpg",
    digitalAsset: "BT",
    detail: "Banque de Tunisie",
    price: "23.80 DT",
    change: "+0.50%",
    volume: "2222.1K",
    market: "1.75B",
    color: "green",
    trend: 4,
  },
  {
    img: "public/tt.jpg",
    digitalAsset: "SOTETEL",
    detail: "Société Tunisienne d'Entreprises de Télécommunications",
    price: "7.60 DT",
    change: "+3.25%",
    volume: "4.8K",
    market: "380M",
    color: "green",
    trend: 5,
  },
  {
    img: "public/monopriix-logo.jpg",
    digitalAsset: "MNP",
    detail: "Monoprix",
    price: "5.4 DT",
    change: "-1.75%",
    volume: "1.9K",
    market: "270M",
    color: "red",
    trend: 1,
  },
];

const TABLE_HEAD = [
  { head: "Digital Asset", customeStyle: "!text-left" },
  { head: "Price", customeStyle: "text-right" },
  { head: "Change", customeStyle: "text-right" },
  { head: "Volume", customeStyle: "text-right" },
  { head: "Market Cap", customeStyle: "text-right" },
  { head: "Trend", customeStyle: "text-right" },
];

function TablesExample8() {
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState("light");

  const [filteredAssets, setFilteredAssets] = useState(TABLE_ROW);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearch(query);

    if (query.trim() === "") {
      setFilteredAssets(TABLE_ROW);
    } else {
      setFilteredAssets(
        TABLE_ROW.filter((item) =>
          item.digitalAsset.toLowerCase().includes(query.toLowerCase())
        )
      );
    }

  };
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <section className={`m-10 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <section className="m-10">
        <Card className="h-full w-full dark:bg-gray-900 dark:text-white">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none flex flex-wrap gap-4 justify-between mb-4 dark:bg-gray-800"
          >
            <div>
              <Typography variant="h1" color="blue-gray" className="dark:text-white">
                Tunisienne Stock Market Overview
              </Typography>
            </div>
           
            <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#E3A008] dark:bg-gray-700 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] dark:shadow-[2px_2px_20px_rgba(255,255,255,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
  <div className="flex items-center justify-center fill-white dark:fill-gray-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="22"
      height="22"
    >
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
                  {TABLE_HEAD.map(({ head, customeStyle }) => (
                    <th
                      key={head}
                      className={`border-b border-gray-300 !p-4 pb-8 ${customeStyle} dark:border-gray-600`}
                    >
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
                    const isLast = index === TABLE_ROW.length - 1;
                    const classes = isLast
                      ? "!p-4"
                      : "!p-4 border-b border-gray-300 dark:border-gray-600";
                    const trendData = Array.from({ length: 9 }, () =>
                      Math.floor(Math.random() * 800) + 100
                    );
                    return (
                      <tr key={row.digitalAsset}>
                        <td className={classes}>
                          <div className="flex items-center gap-4 text-left">
                            <img
                              src={row.img}
                              alt={row.digitalAsset}
                              className="border rounded-md p-1 h-10 w-10"
                            />
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="!font-semibold dark:text-white"
                              >
                                {row.digitalAsset}
                              </Typography>
                              <Typography
                                variant="small"
                                className="!font-normal text-gray-600 dark:text-gray-300"
                              >
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
                          <Typography
                            variant="small"
                            className={`text-right ${
                              row.color === "green" ? "text-green-500" : "text-red-500"
                            }`}
                          >
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
                            <AreaChart
                              colors={["#2196F373"]}
                              options={{}}
                              series={[{ name: "Trend", data: trendData }]}
                            />
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
}

export default TablesExample8;
