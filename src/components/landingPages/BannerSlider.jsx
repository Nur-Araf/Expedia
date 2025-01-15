import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = () => {
  const images = [
    "https://i.ibb.co.com/LJky9Vd/nature-3787200-1920.jpg",
    "https://i.ibb.co.com/QFpdm4s/mountains-4671122-1920.jpg",
    "https://i.ibb.co.com/qR9y4B6/ocean-7890172-1920.jpg",
    "https://i.ibb.co.com/GVhGLWD/mountains-6544522-1920.jpg",
    "https://i.ibb.co.com/0sCKR7r/mountains-3968899-1920.jpg",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[92dvh] object-cover"
            />
            {/* Black overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
            <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-blue-500 text-[6rem] font-bold tracking-widest">
                Expedia
              </p>
              <p className="text-blue-500 text-lg font-semibold tracking-wide">
                Explore the World, Your Journey Starts Here
              </p>
              {/* Search Input */}
              {/* TODO : Search Input */}
              <div className="mt-28 flex justify-center">
                <input
                  type="text"
                  placeholder="Search destinations, hotels, or tours..."
                  className="px-4 py-2 w-[90%] max-w-[1200px] text-blue-500 text-lg border border-blue-500 rounded-l-md focus:outline-none"
                />
                <button className="bg-blue-500 px-6 py-2 text-white text-lg font-semibold rounded-r-md hover:bg-blue-600">
                  Search
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
