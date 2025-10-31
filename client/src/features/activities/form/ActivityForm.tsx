import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

export default function ActivityForm() {
  const { id } = useParams<{ id: string }>();
  const { updateActivity, createdActivity, activity, isLoadingActivity } =
    useActivities(id);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("Form Data Entries:", Array.from(formData.entries()));

    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (data) {
      if (activity && activity.id) {
        data.id = activity.id;
        await updateActivity.mutateAsync(data as unknown as Activity);
        navigate(`/activities/${activity.id}`);
      } else {
        await createdActivity.mutateAsync(data as unknown as Activity, {
          onSuccess: (newActivity) => {
            navigate(`/activities/${newActivity.id}`);
          },
        });
      }
    } else {
      console.error("No data to submit");
    }
  };

  if (isLoadingActivity) return <div>Loading activity...</div>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit activity" : "Create activity"}
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
        onSubmit={handleSubmit}
      >
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          defaultValue={activity?.title}
          fullWidth
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          defaultValue={activity?.description}
        />
        <TextField
          name="category"
          label="Category"
          variant="outlined"
          fullWidth
          defaultValue={activity?.category}
        />
        <TextField
          name="date"
          label="Date"
          type="datetime-local"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
        />

        <TextField
          name="city"
          label="City"
          variant="outlined"
          fullWidth
          defaultValue={activity?.city}
        />
        <TextField
          name="venue"
          label="Venue"
          variant="outlined"
          fullWidth
          defaultValue={activity?.venue}
        />

        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            disabled={updateActivity.isPending || createdActivity.isPending}
            type="submit"
          >
            Submit
          </Button>
          <Button onClick={() => {}} variant="outlined" color="success">
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
