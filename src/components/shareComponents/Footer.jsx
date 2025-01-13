
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Company</h3>
            <p className="text-sm leading-6">
              We are committed to delivering the best services to our customers.
              Our mission is to provide top-notch solutions that make your life
              easier.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Mobile App Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Graphic Design
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Follow Us</h3>
            <p className="text-sm mb-4">
              Stay connected through our social platforms.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8"></div>

        {/* Copyright */}
        <div className="text-center mt-4 text-sm">
          © {new Date().getFullYear()} Company Name. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
