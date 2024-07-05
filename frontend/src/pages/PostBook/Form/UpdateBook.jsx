import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, FormControl, Select, MenuItem } from '@mui/material'
import { Create } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'


function UpdateBook({ setUpdate, Book }) {
  const dispatch = useDispatch()
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [discount, setDiscount] = useState()
  const [image, setImage] = useState()
  const [enabled, setEnabled] = useState()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    setName(Book?.name)
    setPrice(Book?.price)
    setDescription(Book?.description)
    setDiscount(Book?.discount)
    setImage(Book?.image)
    setEnabled(Book?.enabled)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleUpdate = () => {

    handleClose()
  }
  return (
    <div>
      <Button sx={{ bgcolor: 'orange', color: 'black' }} variant="outlined" onClick={handleClickOpen}><Create /></Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Cập nhật sách</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Tên: </Typography>
              <TextField fullWidth size='small' value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Tác giả: </Typography>
              <TextField fullWidth size='small' value={description} onChange={(e) => setDescription(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Thể loại: </Typography>
              <TextField fullWidth size='small' value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Mô tả: </Typography>
              <TextField fullWidth size='small' value={description} onChange={(e) => setDescription(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Ảnh bìa: </Typography>
              <TextField fullWidth size='small' type={'file'} onChange={handleImageChange} />
            </Box>
            {image && <img src={image} style={{ height: '50px', width: '50px' }} />}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleUpdate}>Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </div >
  )
}
export default UpdateBook