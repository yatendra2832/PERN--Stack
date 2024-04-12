import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../components/StarRating";
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
      <div className=" text-center" id="restaurant_details">
        {" "}
        <h1 className="fw-semibold fs-1">Restaurant Details</h1>
        <div>
          <h1 className="fw-bold text-danger">{selectedRestaurant.name}</h1>
          {selectedRestaurant && <StarRating rating={2.1} />}
        </div>
        <h2>{selectedRestaurant.location}</h2>
        <h3 className="text-info">
          {" "}
          Price Range :{selectedRestaurant.price_range}
        </h3>
      </div>
    </>
  );
};

export default RestaurantDetails;
