import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut, userRole } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      // Adjust the threshold as needed
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`bg-opacity-90 top-0 sticky transition-all duration-300 z-50 ${
        isScrolling
          ? "text-blue-700 bg-[#F4E3CF] border-b-2 border-blue-700"
          : "text-white bg-gradient-to-r from-blue-500 to-indigo-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img
                src="/Logo.png"
                alt="Expedia"
                className="h-32 w-40 cursor-pointer"
              />
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
            <>
              <div className="hidden md:flex space-x-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-base font-medium hover:text-gray-400 ${
                      isActive ? "text-gray-400" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/community"
                  className={({ isActive }) =>
                    `text-base font-medium hover:text-gray-400 ${
                      isActive ? "text-gray-400" : ""
                    }`
                  }
                >
                  Community
                </NavLink>
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    `text-base font-medium hover:text-gray-400 ${
                      isActive ? "text-gray-400" : ""
                    }`
                  }
                >
                  About Us
                </NavLink>
                {user && (
                  <>
                    <NavLink
                      to="/trips"
                      className={({ isActive }) =>
                        `text-base font-medium hover:text-gray-400 ${
                          isActive ? "text-gray-400" : ""
                        }`
                      }
                    >
                      Trips
                    </NavLink>
                    {/* <NavLink
                      to="/stories"
                      className={({ isActive }) =>
                        `text-base font-medium hover:text-gray-400 ${
                          isActive ? "text-gray-400" : ""
                        }`
                      }
                    >
                      Story
                    </NavLink> */}
                    <NavLink
                      to="/guides"
                      className={({ isActive }) =>
                        `text-base font-medium hover:text-gray-400 ${
                          isActive ? "text-gray-400" : ""
                        }`
                      }
                    >
                      Guides
                    </NavLink>
                  </>
                )}
              </div>
              <div className="hidden lg:flex space-x-4">
                {user ? (
                  <>
                    <div
                      className="relative inline-block"
                      onMouseEnter={() => setIsToggleOpen(true)}
                      onMouseLeave={() => setIsToggleOpen(false)}
                    >
                      <img
                        src={user?.photoURL}
                        alt="profile"
                        className="w-10 h-10 rounded-full mr-4 cursor-pointer"
                      />
                      {isToggleOpen && (
                        <div
                          className={`absolute w-52 -bottom-1 -left-24 transform -translate-x-1/2 translate-y-full opacity-100 text-sm text-blue-700 bg-[#F4E3CF] border-[2px] p-2 rounded mt-2 z-50 ${
                            isScrolling ? "border-blue-500" : "border-white"
                          }`}
                        >
                          <p className="hover:text-blue-900 font-semibold cursor-pointer">
                            {user?.displayName}
                          </p>
                          <p className="hover:text-blue-900 font-semibold cursor-pointer my-2">
                            {user?.email}
                          </p>
                          <div className="flex flex-col">
                            {userRole === "Tourist" && (
                              <Link
                                to={"/dashboard/profile"}
                                className="text-center text-white hover:text-blue-700 bg-blue-500 hover:bg-gray-300 border-[2px] border-blue-500 p-2 rounded-md text-sm font-medium mt-2"
                              >
                                Dashboard
                              </Link>
                            )}
                            {userRole === "Guide" && (
                              <Link
                                to={"/dashboard/guide-profile"}
                                className="text-center text-white hover:text-blue-700 bg-blue-500 hover:bg-gray-300 border-[2px] border-blue-500 p-2 rounded-md text-sm font-medium mt-2"
                              >
                                Dashboard
                              </Link>
                            )}
                            {userRole === "Admin" && (
                              <Link
                                to={"/dashboard/admin-profile"}
                                className="text-center text-white hover:text-blue-700 bg-blue-500 hover:bg-gray-300 border-[2px] border-blue-500 p-2 rounded-md text-sm font-medium mt-2"
                              >
                                Dashboard
                              </Link>
                            )}
                            <button
                              className="text-white hover:text-blue-700 bg-blue-500 hover:bg-gray-300 border-[2px] border-blue-500 p-2 rounded-md text-sm font-medium mt-2"
                              onClick={() => logOut()}
                            >
                              Log Out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/sign-up"
                      className="h-fit text-blue-700 font-semibold hover:bg-gray-500 bg-[#F4E3CF] px-4 py-3 rounded-md"
                    >
                      Sign Up
                    </NavLink>
                    <NavLink
                      to="/log-in"
                      className="h-fit text-blue-700 font-semibold hover:bg-gray-500 bg-[#F4E3CF]  px-4 py-3 rounded-md"
                    >
                      Log In
                    </NavLink>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && isMobile && (
        <div className="md:hidden h-screen bg-[url('/Travel.jpg')] bg-cover text-blue-500 space-y-4 px-4 pb-4 pt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block text-base font-medium hover:text-blue-800 ${
                isActive ? "text-blue-800" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              `block text-base font-medium hover:text-blue-800 ${
                isActive ? "text-blue-800" : ""
              }`
            }
          >
            Community
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `block text-base font-medium hover:text-blue-800 ${
                isActive ? "text-blue-800" : ""
              }`
            }
          >
            About Us
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/trips"
                className={({ isActive }) =>
                  `block text-base font-medium hover:text-blue-800 ${
                    isActive ? "text-blue-800" : ""
                  }`
                }
              >
                Trips
              </NavLink>
              {/* <NavLink
                to="/stories"
                className={({ isActive }) =>
                  `block text-base font-medium hover:text-blue-800 ${
                    isActive ? "text-blue-800" : ""
                  }`
                }
              >
                Story
              </NavLink> */}
              <NavLink
                to="/guides"
                className={({ isActive }) =>
                  `block text-base font-medium hover:text-blue-800 ${
                    isActive ? "text-blue-800" : ""
                  }`
                }
              >
                Guides
              </NavLink>
            </>
          )}
          {user ? (
            <div className="flex items-center ml-2">
              <div className="relative inline-block group">
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="w-8 h-8 rounded-full mr-4 cursor-pointer"
                />
                <div className="absolute w-52 -bottom-6 left-1/2 transform translate-y-full opacity-0 group-hover:opacity-100 text-sm text-blue-700 bg-[#F4E3CF] border border-white p-2 rounded mt-2 z-50">
                  <p className="hover:text-blue-900 font-semibold cursor-pointer">
                    {user?.displayName}
                  </p>
                  <p className="hover:text-blue-900 font-semibold cursor-pointer my-2">
                    {user?.email}
                  </p>
                  <div className="flex flex-col">
                    {userRole === "Tourist" && (
                      <Link
                        to={"/dashboard/profile"}
                        className="text-center text-white hover:text-blue-700 bg-blue-500 hover:bg-gray-300 border-[2px] border-blue-500 p-2 rounded-md text-sm font-medium mt-2"
                      >
                        Dashboard
                      </Link>
                    )}
                    {userRole === "Guide" && (
                      <Link
                        to={"/dashboard/guide-profile"}
                        className="text-center text-white hover:text-blue-700 bg-blue-500 hover:bg-gray-300 border-[2px] border-blue-500 p-2 rounded-md text-sm font-medium mt-2"
                      >
                        Dashboard
                      </Link>
                    )}
                    {userRole === "Admin" && (
                      <Link
                        to={"/dashboard/admin-profile"}
                        className="text-center text-white hover:text-blue-700 bg-blue-500 hover:bg-gray-300 border-[2px] border-blue-500 p-2 rounded-md text-sm font-medium mt-2"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      className=" text-white hover:text-blue-700 bg-blue-500 hover:bg-gray-300 border-[2px] border-blue-500 p-2 rounded-md text-sm font-medium mt-2"
                      onClick={() => logOut()}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <NavLink
                to="/sign-up"
                className="text-blue-700 font-semibold hover:bg-gray-500 text-center bg-[#F4E3CF] block px-4 py-2 rounded-md text-base "
                activeclassname="bg-blue-700"
                onClick={toggleMenu}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/log-in"
                className="text-blue-700 text-center bg-[#F4E3CF] hover:bg-gray-500 block px-4 py-2 rounded-md text-base font-medium"
                activeclassname="bg-gray-700"
                onClick={toggleMenu}
              >
                Log In
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
