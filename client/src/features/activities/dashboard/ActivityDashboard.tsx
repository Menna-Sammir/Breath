import ActivityList from "./ActivityList";
import { mountainTrip } from "../../../assets/images";
import TopSection from "./TopSection";
import FiltersSidebar from "./FiltersSidebar";
import { useState } from "react";

export default function ActivityDashboard() {
  const [filters, setFilters] = useState({
    destination: "",
    priceRange: [0, 5000],
    duration: "",
    rating: 0,
    categories: [],
    experiences: [],
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="grow">
      {/* Top Section */}
      <TopSection
        backgroundImage={mountainTrip}
        title="Discover the Beauty of the Alps"
        subtitle="Unforgettable adventures await — find your perfect journey"
      />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Left Sidebar */}
        <div className="lg:w-1/4 sticky top-28 self-start">
          <FiltersSidebar />
          {/* <ActivityFilters onFilterChange={handleFilterChange} /> */}
        </div>

        {/* Center Content */}
        <div className="lg:w-3/4">
          <ActivityList />
        </div>
      </div>
    </div>
  );
}
