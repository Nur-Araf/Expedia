import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationLogin from "../animations/json/login.json";

const LoginAnimation = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationLogin,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div
      ref={animationContainer}
      style={{ width: "100%", height: "auto" }}
    ></div>
  );
};

export default LoginAnimation;
