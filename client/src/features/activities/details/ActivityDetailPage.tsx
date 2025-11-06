import { useActivities } from "../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { Grid } from "@mui/material";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChats from "./ActivityDetailsChats";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { activity, isLoadingActivity } = useActivities(id);

  if (isLoadingActivity) return <div>Loading activity...</div>;

  if (!activity) return <div>Activity not found</div>;

  return (
    <Grid container spacing={3}>
      <Grid size={8}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChats activity={activity} />
      </Grid>
      <Grid size={4}>
        <ActivityDetailsSidebar activity={activity} />
      </Grid>
    </Grid>
  );
}
