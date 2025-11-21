import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";

export default function ProfileHeader() {
  const { id } = useParams();

  const { isCurrentUser, updateFollowing, profile, loadingProfile } = useProfile(id);

  if (loadingProfile) return <div>Loading profile...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-6 md:flex-1">
          <img
            src={profile?.imageUrl}
            alt={(profile?.displayName ?? "") + " image"}
            className="w-36 h-36 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold">{profile?.displayName}</h3>
            {profile?.following && (
              <span className="mt-2 inline-block rounded border px-2 py-0.5 text-sm text-gray-700">Following</span>
            )}
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="flex justify-around mb-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Followers</div>
              <div className="text-2xl font-bold">{profile?.followersCount}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Following</div>
              <div className="text-2xl font-bold">{profile?.followingCount}</div>
            </div>
          </div>

          {!isCurrentUser && (
            <>
              <hr className="mb-3" />
              <button
                onClick={() => updateFollowing.mutate()}
                disabled={updateFollowing.isPending}
                className={`w-full rounded px-4 py-2 text-sm font-medium ${
                  profile?.following
                    ? "border border-red-500 text-red-600 hover:bg-red-50"
                    : "bg-green-600 text-white hover:bg-green-700"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {profile?.following ? "Unfollow" : "Follow"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
