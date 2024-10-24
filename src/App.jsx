import React, { useState } from "react";
import Homepage from "./Homepage";
import { Route, Routes } from "react-router-dom";
import CountryInfo from "./CountryInfo";

const App = () => {
  const [darkmode, setDarkmode] = useState(false);
  const toggleMode = () => {
    setDarkmode(!darkmode);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Homepage darkmode={darkmode} toggleMode={toggleMode} />}
      />
      <Route
        path="/info"
        element={<CountryInfo darkmode={darkmode} toggleMode={toggleMode} />}
      />
    </Routes>
  );
};

export default App;
