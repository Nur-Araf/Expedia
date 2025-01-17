import { useParams } from "react-router-dom";

const GiudeProfile = () => {
  const { id } = useParams();
  return <div>GiudeProfile {id}</div>;
};

export default GiudeProfile;
