import { MapPin, Plane, Calendar, Clock, DollarSign } from "lucide-react";
import { formatDate } from "../../../lib/utils/utils";

type Props = {
  activity: Activity;
};

export default function TripDetails({ activity }: Props) {
  const details = [
    {
      icon: MapPin,
      label: "Destination",
      value: `${activity.city}, ${activity.country}`,
    },
    {
      icon: Plane,
      label: "Departure",
      value: activity.departurePlace || "At same location",
    },
    {
      icon: Calendar,
      label: "Date",
      value: formatDate(activity?.date) ?? <span>No Date Provided</span>,
    },
    {
      icon: Clock,
      label: "Duration",
      value: `${activity.duration || "N/A"} days`,
    },
    {
      icon: DollarSign,
      label: "Price",
      value: `$${activity.price || "N/A"} per person`,
    },
  ];

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-8 bg-[radial-gradient(50%_190.38%_at_55.72%_50%,_rgba(0,117,149,0.1)_0%,_rgba(255,255,255,0.1)_100%)] mt-10 ">
        <div className="flex justify-center gap-4 lg:gap-12 xl:gap-22">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 text-center font-medium"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-gray-500" />
                  <span className="text-md text-gray-500">{detail.label}</span>
                </div>
                <p className="font-semibold text-lg text-gray-600">
                  {detail.value}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
