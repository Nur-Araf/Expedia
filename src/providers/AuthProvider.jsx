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
  console.log(user);
  const [loading, setLoading] = useState(true);

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
             console.log("Response Data:", data.data);
             setLoading(false);
           })
           .catch((error) => {
             console.error("Error:", error);
           });
       } else {
         axios
           .post(
             "http://localhost:5000/logout",
             {},
             {
               withCredentials: true,
             }
           )
           .then((data) => {
             console.log("Logout", data.data), setLoading(false);
           })
           .catch((err) => console.log(err));
       }
     });

     return () => unSubscribe();
   }, []);

  const authInfo = {    
    user,
    setUser,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
