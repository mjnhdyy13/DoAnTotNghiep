import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Book from "../../components/Book/Book";
import { mockData } from "../../apis/mockdata";

function GenreDetail() {
  const categoryId = useSelector((state) => state.category.id);
  const [books, setBooks] = useState(mockData?.books);
  const [booksBySelect, setBooksBySelect] = useState([]);
  const [authors, setAuthors] = useState(mockData?.authors);
  const [checked, setChecked] = useState([]);
  const [select, setSelect] = useState(1);
  const handleSelect = (event) => {
    setSelect(event.target.value);
  };
  const handleCheck = (id) => {
    // setChecked(prev => {
    //   const isChecked = checked.includes(id)
    //   if (isChecked) {
    //     return checked.filter(item => item != id)
    //   }
    //   else {
    //     return [...prev, id]
    //   }
    // })
  };
  // useEffect(() => {
  //   switch (select) {
  //     case 1:
  //       setBooks(sortByMaxId(booksBySelect))
  //       break
  //     case 2:
  //       setBooks(sortByMaxId(booksBySelect))
  //       break
  //     default:
  //       break
  //   }
  // }, [select])
  // useEffect(() => {
  //   const booksByProviders = booksBySelect.filter(book => checked.includes(book.provider.id))
  //   setbooks(booksByProviders)
  // }, [checked])
  return (
    <Box
      bgcolor={(theme) =>
        theme.palette.mode === "dark" ? "#363636" : "#E8E8E8"
      }
    >
      <Box ml={{ xs: 1, sm: 2, md: 10 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Trang chủ
          </Link>
          <Typography color="text.primary">Kho Sách</Typography>
        </Breadcrumbs>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Typography variant="body1" fontWeight={"bold"}>
            Sắp xếp
          </Typography>
          <FormControl size={"small"} sx={{ m: 1, minWidth: 120 }}>
            <Select value={select} onChange={handleSelect}>
              <MenuItem value={1}>Mới nhất</MenuItem>
              <MenuItem value={2}>Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{ borderRadius: "6px", width: "fit-content" }}
        ml={{ xs: 1, sm: 2, md: 10 }}
        mr={{ xs: 1, sm: 2, md: 10 }}
      >
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {books?.map((book, index) => (
            <Book book={book} key={index} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default GenreDetail;
