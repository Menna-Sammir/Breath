import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import ProfileCard from "./ProfileCard";

export default function ProfileFollowings({ type }: { type: "followers" | "followings" }) {
  const { id } = useParams();
  const predicate = type === "followers" ? "followers" : "followings";
  const { profile, followings, loadingFollowings } = useProfile(id, predicate);

  return (
    <div>
      <div className="flex">
        <h3 className="text-xl font-semibold">
          {type === "followers"
            ? `People following ${profile?.displayName}`
            : `People ${profile?.displayName} is following`}
        </h3>
      </div>
      <hr className="my-2" />
      {loadingFollowings ? (
        <p>Loading...</p>
      ) : (
        <div className="flex mt-3 gap-3 flex-wrap">
          {followings?.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
}
