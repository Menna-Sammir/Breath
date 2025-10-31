import { AccessTime, Place } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const isHost = false;
  const isGoing = false;
  const label = isHost
    ? "You are hosting this activity"
    : isGoing
    ? "You are going to this activity"
    : "";
  const color = isHost ? "primary" : isGoing ? "success" : "default";
  const isCancelled = false;

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <CardHeader
          avatar={
            <Avatar
              sx={{ height: 80, width: 80 }}
              src={`/assets/categoryImages/${activity.category}.jpg`}
            />
          }
          title={activity.title}
          titleTypographyProps={{ fontWeight: "bold", fontSize: 20 }}
          subheader={
            <>
              Hosted by <Link to={`/profiles/bob`}>Bob</Link>
            </>
          }
        ></CardHeader>

        <Box display="flex" alignItems="center" gap={2} mr={2}>
          {(isHost || isGoing) && (
            <Chip
              label={label}
              color={color}
              sx={{ fontSize: 16, fontWeight: "bold", mt: isCancelled ? 1 : 0 }}
            />
          )}
          {isCancelled && (
            <Chip
              label="Cancelled"
              color="error"
              sx={{ fontSize: 16, fontWeight: "bold" }}
            />
          )}
        </Box>
      </Box>
      <Divider />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={1}>
          <AccessTime fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{formatDate(activity.date)}</Typography>
          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography variant="body2">
            {activity.venue}, {activity.city}
          </Typography>
        </Box>
        <Divider />
        <Box
          display="flex"
          gap={2}
          sx={{ backgroundColor: "lightgray", p: 1, borderRadius: 2, my: 2 }}
        >
          Attendees will go here
        </Box>
      </CardContent>

      <CardContent
        sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
      >
        <Typography variant="body2">{activity.description}</Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            component={Link}
            to={`/activities/${activity.id}`}
            size="medium"
            variant="contained"
            sx={{ display: "flex", justifySelf: "self-end" }}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
