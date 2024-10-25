import axios from "axios";
import React, { useEffect, useState } from "react";
import {BiSearch,} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Homepage = ({toggleMode ,darkmode}) => {
  const [jsondata, setjsondata] = useState([]);
  const [region, setregion] = useState([]);
  const [input, setinput] = useState("");
  const [filteredData, setfilteredData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await axios.get("/data.json");
      console.log(res.data);
      setjsondata(res.data);
      setfilteredData(res.data);

      const uniqueRegions = [...new Set(res.data.map((item) => item.region))];
      setregion(uniqueRegions);
    })();
  }, []);


  const handleInput = (e) => {
    setinput(e.target.value);
  };
  const handleSubmit = (e) => {
    if (input) {
      const filterData = jsondata.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setfilteredData(filterData);
    } else {
      setfilteredData(jsondata);
    }
  };

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    if (selectedRegion) {
      const regionFilteredData = jsondata.filter(
        (item) => item.region === selectedRegion
      );
      setfilteredData(regionFilteredData);
    } else {
      setfilteredData(jsondata); // Show all data if no region is selected
    }
  };
  const formattedNum = (num) => {
    return num.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  };
  return (
    <div
      className={`h-full select-none p-10 ${
        darkmode ? "bg-[#202c37] text-white" : "bg-[#fafafa]"
      }`}
    >
      <div className="bg-red-400 sticky top-10 bg-transparent">
        {/* Nav */}

        <Navbar darkmode={darkmode} toggleMode={toggleMode} />

        {/* Search And Select Tag */}
        <div className="flex justify-between py-8 items-center">
          <div
            className={`flex justify-start items-center gap-3 p-4 w-96 h-16 shadow-xl rounded-md ${
              darkmode ? "bg-[#2b3945]" : "bg-[#fafafa]"
            }`}
          >
            <BiSearch
              size={24}
              onClick={handleSubmit}
              className="cursor-pointer"
            />
            <input
              type="text"
              value={input}
              onChange={handleInput}
              className={` w-full p-2 focus:outline-none ${
                darkmode ? "bg-[#2b3945]" : "bg-[#fafafa]"
              }`}
              placeholder="Search for a country"
            />
          </div>
          <div
            className={`md:w-72 md:h-16 p-2  flex justify-center items-center gap-3 shadow-lg rounded-md ${
              darkmode ? "bg-[#2b3945]" : "bg-[#fafafa]"
            } `}
          >
            <h1>Find by region</h1>
            <select
              name=""
              id=""
              onChange={handleRegionChange}
              className={`p-2 text-md rounded-md focus:outline-none  ${
                darkmode ? "bg-[#2b3945] text-white" : "bg-[#fafafa] text-black"
              }`}
            >
              {region.map((reg, i) => {
                return (
                  <option
                    key={i}
                    value={reg}
                    className={`p-2 text-md w-full ${
                      darkmode
                        ? "bg-[#2b3945] text-white"
                        : "bg-[#fafafa] text-black"
                    }`}
                  >
                    {reg}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div
        className={`w-full h-auto grid md:grid-cols-4 sm:grid-cols-2 gap-10 m-10 `}
      >
        {filteredData &&
          filteredData.map((country) => {
            return (
              <div
                onClick={() => navigate("/info", { state: { country } })}
                key={country.name}
                className={`shadow-xl rounded-xl overflow-hidden w-64 h-80  ${
                  darkmode ? "bg-[#2b3945]" : "bg-[#fafafa]"
                }`}
              >
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="w-full h-40 object-cover"
                />
                <h1 className="text-xl font-bold my-2 mx-4">{name}</h1>
                <div className="px-4">
                  <p className="text-md font-semibold">
                    {" "}
                    Population:{" "}
                    <span className="font-normal">
                      {formattedNum(country.population)}
                    </span>
                  </p>
                  <p className="text-md font-semibold">
                    {" "}
                    Region:{" "}
                    <span className="font-normal">{country.region}</span>{" "}
                  </p>
                  <p className="text-md font-semibold">
                    Capital:
                    <span className="font-normal"> {country.capital}</span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Homepage;
