import { Box, ButtonGroup, List, Paper, Typography } from "@mui/material";
import { useStore } from "../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const Counter = observer(function Counter() {
  const { counterStore } = useStore();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
    >
      <Box sx={{ width: "60%" }}>
        <Typography variant="h4" gutterBottom>
          {counterStore.title}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Count: {counterStore.count}
        </Typography>

        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <button onClick={() => counterStore.increment()}>Increment</button>
          <button onClick={() => counterStore.decrement()}>Decrement</button>
          <button onClick={() => counterStore.increment(5)}>
            Increment by 5
          </button>
        </ButtonGroup>
      </Box>
      <Paper sx={{ width: "40%", padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Event Count: {counterStore.eventCount}
        </Typography>
        <List>
          {counterStore.events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </List>
      </Paper>
    </Box>
  );
});

export default Counter;
