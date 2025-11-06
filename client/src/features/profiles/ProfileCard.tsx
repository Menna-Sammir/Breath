import { Person } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

type Props = {
  profile: Profile;
};
export default function ProfileCard({ profile }: Props) {
  const following = false;
  return (
    <Link to={`/profiles/${profile.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{ borderRadius: 3, p: 3, maxWidth: 300, textDecoration: "none" }}
        elevation={4}
      >
        <CardMedia
          component="img"
          height="200"
          image={profile?.imageUrl || "/images/user.png"}
          alt={`${profile.displayName}'s avatar`}
          sx={{ borderRadius: 2, mb: 2, width: 200, zIndex: 50 }}
        />
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" component="div" color="primary">
              {profile.displayName}
            </Typography>
            {following && (
              <Chip
                label="Following"
                size="small"
                color="secondary"
                variant="outlined"
              />
            )}
          </Box>
        </CardContent>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Person />
          <Typography sx={{ ml: 1 }}>
            {profile.followersCount} Followers
          </Typography>
        </Box>
      </Card>
    </Link>
  );
}
