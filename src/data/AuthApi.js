import { api } from "./api";

export const AuthApi = {
  Login: async (Login) => {
    try {
      const response = await api.post("/login", Login);
      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  },
  Register: async (Register) => {
    try {
      const response = await api.post("/register", Register);
      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  },
  Logout: async ()=> {
     try {
      const response = await api.get("/logout");
      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  }
};
