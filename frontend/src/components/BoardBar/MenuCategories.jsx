import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { KeyboardArrowDown, Category } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/actions/category";

function MenuCategories({ categories }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickItem = (category) => {
    dispatch(setCategory(category));
    navigate(`/genre-detail?${1}`);
  };
  return (
    <div>
      <Button
        onClick={handleClick}
        startIcon={<Category />}
        endIcon={<KeyboardArrowDown />}
        sx={{ color: "inherit" }}
      >
        <Typography
          variant="body1"
          sx={{ fontSize: "15px", fontWeight: "bold", color: "#363636" }}
        >
          Thể loại
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categories?.map((category) => (
          <MenuItem key={category.id} onClick={() => handleClickItem(category)}>
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default MenuCategories;
