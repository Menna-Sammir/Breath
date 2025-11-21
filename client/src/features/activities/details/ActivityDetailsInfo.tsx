import { Link } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import { UserMinus, UserPlus } from "lucide-react";

type Props = {
  activity: Activity;
};

export default function ActivityDetailsInfo({ activity }: Props) {
  const { updateAttendance } = useActivities(activity.id);
  if (!activity) return null;
  const { isCancelled, isHost, isGoing } = activity;

  return (
    <div className="mb-2 bg-white shadow-md rounded-2xl p-6 flex align-top justify-between">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed">{activity.description}</p>
      </div>

      <div className="flex gap-2 h-14">
        {isHost ? (
          <>
            {/* Cancel / Re-activate */}
            <button
              onClick={() => updateAttendance.mutate(activity.id)}
              disabled={updateAttendance.isPending}
              className={`
          px-4 py-2 rounded-lg text-white font-semibold
          ${isCancelled ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
            >
              {isCancelled ? "Re-activate Activity" : "Cancel Activity"}
            </button>

            {/* Manage Event */}
            <Link
              to={`/manage/${activity.id}`}
              className={`
          px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700
          ${isCancelled ? "pointer-events-none opacity-50" : ""}
        `}
            >
              Manage Event
            </Link>
          </>
        ) : (
          /* Join / Cancel Attendance */
          <button
            onClick={() => updateAttendance.mutate(activity.id)}
            disabled={updateAttendance.isPending || isCancelled}
            className={`
        px-4 py-2 rounded-xl text-white font-semibold
        ${isGoing ? "bg-blue-600/50 hover:bg-blue-700/50" : "bg-cyan-600 hover:bg-cyan-700"}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
          >
            {isGoing ? (
              <div className="flex justify-center">
                Cancel <UserMinus className="ml-2" />
              </div>
            ) : (
              <div className="flex justify-center">
                Join <UserPlus className="ml-2" />
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
