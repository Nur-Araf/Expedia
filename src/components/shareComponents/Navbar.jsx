import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
    if (window.innerWidth >= 768) {
      setIsOpen(false);
      document.body.classList.remove("no-scroll");
    }
  };

  // Disable scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-blue-800 bg-opacity-90 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold">
              BrandName
            </NavLink>
          </div>

          {/* Hamburger Icon for Mobile */}
          {isMobile && (
            <button
              onClick={toggleMenu}
              className="focus:outline-none md:hidden"
              aria-label="Toggle navigation"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          )}

          {/* Desktop Menu */}
          {!isMobile && (
            <div className="hidden md:flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-gray-400 ${isActive ? "text-blue-500" : ""}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `hover:text-gray-400 ${isActive ? "text-blue-500" : ""}`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `hover:text-gray-400 ${isActive ? "text-blue-500" : ""}`
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `hover:text-gray-400 ${isActive ? "text-blue-500" : ""}`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/log-in"
                className={({ isActive }) =>
                  `hover:text-gray-400 ${isActive ? "text-blue-500" : ""}`
                }
              >
                Log In
              </NavLink>
              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  `hover:text-gray-400 ${isActive ? "text-blue-500" : ""}`
                }
              >
                Sign Up
              </NavLink>
              <button onClick={logOut}>Log Out</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && isMobile && (
        <div className="md:hidden h-screen bg-gray-800 space-y-4 px-4 pb-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block hover:text-gray-400 ${isActive ? "text-blue-500" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block hover:text-gray-400 ${isActive ? "text-blue-500" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `block hover:text-gray-400 ${isActive ? "text-blue-500" : ""}`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block hover:text-gray-400 ${isActive ? "text-blue-500" : ""}`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/log-in"
            className={({ isActive }) =>
              `block hover:text-gray-400 ${isActive ? "text-blue-500" : ""}`
            }
          >
            Log In
          </NavLink>
          <NavLink
            to="/sign-up"
            className={({ isActive }) =>
              `block hover:text-gray-400 ${isActive ? "text-blue-500" : ""}`
            }
          >
            Sing Up
          </NavLink>
          <button onClick={logOut}>Log Out</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
