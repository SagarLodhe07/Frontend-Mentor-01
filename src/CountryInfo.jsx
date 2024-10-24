import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { HiArrowNarrowLeft } from "react-icons/hi";

const CountryInfo = ({ toggleMode, darkmode }) => {

  const navigate =useNavigate()
  const location = useLocation();
  const { country } = location.state;
  console.log(country);

  const formattedNum = (num) => {
    return num.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  };
  return (
    <>
      <div className={`w-full h-screen font-nunito-sans ${darkmode ? "bg-[#202c37] text-white":"bg-[#fafafa]"}`}>
        <Navbar darkmode={darkmode} toggleMode={toggleMode} />

          <button className={ ` ${darkmode? "bg-[#2b3945]":"bg-[#fafafa]"} px-4 py-2   shadow-2xl mt-10 ml-20 rounded-md flex justify-center items-center gap-4 cursor-pointer`} onClick={()=>{navigate("/")}}>
          <HiArrowNarrowLeft />
            Back
          </button>
        <div className="h-[450px] grid md:grid-cols-2 grid-cols-1 gap-4 mx-10 mt-10">
          <div className="">
            <img
              src={country?.flag}
              alt={`${country?.flag} name`}
              className="w-[600px] h-96"
            />
          </div>
          <div className=" flex justify-start items-center">
            <div className="">
              <h1 className="font-bold text-2xl">{country?.name}</h1>
              <div className="h-64 w-[600px] mx-auto mt-24 grid gap-0 grid-cols-2">
                <h1 className="font-bold">
                  Native Name:{" "}
                  <span className="font-normal">{country?.nativeName}</span>
                </h1>

                <h1 className="font-bold">
                  Population:{" "}
                  <span className="font-normal">
                    {formattedNum(country?.population)}
                  </span>
                </h1>

                <h1 className="font-bold">
                  Region: <span className="font-normal">{country?.region}</span>
                </h1>

                <h1 className="font-bold">
                  Sub Region:{" "}
                  <span className="font-normal">{country?.subregion}</span>
                </h1>

                <h1 className="font-bold">
                  Capital:{" "}
                  <span className="font-normal"> {country?.capital}</span>
                </h1>

                <h1 className="font-bold">
                  Top Level Domain:{" "}
                  <span className="font-normal">
                    {" "}
                    {country?.topLevelDomain[0]}
                  </span>
                </h1>

                <h1 className="font-bold">
                  Currecies:{" "}
                  <span className="font-normal">
                    {country?.currencies[0]?.name}
                  </span>
                </h1>

                <h1 className="font-bold">
                  Languages:{" "}
                  <span className="font-normal">
                    {country?.languages[0]?.name}
                  </span>
                </h1>

                <div className="flex justify-start items-center w-[600px] overflow-auto ">
                  <h1 className="font-bold">Borders Countries</h1>

                  
                  {country?.borders?.length > 0 ? (
                    country?.borders?.map((c, i) => {
                      return (
                         <li
                          key={i}
                          className={`${darkmode? "bg-[#2b3945]":"bg-[#fafafa]"} list-none border-2 px-4 m-4 rounded-md text-xs`}
                        >
                          {c}
                        </li>
                      );
                    })
                  ) : (
                    <p className="mx-10 text-md">No border countries</p>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryInfo;
