import React, { useState } from "react";
import StarRating from "./StarRating";

const AddReview = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    review: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(formData);
    // Clear form fields after submission
    setFormData({ name: "", rating: 0, review: "" });
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <select
              className="form-select"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="">Select rating</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="review" className="form-label">
            Your Review
          </label>
          <textarea
            className="form-control"
            id="review"
            name="review"
            rows="5"
            value={formData.review}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
