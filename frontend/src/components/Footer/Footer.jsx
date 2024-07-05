import { Box, Grid, InputBase, Paper, IconButton } from "@mui/material";
import { YouTube, Facebook, Twitter, Google, Send } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#1C1C1C" : "#2f3640",
        width: "100%",
        height: "fit-content",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        p: 1,
      }}
    >
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ color: "white", fontFamily: "inherit" }}
      >
        <Grid
          item
          xs={4}
          sm={8}
          md={12}
          sx={{ fontSize: "30px", color: "red", fontFamily: "fantasy" }}
        >
          ReadBook
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          Liên hệ: 0334551190
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          Báo lỗi dịch vụ
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          Sản phẩm
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          Đăng ký
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          Email: minhduy@gmail.com
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          Giới thiệu
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          Khuyến mãi
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "150px",
              height: 30,
            }}
          >
            <InputBase placeholder="Send Email" sx={{ ml: 1 }} />
            <IconButton
              type="button"
              sx={{ p: "10px", ":hover": { color: "blue" } }}
            >
              <Send />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          Địa chỉ: Thành phố Thủ Đức, <br /> Thành Phố Hồ Chí Minh
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          Chính sách bảo mật
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          Trang chủ
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          <YouTube />
          <Facebook />
          <Twitter />
          <Google />
        </Grid>
      </Grid>
    </Box>
  );
}
