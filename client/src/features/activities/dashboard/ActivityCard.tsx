import { Heart, MapPin, Clock, MoveUpRight } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import AvatarPopover from "../../../app/shared/components/AvatarPopover";
import { formatDate } from "../../../lib/utils/utils";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const [liked, setLiked] = useState(false);

  const { isHost, isGoing } = activity;
  const label = isHost
    ? "You are hosting this activity"
    : isGoing
      ? "You are going to this activity"
      : "";

  const chipColor = isHost
    ? "border-blue-600 text-blue-600"
    : isGoing
      ? "border-green-600 text-green-600"
      : "border-gray-400 text-gray-600";

  return (
    <div className="border-gray-light shadow-3xl flex h-full flex-col gap-4 rounded-3xl border bg-white p-4 transition hover:shadow-[0_16px_32px_-12px_rgba(88,92,95,0.1)] xl:gap-6">
      {/* IMAGE & LIKE */}
      <div className="group relative h-60 overflow-hidden rounded-2xl">
        <Link
          to={`/activities/${activity.id}`}
          className="absolute inset-0 z-10"
        ></Link>

        <img
          src={`/images/categoryImages/${activity.category}.jpg`}
          alt="Host"
          className="h-full w-full object-cover duration-300 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className="text-primary absolute top-4 left-3 z-20 grid size-8 place-content-center rounded-full bg-white"
        >
          <Heart
            className={`size-5 duration-300 ${liked ? "fill-current" : ""}`}
          />
        </button>

        {label && (
          <span
            className={`absolute top-4 right-3 z-20 rounded-full border px-3 py-1.5 text-sm font-medium bg-white ${chipColor}`}
          >
            {label}
          </span>
        )}
      </div>

      {/* TEXT CONTENT */}
      <div className="flex flex-col gap-4">
        {/* TITLE + RATING STYLE LIKE PACKAGE */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-black lg:text-2xl/8">
            <Link
              to={`/activities/${activity.id}`}
              className="hover:opacity-70"
            >
              {activity.title}
            </Link>
          </h3>

          {/* HOST */}
          <p className="text-sm text-gray-700">
            Hosted by{" "}
            <Link
              to={`/profiles/${activity.hostId}`}
              className="text-primary hover:underline"
            >
              {activity.hostDisplayName}
            </Link>
          </p>

          {/* DATE */}
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="size-4" />
            <span>{formatDate(activity.date)}</span>
          </div>

          {/* LOCATION */}
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="size-4" />
            <span>
              {activity.venue}, {activity.city}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-black lg:text-xl/6.5">
            ${activity.price}
          </p>
        </div>

        {/* ATTENDEES */}
        <div className="bg-gray-100 p-3 rounded-xl flex gap-2 flex-wrap">
          {activity.attendees.map((att) => (
            <AvatarPopover key={att.id} profile={att} />
          ))}
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-800">{activity.description}</p>

        {/* VIEW BUTTON */}
        <Link
          to={`/activities/${activity.id}`}
          className="group/detail text-primary inline-flex w-fit items-center gap-2 font-medium hover:opacity-80 lg:text-lg/6"
        >
          View Details
          <MoveUpRight className="w-0 duration-300 group-hover/detail:size-5" />
        </Link>
      </div>
    </div>
  );
}
