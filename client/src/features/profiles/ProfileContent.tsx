import { useState } from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileActivities from "./ProfileActivities";
import ProfileFollowings from "./ProfileFollowings";

export default function ProfileContent() {
  const [value, setValue] = useState(0);

  const tabContent = [
    { label: "About", content: <ProfileAbout /> },
    { label: "Photos", content: <ProfilePhotos /> },
    { label: "Events", content: <ProfileActivities /> },
    {
      label: "Followings",
      content: <ProfileFollowings type="followings" />,
    },
    {
      label: "Followers",
      content: <ProfileFollowings type="followers" />,
    },
  ];

  return (
    <div className="flex mt-4 p-6 bg-white shadow-lg rounded-2xl h-[500px]">
      {/* Tabs Sidebar */}
      <div className="flex flex-col border-r pr-4 min-w-[200px]">
        {tabContent.map((tab, index) => (
          <button
            key={index}
            className={`text-left mb-3 px-4 py-2 rounded-lg transition-all
              ${value === index ? "bg-blue-500 text-white font-semibold" : "hover:bg-gray-100"}
            `}
            onClick={() => setValue(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-grow p-4 pt-0 overflow-auto">
        {tabContent.map((tab, index) => (
          <div key={index} className={value === index ? "block" : "hidden"}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
