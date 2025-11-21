import { Link } from "react-router";

type Props = {
  profile: Profile;
};

export default function ProfileCard({ profile }: Props) {
  const following = false;
  return (
    <Link to={`/profiles/${profile.id}`} style={{ textDecoration: "none" }}>
      <div className="rounded-lg p-4 max-w-sm min-w-[200px] shadow-md bg-white">
        <img
          src={profile?.imageUrl || "/images/user.png"}
          alt={`${profile.displayName}'s avatar`}
          className="w-48 h-48 object-cover rounded-md mb-3"
        />

        <div className="p-0">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-semibold text-indigo-600">
              {profile.displayName}
            </h4>
            {following && (
              <span className="inline-block rounded border px-2 py-0.5 text-sm text-gray-700">
                Following
              </span>
            )}
          </div>
        </div>

        <hr className="my-3" />

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <div className="ml-2 text-sm text-gray-700">
            {profile.followersCount} Followers
          </div>
        </div>
      </div>
    </Link>
  );
}
