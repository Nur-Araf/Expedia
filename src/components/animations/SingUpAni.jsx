import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationSingup from "../animations/json/singup.json";

const SingUpAnimation = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationSingup,
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

export default SingUpAnimation;
