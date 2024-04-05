import React from "react";

const AddRestaurant = () => {
  return (
    <div className="container mt-4">
      <form>
        <div className="row">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
            />
          </div>
          <div className="col-md-3">
            <select className="form-select" id="country" required>
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
            <div className="invalid-feedback">
              Please select a valid country.
            </div>
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
