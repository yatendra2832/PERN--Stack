import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <>
      <div className="container mt-2">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {reviews.map((review) => {
            return (
              <div className="col" key={review.id}>
                <div className="card h-100 ">
                  <div className="card-header bg-primary text-white fs-4 d-flex justify-content-between align-items-center">
                    <span>{review.name}</span>
                    <span className="mx-4">
                      <StarRating rating={review.rating} />
                    </span>
                  </div>
                  <div className="card-body">
                    <p className="card-text ">{review.review}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Reviews;
