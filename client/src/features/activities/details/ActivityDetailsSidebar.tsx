import {
  Paper,
  Typography,
  List,
  ListItem,
  Chip,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
} from "@mui/material";

type Props = {
  activity: Activity;
};

export default function ActivityDetailsSidebar({ activity }: Props) {
  const { hostId, attendees } = activity;

  return (
    <>
      <Paper
        sx={{
          textAlign: "center",
          border: "none",
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
        }}
      >
        <Typography variant="h6">{attendees.length} people going</Typography>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        {attendees.length > 0 ? (
          attendees.map((attendee) => (
            <Grid container alignItems="center" key={attendee.id}>
              <Grid size={8}>
                <List sx={{ display: "flex", flexDirection: "column" }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt={"attendee name"} src={attendee.imageUrl} />
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography variant="h6">
                        {attendee.displayName}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>
              <Grid
                size={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 1,
                }}
              >
                {hostId === attendee.id && (
                  <Chip
                    label="Host"
                    color="warning"
                    variant="filled"
                    sx={{ borderRadius: 2 }}
                  />
                )}
                {attendee.following && (
                  <Typography variant="body2" color="orange">
                    Following
                  </Typography>
                )}
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography variant="body2">No attendees yet</Typography>
        )}
      </Paper>
    </>
  );
}
