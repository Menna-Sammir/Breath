import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { LoaderCircle } from "lucide-react";

const ActivityList = observer(function ActivityList() {
  const {
    activitiesGroup,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useActivities();
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div className="flex flex-col gap-8 rounded-3xl border border-gray-light bg-white p-6 shadow-3xl m-2">
      {activitiesGroup?.pages.map((activities, index) => (
        <div
          key={index}
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-2
          gap-6
        "
        >
          {activities?.items.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      ))}
      {/* sentinel element observed for infinite scroll */}
      <div ref={ref} className="h-1 flex justify-center" />
      {isFetchingNextPage && (
        <LoaderCircle className="h-6 w-6 animate-spin text-primary" />
      )}
      {!activitiesGroup && <h3>No activities found</h3>}
    </div>
  );
});

export default ActivityList;
