import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";
const UpdateRestaurant = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants } = useContext(RestaurantContext);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    priceRange: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    const response = await RestaurantFinder.get(`/${id}`);
    const { name, location, price_range } = response.data[0];
    setFormData({
      name: name || "",
      location: location || "",
      priceRange: price_range,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.put(`/${id}`, {
        ...formData,
        price_range: formData.priceRange,
      });
      if(response.status === 200){
        navigate('/')
      };
      
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group m-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group m-4">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group m-4">
          <label htmlFor="priceRange">Price Range</label>
          <input
            type="number"
            name="priceRange"
            id="priceRange"
            className="form-control"
            value={formData.priceRange}
            onChange={handleChange}
            min={1}
            max={5}
          />
        </div>
        <button className="btn btn-primary m-4">Submit</button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
