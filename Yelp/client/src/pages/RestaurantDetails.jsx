import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";
const RestaurantDetails = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);
  const [reviews, setReviews] = useState([]);

  const fetchRestaurant = async () => {
    try {
      const response = await RestaurantFinder.get(`/${id}`);
      setSelectedRestaurant(response.data.restaurant);
      setReviews(response.data.reviews);
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
          <h1 className="fw-bold text-danger">{selectedRestaurant.name} - {selectedRestaurant.location}</h1>
        </div>
        <h2></h2>
        <h3 className="text-info">
          {" "}
          Price Range :{selectedRestaurant.price_range}
        </h3>
        {selectedRestaurant && (
          <>
            <AddReview />
            <div className="mt-3">
              <h3 className="text-primary text-center">Our Reviews</h3>
              <Reviews reviews={reviews} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantDetails;
