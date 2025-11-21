import * as React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router";
import ProfileCard from "../../../features/profiles/ProfileCard";

type Props = {
  profile: Profile;
};

export default function AvatarPopover({ profile }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handlePopoverOpen = () => setOpen(true);
  const handlePopoverClose = () => setOpen(false);

  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <Link
        to={`/profiles/${profile.id}`}
        onMouseEnter={handlePopoverOpen}
        onFocus={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onBlur={handlePopoverClose}
        className={`inline-block rounded-full overflow-hidden ${
          profile.following ? "ring-4 ring-indigo-500" : ""
        }`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {profile.imageUrl ? (
          <img
            src={profile.imageUrl}
            alt={`${profile.displayName} image`}
            className="w-10 h-10 object-cover rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm text-white">
            {profile.displayName?.[0]?.toUpperCase()}
          </div>
        )}
      </Link>

      {open && (
        <div
          id="profile-popover"
          role="dialog"
          className="absolute left-0 top-full mt-2 z-50 pointer-events-auto"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <ProfileCard profile={profile} />
        </div>
      )}
    </div>
  );
}
