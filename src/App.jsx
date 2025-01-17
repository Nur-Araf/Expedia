import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shareComponents/Navbar";
import Footer from "./components/shareComponents/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
