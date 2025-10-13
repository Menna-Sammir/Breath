import "./App.css";
import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => {
        const payload = response.data?.Data ?? response.data?.data ?? response.data;
        setActivities(Array.isArray(payload) ? payload : []);
      })
      .catch((error) => console.error("Error fetching activities:", error));
  }, []);

  return (
    <>
      <Typography variant="h1" className="app">
        Hello, World!
      </Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText
              primary={activity.title}
              secondary={activity.description}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
