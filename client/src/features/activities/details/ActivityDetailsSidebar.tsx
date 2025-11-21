type Props = {
  activity: Activity;
};

export default function ActivityDetailsSidebar({ activity }: Props) {
  const { hostId, attendees } = activity;

  return (
    <>
      {/* Header */}
      <div className="text-center bg-primary text-white py-3 rounded-t-2xl">
        <h6 className="text-lg font-semibold">
          {attendees.length} people going
        </h6>
      </div>

      {/* Attendees List */}
      <div className="bg-white shadow-md rounded-2xl p-4 mt-2">
        {attendees.length > 0 ? (
          attendees.map((attendee) => (
            <div
              key={attendee.id}
              className="flex items-center justify-between mb-4 last:mb-0"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <img
                  src={attendee.imageUrl}
                  alt="attendee name"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h6 className="text-lg font-semibold">
                  {attendee.displayName}
                </h6>
              </div>

              {/* Host / Following */}
              <div className="flex flex-col items-end gap-1">
                {hostId === attendee.id && (
                  <span className="bg-yellow-400/80 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Host
                  </span>
                )}
                {attendee.following && (
                  <span className="text-orange-500/80 text-sm">Following</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No attendees yet</p>
        )}
      </div>
    </>
  );
}
