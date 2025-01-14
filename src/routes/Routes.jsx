import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../components/landingPages/LandingPage";
import LoginPage from "../components/authComponents/LoginPage";
import SignUp from "../components/authComponents/SingUp";
import ForgetPassword from "../components/authComponents/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/about-us",
        element: <h1>About</h1>,
      },
      {
        path: "/community",
        element: <h1>community</h1>,
      },
      {
        path: "/trips",
        element: <h1>trips</h1>,
      },
      {
        path: "/dashboard",
        element: <h1>dashboard</h1>,
      },
      {
        path: "/log-in",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
]);

export default router;