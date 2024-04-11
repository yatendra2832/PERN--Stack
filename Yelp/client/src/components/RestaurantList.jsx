import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";
import { Link, useNavigate } from "react-router-dom";

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await RestaurantFinder.get("/");
      setRestaurants(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRestaurantSelect = async (id) => {
    navigate(`/restaurants/${id}`);
  };
  return (
    <div className="table-responsive m-4">
      <table className="table  table-striped">
        <thead>
          <tr>
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr key={restaurant.id}>
                  <td onClick={() => handleRestaurantSelect(restaurant.id)}>
                    {restaurant.name}
                  </td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>reviews</td>
                  <td>
                    <Link
                      to={`/restaurants/${restaurant.id}/update`}
                      className="btn btn-warning"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(restaurant.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
