import React, { useEffect, useState } from "react";
import api from "../api/api";
import LoadMore from "./LoadMore";
export default function SearchByCategory({ title,categoriesSelected,categorySelected,removeCategorySelected }) {
  const [categories, setCategories] = useState([]);
 
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getCategories = async (url) => {
    try {
      console.log(categories);
      setIsLoading(true);
      const response = await api.get(url);

      setCategories([...categories, ...response.data.data]);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const moreCategories = () => {
    if (currentPage === lastPage) {
      return;
    }
    getCategories("/categories?page=" + (currentPage + 1));
  };

  

  useEffect(() => {
    getCategories("/categories");
  }, []);
  return (
    <div className="search-categories">
      {categoriesSelected.length === 0 && <h3>{title}</h3>}
      {categoriesSelected !== 0 && (
        <div className="categories-selected">
          {categoriesSelected.map((category, i) => {
            return <button onClick={()=>{removeCategorySelected(category)}} key={i}>{category}</button>;
          })}
        </div>
      )}
      <div className="categories">
        {categories &&
          !error &&
          categories.map((category, i) => {

            if (!categoriesSelected.includes(category.name)) {
              return (
                <button
                  onClick={() => {
                    categorySelected(category.name);
                  }}
                 
                  key={i}
                >
                  {category.name}
                </button>
              );
            }
          })}
      </div>
      <LoadMore
        handleMore={moreCategories}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
