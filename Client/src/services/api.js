import axios from "axios";

const API = axios.create({
  baseURL: "https://college-event-management-0so0.onrender.com",
});

export default API;