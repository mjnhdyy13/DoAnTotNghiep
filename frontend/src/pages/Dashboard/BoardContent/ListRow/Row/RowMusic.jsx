import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { mockData } from "../../../../../apis/mockdata";
import Music from "../../../../../components/Music/Music";
import * as MusicService from "../../../../../services/MusicService";

function RowMusic({ item }) {
  const [songs, setSongs] = useState([]);
  const [product, setProducts] = useState([]);

  const fetchAllMusic = async () => {
    const res = await MusicService.getAllMusic();
    if (res?.status === "OK") {
      setSongs(res?.data);
    }
  };
  useEffect(() => {
    fetchAllMusic();
  }, []);
  //console.log(product);
  return (
    <Box mt={2}>
      {songs.length > 0 && (
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          ml={{ xs: 2, sm: 5, md: 20 }}
        >
          <Typography variant={"h6"} sx={{ fontWeight: "bold", fontSize: 15 }}>
            {item}
          </Typography>
          <ArrowForwardIos fontSize="10" />
        </Box>
      )}
      <Box
        sx={{ borderRadius: "6px", width: "fit-content" }}
        ml={{ xs: 2, sm: 5, md: 20 }}
        mr={{ xs: 1, sm: 2, md: 20 }}
      >
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {songs?.map((song, index) => (
            <Music music={song} key={index} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default RowMusic;
