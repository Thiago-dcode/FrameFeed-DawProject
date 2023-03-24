import React, { useState, useEffect, useRef } from "react";

import Posts from "../api/Posts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as lupa } from "@fortawesome/free-solid-svg-icons";
import SearchByCategory from "../components/SearchByCategory";
import GalleryGrid from "../components/GalleryGrid";
import LoadMore from "../components/LoadMore";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState();
  const [lastPage, setLastPage] = useState();
  const [queryString, setQueryString] = useState({
    page: "?page=1",
  });
  const [search, setSearch] = useState("");
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const inputRef = useRef("");

  //fetching posts
  const getPosts = async (url = "") => {
    try {
      setIsLoading(true);

      const response = await Posts.get(url);

      setPosts([...posts, ...response.data.data]);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // add or remove a category from categories Selected
  const handleCategoryQuery = (categoryName, more = true) => {
    if (more) setCategoriesSelected([...categoriesSelected, categoryName]);
    else {
      const categoryRemoved = categoriesSelected.filter(
        (category) => category !== categoryName
      );
      setCategoriesSelected(categoryRemoved);
    }
  };

  //fetch the next page of post.
  const morePosts = () => {
    if (currentPage !== lastPage) {
      const nextPage = "?page=" + (currentPage + 1);
      setQueryString((prevQuery) => {
        return { ...prevQuery, page: nextPage };
      });
    }
  };

  //fetch posts by a search

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    setSearch(inputRef.current.value);
    inputRef.current.value = "";
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    //build query string for categories based on categoriesSelected

    if (categoriesSelected.length === 0) {
      setPosts([]);
      setQueryString((prevQuery) => {
        return { ...prevQuery, page: `?page=1`, category: "" };
      });
      return;
    }

    let length = categoriesSelected.length;
    let categoryQueryString =
      "&category[]=" +
      categoriesSelected.reduce((acc, category) => {
        if (categoriesSelected[length - 1] === category) {
          return acc + category;
        }
        return acc + category + "&" + "category[]=";
      }, "");
    setPosts([]);

    setQueryString((prevQuery) => {
      return { ...prevQuery, page: "?page=1", category: categoryQueryString };
    });
  }, [categoriesSelected]);

  useEffect(() => {
    setPosts([]);
    setQueryString((prevQuery) => {
      return { ...prevQuery, search: `&search=${search}` };
    });
  }, [search]);

  useEffect(() => {
    let url = "";
    for (const key in queryString) {
      url += queryString[key];
    }

    console.log(url);

    getPosts(url);
  }, [queryString]);

  return (
    <div className="home">
      <header>
        <div className="search-input">
          {search && (
            <div className="search">
              <p>Your search:</p>
              <button onClick={() => setSearch("")}>{search}</button>
            </div>
          )}
          <form onSubmit={(e) => handleSearch(e)} className="form">
            <input ref={inputRef} type="text" placeholder="Type something" />
            <button type="submit" className="icon-div">
              <FontAwesomeIcon
                className="icon"
                icon={lupa}
                style={{ color: "#ffffff" }}
              />
            </button>
          </form>
        </div>

        <SearchByCategory
          title={"Filter by categories"}
          categoriesSelected={categoriesSelected}
          handleQuery={handleCategoryQuery}
        />
      </header>
      <main>
        {posts && <GalleryGrid posts={posts} morePosts={morePosts} />}
        {currentPage !== lastPage && (
          <LoadMore
            handleMore={morePosts}
            isLoading={isLoading}
            error={isLoading}
          />
        )}
      </main>
    </div>
  );
}
