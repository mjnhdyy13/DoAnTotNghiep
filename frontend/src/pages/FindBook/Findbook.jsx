import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

import Book from "../../components/Book/Book";
import * as BookService from "../../../src/services/BookService";
import { useLocation } from "react-router-dom";

function Findbook() {
  const location = useLocation();

  const [books, setBooks] = useState([]);
  const [product, setProducts] = useState([]);
  const bookResult = location.state?.bookResult;

  console.log("ket qua tim kiem", bookResult);

  const fetchAllBook = async () => {
    setBooks(bookResult);
  };
  useEffect(() => {
    fetchAllBook();
  }, []);

  return (
    <Box mt={2}>
      {books.length > 0 && (
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          ml={{ xs: 2, sm: 5, md: 20 }}
        >
          <Typography variant={"h6"} sx={{ fontWeight: "bold", fontSize: 15 }}>
            {"Kết quả tìm kiếm"}
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
          {books?.map((book, index) => (
            <Book book={book} key={index} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default Findbook;
