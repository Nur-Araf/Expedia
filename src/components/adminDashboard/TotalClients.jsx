import useFetchData from "../../hooks/GetData";

const TotalClients = () => {
  const { data: clients = [] } = useFetchData(["clients"], `/users`);
  return (
    <div className="mt-6 md:mt-8">
      <h1 className="text-center text-2xl font-semibold">
        Total Clients: {clients.length}
      </h1>
    </div>
  );
};

export default TotalClients;
