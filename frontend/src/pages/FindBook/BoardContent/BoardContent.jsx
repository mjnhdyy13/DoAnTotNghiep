import { Box } from "@mui/material";
import ListRow from "./ListRow/ListRow";

function BoardContent() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#363636" : "#E8E8E8",
        overflowX: "hidden",
      }}
    >
      <ListRow />
    </Box>
  );
}

export default BoardContent;
