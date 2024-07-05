import { useState } from 'react'
import { Container, Grid, Typography, Button, Box } from '@mui/material'
import { Inventory, EditLocationAlt, NavigateNext } from '@mui/icons-material'
import Profile from './Profile/Profile'

function Account() {
  const [select, setSelect] = useState(0)
  return (
    <Container sx={{ mb: 2 }}>
      <Grid container mt={2} spacing={3} >
        {/* Phần lọc */}
        <Grid item xs={12} sm={12} md={3} lg={3} >
          <Typography variant="body1" mb={2} >Trang chủ / Cá nhân</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button startIcon={<Inventory />} color='inherit' onClick={() => { setSelect(0) }}>Thông tin cá nhân</Button>
            <NavigateNext />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button startIcon={<Inventory />} color='inherit' onClick={() => { setSelect(1) }}>Đơn hàng của tôi</Button>
            <NavigateNext />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button startIcon={<EditLocationAlt />} color='inherit' onClick={() => { setSelect(2) }}>Sổ địa chỉ nhận hàng</Button>
            <NavigateNext />
          </Box>
        </Grid>
        {/* Phần sản phẩm */}
        <Grid mt={1} item container xs={12} sm={12} md={9} lg={9} >
          <Grid item xs={12} sm={12} md={10} lg={10}>
            {select == 0 && <Profile />}
          </Grid>
        </Grid>
      </Grid>
    </Container >
  )
}
export default Account