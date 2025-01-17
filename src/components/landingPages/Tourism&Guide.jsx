
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OurPackages from "./packages/OurPackages";
import TourGuide from "./packages/TourGuide";

const TourismAndGuide = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-7xl mx-auto my-6 md:my-16 px-6 sm:px-2 md:px-6 lg:px-8 py-6 lg:py-12 bg-[#F4E3CF] rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 text-blue-500">
          Explore Our Tourism Services
        </h1>
        <Tabs>
          <TabList className="flex justify-center space-x-4 border-b-2 border-white">
            <Tab
              className="py-2 px-4 cursor-pointer font-medium text-gray-600 hover:text-blue-600 focus:outline-none"
              selectedClassName="border-b-4 border-blue-600 text-blue-600"
            >
              Our Packages
            </Tab>
            <Tab
              className="py-2 px-4 cursor-pointer font-medium text-gray-600 hover:text-blue-600 focus:outline-none"
              selectedClassName="border-b-4 border-blue-600 text-blue-600"
            >
              Meet Our Tour Guides
            </Tab>
          </TabList>

          {/* Our Packages Tab */}
          <TabPanel>
            <OurPackages />
          </TabPanel>

          {/* Meet Our Tour Guides Tab */}
          <TabPanel>
            <TourGuide />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TourismAndGuide;
