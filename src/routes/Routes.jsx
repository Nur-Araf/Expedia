import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../components/landingPages/LandingPage";
import LoginPage from "../components/authComponents/LoginPage";
import SignUp from "../components/authComponents/SingUp";
import ForgetPassword from "../components/authComponents/ForgetPassword";
import PrivateRoute from "../components/authComponents/PrivateRoute";
import Dashboard from "../components/touristDashboard/Dashboard";

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
        element: <h1>Community</h1>,
      },
      {
        path: "/trips",
        element: (
          <PrivateRoute>
            <h1>Trips</h1>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "profile",
            element: (
              <PrivateRoute>
                <h1>Manage Profile</h1>
              </PrivateRoute>
            ),
          },
          {
            path: "bookings",
            element: (
              <PrivateRoute>
                <h1>My Bookings</h1>
              </PrivateRoute>
            ),
          },
          {
            path: "stories",
            element: (
              <PrivateRoute>
                <h1>My Stories</h1>
              </PrivateRoute>
            ),
          },
          {
            path: "add-atories",
            element: (
              <PrivateRoute>
                <h1>Add Stories</h1>
              </PrivateRoute>
            ),
          },
          {
            path: "join-as-tour-guide",
            element: (
              <PrivateRoute>
                <h1>Join as Tour Guide</h1>
              </PrivateRoute>
            ),
          },
        ],
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
