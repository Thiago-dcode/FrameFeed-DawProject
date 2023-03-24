import axios from "axios";

const Posts = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL+'/posts',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Posts;
