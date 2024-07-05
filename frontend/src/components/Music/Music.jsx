import {
  Button,
  Typography,
  Tooltip,
  CardActions,
  CardMedia,
  CardContent,
  Card as MuiCard,
} from "@mui/material";
import { AddCircleOutline, Visibility } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { formatCurrency } from "../../utils/price";

function Music({ music }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let imageM = "src/assets/image_music.png";
  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#363636" : "#E8E8E8",
        borderRadius: "10px",
        height: "200px",
        width: { xs: "45vw", sm: "180px" },
        p: 0.5,
      }}
    >
      {imageM && (
        <div
          onClick={() => {
            navigate(`/music-detail?${music?._id}`);
          }}
          style={{ cursor: "pointer" }}
        >
          <CardMedia
            sx={{ height: "140px", borderRadius: "6px", objectFit: "contain" }}
            image={imageM}
          />
        </div>
      )}
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", fontSize: 13 }}
          noWrap
        >
          {music?.name}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 0, justifyContent: "center" }}>
        <Tooltip title="Thêm vào tủ sách">
          <Button
            size="small"
            startIcon={<AddCircleOutline />}
            sx={{ color: "#1C86EE" }}
            onClick={() => {
              navigate("/play-music", {
                state: { musicInfo: music },
              });
            }}
          ></Button>
        </Tooltip>
      </CardActions>
    </MuiCard>
  );
}

export default Music;
