import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";
import { aboutBanner } from "../../assets/images";
import TopSection from "../activities/dashboard/TopSection";

export default function ProfilePage() {
  const { id } = useParams();
  const { profile, loadingProfile } = useProfile(id);

  if (loadingProfile) return <div>Loading profile...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="w-full grow">
      <TopSection
        backgroundImage={aboutBanner}
        title="Discover the Beauty of the Alps"
        subtitle="Unforgettable adventures await — find your perfect journey"
      />
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
}
