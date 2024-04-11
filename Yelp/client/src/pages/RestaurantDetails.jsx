import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";
const RestaurantDetails = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);

  const fetchRestaurant = async () => {
    try {
      const response = await RestaurantFinder.get(`/${id}`);
      setSelectedRestaurant(response.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return (
    <>
      <h1>Restaurant Details</h1>
      <h1>{selectedRestaurant.name}</h1>
      <h1>{selectedRestaurant.location}</h1>
      <h1>{selectedRestaurant.price_range}</h1>
    </>
  );
};

export default RestaurantDetails;
