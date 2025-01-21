import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const axiosScure = axios.create({
  baseURL: "https://assingment12-backend.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigation = useNavigate();

  useEffect(() => {
    axiosScure.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          logOut()
            .then(() => {
              navigation("/log-in");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    );
  });
  return axiosScure;
};

export default useAxiosSecure;
