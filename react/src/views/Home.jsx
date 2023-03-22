import React, { useState, useEffect } from "react";

import api from "../api/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as lupa } from "@fortawesome/free-solid-svg-icons";
import SearchByCategory from "../components/SearchByCategory";
import GalleryGrid from "../components/GalleryGrid";
import LoadMore from "../components/LoadMore";

export default function Home() {
  const [url, setUrl] = useState("/posts?page=1");
  const [currentPage, setCurrentPage] = useState();
  const [lastPage, setLastPage] = useState();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  // filtering posts by category


  const categorySelected = (categoryName) => {
      setCategoriesSelected([...categoriesSelected, categoryName]);
    };
    const removeCategorySelected =(categoryName) =>{
  
      const categoryRemoved = categoriesSelected.filter(category => category!== categoryName)
      setCategoriesSelected(categoryRemoved)
  
    }

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(url);

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

  const morePosts = () => {
    if (currentPage !== lastPage) {
      setUrl(`/posts?page=${currentPage + 1}`);
      getPosts();
    }
  };

  useEffect(() => {
    setPosts([]);

    getPosts();
  }, []);
  useEffect(()=>{
    const length = categoriesSelected.length
    if(length===0) return
      let categoryQueryString = '&category=' + categoriesSelected.reduce((acc,category)=>{
        
        

        
          return acc + category + '&'


      },'')
    
      categoryQueryString = categoryQueryString.substring(0, categoryQueryString.length-1)
      console.log(categoryQueryString)
      console.log(url)

  },[categoriesSelected])

  return (
    <div className="home">
      <header>
        <div className="search-input">
          <input type="text" placeholder="Type something" />
          <div className="icon-div">
            <FontAwesomeIcon
              className="icon"
              icon={lupa}
              style={{ color: "#ffffff" }}
            />
          </div>
        </div>

        <SearchByCategory title={"Filter by categories"} categoriesSelected={categoriesSelected} categorySelected ={categorySelected} removeCategorySelected= {removeCategorySelected} />
      </header>
      <main>
        {posts && <GalleryGrid posts={posts} morePosts={morePosts} />}
        <LoadMore
          handleMore={morePosts}
          isLoading={isLoading}
          error={isLoading}
        />
      </main>
    </div>
  );
}
