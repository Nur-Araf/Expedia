import useFetchData from "../../hooks/GetData";

const TotalStories = () => {
  const { data: stories = [] } = useFetchData(["stories"], `/api/stories`);
  return (
    <div className="mt-2 md:mt-4">
      <h1 className="text-center text-2xl font-semibold">
        Total Stories Posted: {stories.length}
      </h1>
    </div>
  );
};

export default TotalStories;
