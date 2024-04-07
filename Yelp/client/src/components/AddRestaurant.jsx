import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantContext);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithPriceRange = {
        ...formData,
        price_range: parseInt(formData.priceRange, 10),
      };
      const response = await RestaurantFinder.post("/", formDataWithPriceRange);
      
      if (response.status === 200) {
        addRestaurants(response.data.data)
        setFormData({ name: "", location: "", priceRange: "" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              id="country"
              name="priceRange"
              required
              value={formData.priceRange}
              onChange={handleChange}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col-md-3 ">
            <button type="submit" className="btn btn-primary w-50">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
