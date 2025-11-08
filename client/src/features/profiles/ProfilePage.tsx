import { Grid } from "@mui/material";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";

export default function ProfilePage() {
  const { id } = useParams();
  const { profile } = useProfile(id);

  if (!profile) return <div>Profile not found</div>;

  return (
    <Grid container>
      <Grid size={12}>
        <ProfileHeader profile={profile} />
        <ProfileContent />
      </Grid>
    </Grid>
  );
}
