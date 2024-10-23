import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiMoon, BiSearch, BiSun } from "react-icons/bi";

const App = () => {
  const [jsondata, setjsondata] = useState([]);
  const [region, setregion] = useState([]);
  const [darkmode, setDarkmode] = useState(false);
  const [input, setinput] = useState("");

  useEffect(() => {
    (async () => {
      const res = await axios.get("/data.json");
      console.log(res.data);
      setjsondata(res.data);

      const uniqueRegions = [...new Set(res.data.map((item) => item.region))];
      setregion(uniqueRegions);
    })();
  }, []);

  const toggleMode = () => {
    setDarkmode(!darkmode);
  };
  const handleInput = (e) => {
    setinput(e.target.value);
  };
  const handleSubmit = (e) => {
    if (input) {
      const filterData = jsondata.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setjsondata(filterData);
    }
  };

  return (
    <div
      className={`w-full h-auto select-none ${
        darkmode ? "bg-[#202c37] text-white" : "bg-[#fafafa]"
      }`}
    >
      <div className="bg-red-400 sticky top-0 bg-transparent">
        {/* Nav */}
        <nav
          className={`
        flex justify-between items-center p-10 h-10 shadow-lg ${
          darkmode ? "bg-[#2b3945]" : "bg-[#fafafa]"
        }`}
        >
          {" "}
          <h1 className=" text-2xl font-nunito-sans font-semibold">
            Where in the world ?
          </h1>{" "}
          <div className={`flex items-center gap-3`}>
            <span onClick={toggleMode}>
              {" "}
              {darkmode ? <BiSun size={18} /> : <BiMoon size={18} />}
            </span>
            <span className="font-normal">
              {darkmode ? "Light Mode" : "Dark Mode"}{" "}
            </span>
          </div>
        </nav>
        {/* Search And Select Tag */}
        <div className="flex justify-between p-10 items-center">
          <div
            className={`flex justify-start items-center gap-3 p-4 w-96 h-16 shadow-xl rounded-md ${
              darkmode ? "bg-[#2b3945]" : "bg-[#fafafa]"
            }`}
          >
            <BiSearch size={24} onClick={handleSubmit} />
            <input
              type="text"
              value={input}
              onChange={handleInput}
              className={`w-full p-2 focus:outline-none ${
                darkmode ? "bg-[#2b3945]" : "bg-[#fafafa]"
              }`}
              placeholder="Search for a country"
            />
          </div>
          <div
            className={`w-72 h-16  flex justify-center items-center gap-3 shadow-lg rounded-md ${
              darkmode ? "bg-[#2b3945]" : "bg-[#fafafa]"
            } `}
          >
            <h1>Find by region</h1>
            <select
              name=""
              id=""
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
        className={`w-full h-auto grid md:grid-cols-4 sm:grid-cols-2 gap-10 m-10`}
      >
        {jsondata &&
          jsondata.map(({ name, population, region, capital, flag }, i) => {
            return (
              <div
                key={i}
                className={`shadow-xl rounded-xl overflow-hidden w-64 h-80  ${
                  darkmode ? "bg-[#2b3945]" : "bg-[#fafafa]"
                }`}
              >
                <img
                  src={flag}
                  alt="flag_image"
                  className="w-full h-40 object-cover"
                />
                <h1 className="text-xl font-bold my-2 mx-4">{name}</h1>
                <div className="px-4">
                  <p className="text-md font-semibold">
                    {" "}
                    Population:{" "}
                    <span className="font-normal">{population}</span>
                  </p>
                  <p className="text-md font-semibold">
                    {" "}
                    Region: <span className="font-normal">{region}</span>{" "}
                  </p>
                  <p className="text-md font-semibold">
                    Capital:
                    <span className="font-normal"> {capital}</span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
