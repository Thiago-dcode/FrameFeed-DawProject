import axios from "axios";

const Users = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL+'/users',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Users;
