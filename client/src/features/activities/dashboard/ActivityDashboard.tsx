import ActivityList from "./ActivityList";
import { mountainTrip } from "../../../assets/images";
import TopSection from "./TopSection";
import FiltersSidebar from "./FiltersSidebar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useStore } from "../../../lib/hooks/useStore";

export default function ActivityDashboard() {
  const [searchParams] = useSearchParams();
  const { activityStore } = useStore();

  const [, setFilters] = useState({
    destination: "",
    priceRange: [0, 5000],
    duration: "",
    rating: 0,
    categories: [],
    experiences: [],
  });

  useEffect(() => {
    const cityParam = searchParams.get("city");
    const startDateParam = searchParams.get("startDate");

    if (cityParam) {
      activityStore.setCity(cityParam);
      setFilters((prev) => ({ ...prev, destination: cityParam }));
    }

    if (startDateParam) {
      const date = new Date(startDateParam);
      activityStore.setStartDate(date);
    }
  }, [searchParams, activityStore]);


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
        </div>

        {/* Center Content */}
        <div className="lg:w-3/4">
          <ActivityList />
        </div>
      </div>
    </div>
  );
}
