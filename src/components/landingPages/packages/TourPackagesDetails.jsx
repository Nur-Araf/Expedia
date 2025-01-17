import { useParams } from "react-router-dom";
import PackageDetails from "./PackageDetails";

const TourPackagesDetails = () => {
  const { id } = useParams();

  return (
    <div className="bg-[#F4E3CF] py-2 md:py-8">
      <PackageDetails id={id} />
    </div>
  );
};

export default TourPackagesDetails;
