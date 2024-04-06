import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Homes";
import UpdatePage from "./pages/UpdatePage";
import RestaurantDetails from "./pages/RestaurantDetails";
import {RestaurantContextProvider} from "./context/RestaurantContext"
function App() {
  return (
    <>
      <RestaurantContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/restaurants/:id/update" element={<UpdatePage />} />
          </Routes>
        </Router>
      </RestaurantContextProvider>
    </>
  );
}

export default App;
