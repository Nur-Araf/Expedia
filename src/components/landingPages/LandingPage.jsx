import BannerSlider from "./BannerSlider";
import FAQ from "./FAQ";
import TourGuideOverview from "./OverView";
import Reviews from "./Reviews";
import TourismAndGuide from "./Tourism&Guide";


const LandingPage = () => {
  return (
    <>
      <BannerSlider />
      <TourismAndGuide />
      <TourGuideOverview />
      <Reviews />
      <FAQ />
    </>
  );
};

export default LandingPage;
