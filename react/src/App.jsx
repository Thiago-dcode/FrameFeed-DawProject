import { useEffect, useRef, useState } from "react";
import api from "./axios-client";
import "./App.css";

function App() {
  const [url, setUrl] = useState("/posts");
  const [currentPage, setCurrentPage] = useState();
  const [lastPage, setLastPage] = useState();
  const [posts, setPosts] = useState([]);
  const [cardClass, setCardClass] = useState("");

  const getPosts = async () => {
    try {
      const response = await api.get(url);

      setPosts([...posts, ...response.data.data]);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.log(error.message);
    }
  };
  const setClass = (e) => {
    if (e) {
      if (e.naturalWidth > e.naturalHeight) {
        setCardClass("card-wide");
        console.log(e);
        console.log(e.naturalWidth);
        console.log(e.height);
      } 
      else setCardClass('card-tall')
    }
  };

  const login = (e) => {
    e.preventDefault();

    console.log(import.meta.env.VITE_API_BASE_URL);
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

  return (
    <div className="App">
      <div className="gallery-container">
        {posts &&
          posts.map((post, i) => {
            return (
              <div className={`gallery-element ${post.image_shape === 'vertical'? 'card-tall': 'card-wide'}`} key={i}>
              
                <img
                  ref={(e) => {
                    setClass(e);
                  }}
                  src={post.image}
                  alt=""
                />
              
               
              </div>
            );
          })}
      </div>
      <button onClick={morePosts}>more posts</button>
    </div>
  );
}

export default App;
