import { LOGIN_URL, REGISTER_URL } from "@/constants/urls";
import axios from "axios";

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await axios.post(
    REGISTER_URL,
    {
      username,
      email,
      password,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const login = async (
  username: string,
  password: string,
  email: string
) => {
  const response = await axios.post(
    LOGIN_URL,
    {
      username,
      email,
      password,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
