import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shareComponents/Navbar";
import Footer from "./components/shareComponents/Footer";

function App() {
  return (
    // className="max-w-[25rem] sm:max-w-[40rem] md:max-w-[43rem] lg:max-w-4xl xl:max-w-7xl mx-auto"
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
