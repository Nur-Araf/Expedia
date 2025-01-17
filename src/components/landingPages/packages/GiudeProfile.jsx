import { useParams } from "react-router-dom";
import useFetchData from "../../../hooks/GetData";
import { Card, Avatar, List, Rate } from "antd";
import "antd/dist/reset.css";

const GuideProfile = () => {
  const { id } = useParams();
  const { data: guideProfile = {} } = useFetchData(
    ["guideProfile"],
    `/api/tour-guides/${id}`
  );

  return (
    <div className="my-6 md:my-12">
      <div className="max-w-[25rem] md:max-w-2xl lg:max-w-4xl mx-auto p-2 md:p-6 bg-gray-200 rounded-lg">
        {/* Profile Card */}
        <Card className="bg-[#F4E3CF] bg-opacity-90">
          <Card.Meta
            avatar={
              <Avatar
                src={guideProfile.image}
                size={64}
                alt={guideProfile.name}
              />
            }
            title={
              <h1 className="text-3xl font-bold text-blue-500">
                {guideProfile.name}
              </h1>
            }
            description={
              <div>
                <div className="flex items-center gap-2 text-yellow-400 text-lg">
                  <Rate disabled value={guideProfile.rating} allowHalf />
                  <span>{guideProfile.rating} / 5</span>
                </div>
                <p className="text-gray-800 md:font-meduim text-sm mt-2">
                  Specialization: {guideProfile.specialization}
                </p>
                <p className="text-gray-900 md:font-meduim mt-2">
                  {guideProfile.description}
                </p>
              </div>
            }
          />
        </Card>

        {/* Experience and Languages */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="shadow-md bg-[#F4E3CF] bg-opacity-90">
            <h2 className="text-lg font-semibold text-blue-700">Experience</h2>
            <p className="text-gray-900 font-semibold">
              {guideProfile.experience}
            </p>
          </Card>
          <Card className="shadow-md bg-[#F4E3CF] bg-opacity-90">
            <h2 className="text-lg font-semibold text-blue-700">Languages</h2>
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={guideProfile.languages || []}
              renderItem={(lang) => (
                <List.Item>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {lang}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Reviews</h2>
          <List
            itemLayout="vertical"
            dataSource={guideProfile.reviews || []}
            renderItem={(review) => (
              <List.Item className="shadow-sm bg-[#F4E3CF] bg-opacity-90 rounded-lg p-4 mb-4">
                <List.Item.Meta
                  avatar={
                    <Avatar className="bg-blue-500 ml-2">
                      {review.author[0]}
                    </Avatar>
                  }
                  title={
                    <h3 className="text-lg font-semibold text-blue-700">
                      {review.author}
                    </h3>
                  }
                  description={
                    <div className="text-sm text-gray-800">
                      <Rate disabled value={review.rating} allowHalf />
                      <p className="mt-2 font-semibold">{review.text}</p>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;
