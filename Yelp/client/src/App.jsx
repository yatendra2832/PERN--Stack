import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UpdatePage from "./components/UpdatePage";
import RestaurantDetails from "./components/RestaurantDetails";
function App() {
  return (
    <>
      <h1 className="text-center text-primary">Welcome to Yelp</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
          <Route path="/restaurants/:id/update" element={<UpdatePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
