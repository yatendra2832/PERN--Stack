import React from "react";
import Headers from "../components/Headers";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantList from "../components/RestaurantList";

const Home = () => {
  return (
    <>
      <Headers />
      <AddRestaurant />
      <RestaurantList />
    </>
  );
};

export default Home;
