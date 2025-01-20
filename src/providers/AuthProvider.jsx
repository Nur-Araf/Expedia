import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import axios from "axios";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  console.log(userRole);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const fetchUserRole = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${email}`);
      localStorage.setItem("userRole", response.data.role);
      setUserRole(response.data.role);
    } catch (err) {
      console.error("Error fetching user role:", err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserRole(user.email);
    } else {
      setUserRole(null);
    }
  }, [user]);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user?.email) {
        const userEmail = { email: user.email };
        axios
          .post("http://localhost:5000/jwt", userEmail, {
            withCredentials: true,
          })
          .then((data) => {
            console.log("JWT Response Data:", data.data);
            const token = data.data?.accessToken;
            if (token) {
              localStorage.setItem("accessToken", token);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error("JWT Error:", error);
          });

          axios.get(`http://localhost:5000/users/${user.email}`).then((res) => {
            setUserRole(res.data.role);
          });
      } else {
        // Handle logout
        axios
          .post(
            "http://localhost:5000/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((data) => {
            console.log("Logout:", data.data);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userRole");
            setLoading(false);
          })
          .catch((err) => console.log("Logout Error:", err));
      }
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    userRole,
    signIn,
    signInWithGoogle,
    logOut,
    fetchUserRole,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
