import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import TotalPayments from "./TotalPayments";


const AdminInformation = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <TotalPayments />
    </div>
  );
};

export default AdminInformation;
