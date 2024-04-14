-- \l  list database
-- \c db_name connecting to database
-- CREATE DATABASE db_name
CREATE DATABASE yelp;
\c yelp;

CREATE TABLE restaurants (
id BIGSERIAL NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
location VARCHAR(50) NOT NULL,
price_range INT NOT NULL CHECK( price_range >= 1 AND price_range <= 5 )
);

-- Review table
CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating >=1 AND rating <=5)

);

-- Average rating
SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id ;