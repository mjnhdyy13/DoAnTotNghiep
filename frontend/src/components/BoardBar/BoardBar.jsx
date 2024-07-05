import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate } from "react-router-dom";
import { mockData } from "../../apis/mockdata";
import MenuCategories from "./MenuCategories";
import MenuAuthors from "./MenuAuthors";

function BoardBar() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(mockData?.categories);
  const [authors, setAuthors] = useState(mockData?.authors);
  // useEffect(() => {
  //     categoryApi.getAllEnabledCategories()
  //         .then(response => {
  //             setCategories(response.data)
  //         })
  //         .catch(error => {
  //             console.error(error)
  //         })
  // }, [])
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.webCustom.boardBarHeight,
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid #D3D3D3",
        overflowY: "hidden",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#363636" : "white",
      }}
      paddingX={{ xs: 1, md: 5 }}
    >
      <MenuCategories categories={categories} />
      <MenuAuthors authors={authors} />
    </Box>
  );
}

export default BoardBar;
