import MapComponent from "../../../app/shared/components/MapComponent";
import { MapPinCheck } from "lucide-react";

type Props = {
  activity: Activity;
};

export default function LocationDetails({ activity }: Props) {
  return (
    <div className="lg:col-span-2 space-y-12">
      {/* Location Content */}
      <div className="flex align-middle">
        <div className="bg-primary/10 text-primary grid size-8 shrink-0 place-content-center rounded-full">
          <MapPinCheck className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 ms-1">Location</h2>
      </div>
      <p className="text-gray-700 leading-relaxed">
        {activity.venue}, {activity.city}
      </p>
      <div
        style={{
          marginBottom: 16,
          marginTop: -8,
          height: 300,
          width: "100%",
          display: "block",
        }}
      >
        <MapComponent
          position={[activity.latitude, activity.longitude]}
          venue={activity.venue}
        />
      </div>
    </div>
  );
}
