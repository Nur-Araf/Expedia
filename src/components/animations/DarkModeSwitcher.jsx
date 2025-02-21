import { useEffect, useRef } from "react";
import { darkMode } from "../../Store/uiStore";
import gsap from "gsap";

const DarkModeSwitcher = () => {
  const { theme, toggleTheme } = darkMode();
  const switchRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (theme === "dark") {
      gsap.to(switchRef.current, { backgroundColor: "#1F2937", duration: 0.3 });
      gsap.to(sunRef.current, { x: 24, opacity: 0, duration: 0.3 });
      gsap.to(moonRef.current, { x: -24, opacity: 1, duration: 0.3 });
    } else {
      gsap.to(switchRef.current, { backgroundColor: "#D1D5DB", duration: 0.3 });
      gsap.to(sunRef.current, { x: 0, opacity: 1, duration: 0.3 });
      gsap.to(moonRef.current, { x: 0, opacity: 0, duration: 0.3 });
    }
  }, [theme]);

  return (
    <button
      ref={switchRef}
      onClick={toggleTheme}
      className="relative w-14 h-8 flex items-center rounded-full p-1 transition-all"
    >
      {/* Sun Icon */}
      <div
        ref={sunRef}
        className="absolute left-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white"
      >
        ☀️
      </div>

      {/* Moon Icon */}
      <div
        ref={moonRef}
        className="absolute right-1 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white"
      >
        🌙
      </div>
    </button>
  );
};

export default DarkModeSwitcher;
