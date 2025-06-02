import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password) {
    return axios.post(API_URL + "/register", {
      name,
      email,
      password,
    });
  }

  setUser(token) {
    try {
      const user = jwtDecode(token);
      localStorage.setItem("user", JSON.stringify({ user, token }));
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("user");
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
