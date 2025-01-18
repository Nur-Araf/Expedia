import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../components/landingPages/LandingPage";
import LoginPage from "../components/authComponents/LoginPage";
import SignUp from "../components/authComponents/SingUp";
import ForgetPassword from "../components/authComponents/ForgetPassword";
import PrivateRoute from "../components/authComponents/PrivateRoute";
import Dashboard from "../components/touristDashboard/Dashboard";
import ManageProfile from "../components/touristDashboard/ManageProfile";
import Stories from "../components/touristDashboard/Stories";
import ManageStories from "../components/touristDashboard/ManageStories";
import UpdateStory from "../components/touristDashboard/UpdateStory";
import JoinAsTourGuid from "../components/touristDashboard/JoinAsTourGuid";
import TourPackagesDetails from "../components/landingPages/packages/TourPackagesDetails";
import GiudeProfile from "../components/landingPages/packages/GiudeProfile";
import BookPackage from "../components/landingPages/packages/BookPackage";
import TouristBookings from "../components/touristDashboard/TouristBookings";

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
        path: "/packages/:id",
        element: <TourPackagesDetails />,
      },
      {
        path: "/tourGuides/:id",
        element: <GiudeProfile />,
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <BookPackage />
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
                <ManageProfile />
              </PrivateRoute>
            ),
          },
          {
            path: "bookings",
            element: (
              <PrivateRoute>
                <TouristBookings />
              </PrivateRoute>
            ),
          },
          {
            path: "manage-stories",
            element: (
              <PrivateRoute>
                <ManageStories />
              </PrivateRoute>
            ),
          },
          {
            path: "update-story/:id",
            element: (
              <PrivateRoute>
                <UpdateStory />
              </PrivateRoute>
            ),
          },
          {
            path: "add-atories",
            element: (
              <PrivateRoute>
                <Stories />
              </PrivateRoute>
            ),
          },
          {
            path: "join-as-tour-guide",
            element: (
              <PrivateRoute>
                <JoinAsTourGuid />
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
