import React from "react";
import { Link, useLocation } from "react-router-dom";

const ProductDetails = () => {
  const { state } = useLocation();
  console.log(state);
  const {title, category, price, description,images, rating, brand } = state;
  return (
    <div className="product-details">
      <h2>product details</h2>
      {state ? (
        <article className="product-details_article">
          <img src={images[0]} alt={title} className="product-details_img"/>
          <h3 className="product-details_title">{title}</h3>
          <p>
            <strong>Brand:</strong> {brand}
          </p>
          <p>
            <strong strong>Category:</strong>
            {category}
          </p>
          <p>
            <strong>Price:</strong> {price}
          </p>
          <p>
            <strong>Rating:</strong> {rating}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {description && description.substring(0, 100)}...
          </p>
          <Link to='/products' className="product_link">Continue Shoping</Link>
        </article>
      ) : (
        <p>No Product found</p>
      )}
    </div>
  );
};

export default ProductDetails;