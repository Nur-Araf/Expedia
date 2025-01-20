
import TotalPayments from "./TotalPayments";
import TotalGuides from "./TotalGuides";
import TotalPackages from "./TotalPackages";
import TotalClients from "./TotalClients";
import TotalStories from "./TotalStories";


const AdminInformation = () => {
  return (
    <div>
      <TotalClients />
      <TotalStories />
      <TotalPayments />
      <TotalGuides />
      <TotalPackages />
    </div>
  );
};

export default AdminInformation;
