import { useParams } from "react-router-dom";

const TourPackagesDetails = () => {
  const { id } = useParams();
  return <div>TourPackagesDetails {id}</div>;
};

export default TourPackagesDetails;
