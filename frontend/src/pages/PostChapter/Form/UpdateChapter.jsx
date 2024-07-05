import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, FormControl, Select, MenuItem } from '@mui/material'
import { Create } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'

function UpdateProduct({ setUpdate, product }) {
  const dispatch = useDispatch()
  const subCategories = useSelector(state => state.subCategories.subCategories)
  const providers = useSelector(state => state.providers.providers)
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [discount, setDiscount] = useState()
  const [subCategory, setSubCategory] = useState()
  const [provider, setProvider] = useState()
  const [image, setImage] = useState()
  const [enabled, setEnabled] = useState()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    setName(product?.name)
    setPrice(product?.price)
    setDescription(product?.description)
    setDiscount(product?.discount)
    setSubCategory(product?.subCategory?.id)
    setProvider(product?.provider?.id)
    setImage(product?.image)
    setEnabled(product?.enabled)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleChangeSubCategory = (event) => {
    setSubCategory(event.target.value)
  }
  const handleChangeProvider = (event) => {
    setProvider(event.target.value)
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
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Name: </Typography>
              <TextField fullWidth size='small' value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Description: </Typography>
              <TextField fullWidth size='small' value={description} onChange={(e) => setDescription(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Price: </Typography>
              <TextField fullWidth size='small' value={price} onChange={(e) => setPrice(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Discount: </Typography>
              <TextField fullWidth size='small' value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>SubCategory: </Typography>
              <FormControl size={'small'} fullWidth>
                <Select value={subCategory} onChange={handleChangeSubCategory} >
                  {Array.isArray(subCategories) && subCategories?.map((subCategory, index) => {
                    return (
                      <MenuItem key={index} value={subCategory?.id}>{subCategory?.name}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Provider: </Typography>
              <FormControl size={'small'} fullWidth>
                <Select value={provider} onChange={handleChangeProvider} >
                  {Array.isArray(providers) && providers?.map((provider, index) => {
                    return (
                      <MenuItem key={index} value={provider?.id}>{provider?.name}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Image: </Typography>
              <TextField fullWidth size='small' type={'file'} onChange={handleImageChange} />
              {image && <img src={image} style={{ height: '50px', width: '50px' }} />}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Status: </Typography>
              <FormControl size={'small'} fullWidth>
                <Select value={enabled} onChange={(e) => setEnabled(e.target.value)} >
                  <MenuItem value={true}>Enable</MenuItem>
                  <MenuItem value={false}>Disable</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default UpdateProduct