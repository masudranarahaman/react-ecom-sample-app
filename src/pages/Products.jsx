import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Sort from "../components/Sort";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // pagination
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // search
  const [searchTerm, setSearchTerm] = useState("");

  // sorting
  const [sortCriteria, setSortCriteria] = useState("");

  const fetchData = (currentPage, searchTerm, sortCriteria) => {
    setIsLoading(true);
    setError(null);
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;
    if (searchTerm !== "") {
      url = `https://dummyjson.com/products/search?q=${searchTerm}&limit=${itemsPerPage}&skip=${
        (currentPage - 1) * itemsPerPage
      }`;
    }
    if (sortCriteria) {
      // title-asc
      const spiltSortCriteria = sortCriteria.split("-");
      url += `&sortBy=${spiltSortCriteria[0]}&order=${spiltSortCriteria[1]}`;
    }
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Data could not be fetched");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData(currentPage, searchTerm, sortCriteria);
  }, [currentPage, searchTerm, sortCriteria]);

  //   const handleCurrentPage = (index) => {
  // setCurrentPage(index + 1)
  //   }
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); //reset the first page.
  };
  //  ## Search in the same page...
  // const filterProducts = products.filter((product) =>
  //   product.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  return (
    <div className="products-container">
      <h2>All Products</h2>
      <div className="actions">
        <Search
          searchTerm={searchTerm}
          onHandleSearchChange={handleSearchChange}
        />
        <Sort
          sortCriteria={sortCriteria}
          onHandleSortChange={handleSortChange}
        />
      </div>
      {isLoading && <p>Products are loading...</p>}
      {error && <p>error</p>}
      {!isLoading && !error && (
        <>
          <section className="products">
            {products &&
              products.length > 0 &&
              products.map((product) => {
                const { id, title, category, price, description, images } =
                  product;
                return (
                  <article key={id} className="product">
                    <img src={images[0]} alt={title} className="product_img" />
                    <h3>{title}</h3>
                    <p>Category: {category}</p>
                    <p>Price: {price}</p>
                    <p>
                      Description:{" "}
                      {description && description.substring(0, 100)}
                      ...
                    </p>
                    <Link
                      to={`/products/:{id}`}
                      state={product}
                      className="product_link"
                    >
                      Show Details
                    </Link>
                  </article>
                );
              })}
          </section>
          {/* <div className="pagination">
          {Array.from({length: totalPages}, (_, index)=> {
             return  <button key={index} onClick={()=> handleCurrentPage(index)}>{index + 1}</button>
          })}
        </div> */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onHandleCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Products;
