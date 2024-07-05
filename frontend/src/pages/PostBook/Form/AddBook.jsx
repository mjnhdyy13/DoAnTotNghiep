import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
import AddCircle from '@mui/icons-material/AddCircle'


function AddBook({ setUpdate }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [discount, setDiscount] = useState('')
    const [image, setImage] = useState('')
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
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
    const handleClickAdd = () => {
        handleClose()
    }
    return (
        <div>
            <Button sx={{ fontWeight: 'bold', height: '40px' }} startIcon={<AddCircle />} variant="outlined" onClick={handleClickOpen}>
                Thêm sách
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Thêm sách mới</DialogTitle>
                <DialogContent >
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
                    <Button onClick={() => { handleClickAdd() }}>Thêm</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AddBook