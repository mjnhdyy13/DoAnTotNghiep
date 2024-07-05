import { ShoppingCart, HelpOutline } from "@mui/icons-material";
import { Box, Button, Badge, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModeSelect from "./ModeSelect/ModeSelect";

import Search from "./Search/Search";
import ReadBookLogo from "../../assets/img/ReadBookLogo.png";
import ButttonInputSearch from "../ButtonInputSearch/ButttonInputSearch";

const useStyles = {
  button: {
    color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
    border: "none",
    fontWeight: "bold",
    "&:hover": { color: "red" },
  },
};

function AppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickGenreDetail = () => {
    navigate("/genre-detail");
  };
  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  return (
    <Box
      sx={{
        height: (theme) => theme.webCustom.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "none",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#1C1C1C" : "#1874CD",
      }}
      paddingX={{ xs: 0, md: 5 }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <img src={ReadBookLogo} style={{ height: "50px", width: "50px" }} />{" "}
        </Link>
        <Typography
          variant="h5"
          fontWeight="bold"
          color={"#E8E8E8"}
          display={{ xs: "none", sm: "flex" }}
        >
          Read Book
        </Typography>
        <Box sx={{ display: { md: "flex" }, gap: 2 }}>
          <Button sx={useStyles.button} onClick={onClickGenreDetail}>
            <Typography variant="body1" fontWeight="bold" color={"#E8E8E8"}>
              Kho sách
            </Typography>
          </Button>
          <Link to={"/promotion"}>
            <Button sx={useStyles.button}>
              <Typography variant="body1" fontWeight="bold" color={"#E8E8E8"}>
                Tủ sách
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, paddingX: 2 }}>
        <ButttonInputSearch
          size="large"
          bordered={false}
          textbutton="Tìm kiếm"
          placeholder="Nhập từ khóa"
          onChange={onSearch}
          backgroundColorButton="#5a20c1"
          sx={{ width: "300px" }} // Điều chỉnh kích thước của thanh tìm kiếm
        />
      </Box>
    </Box>
  );
}

export default AppBar;
