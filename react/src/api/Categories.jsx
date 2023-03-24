import axios from "axios";

const Categories = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL+'/categories',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Categories;
