import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useFetchData from "../../hooks/GetData";

const TouristBookings = () => {
  const { user } = useContext(AuthContext);
  const { data: allBookings = {} } = useFetchData(
    ["allBookings"],
    `/api/booking/${user.email}`
  );
  console.log(allBookings);
  return <div>TouristBookings {user.email}</div>;
};

export default TouristBookings;
