import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField, Autocomplete, Stack, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Search() {
    const navigate = useNavigate()
    const colorChangeByTheme = (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')
    const [products, setProducts] = useState([])
    const handleProductSelect = (event, value) => {
        if (value) {
          navigate(`/product-detail?${value.id}`)
        }
      }
    useEffect(() => {
        // productApi.getAllEnabledProducts()
        //     .then(response => {
        //         setProducts(response.data)
        //     })
        //     .catch(error => {
        //         console.error(error)
        //     })
    }, [])
    return (
        <Stack spacing={2} sx={{  }}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                options={products}
                getOptionLabel={(product) => (product && product.name) || ''}
                onChange={handleProductSelect}
                renderOption={(props, product) => (
                    <ListItem {...props}>
                        <ListItemAvatar>
                            <Avatar alt={product.name} src={product.image} />
                        </ListItemAvatar>
                        <ListItemText primary={product.name} />
                    </ListItem>
                )}

                renderInput={(params) => (
                    <TextField
                        {...params}
                        id="outlined-search"
                        label="Search..."
                        type="text"
                        size='small'
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }} />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            minWidth: '120px',
                            maxWidth: '300px',
                            '& label': { color: colorChangeByTheme },
                            '& input': { color: colorChangeByTheme },
                            '& label.Mui-focused': { fontWeight: 'bold' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: colorChangeByTheme },
                                '&:hover fieldset': { borderColor: colorChangeByTheme },
                                '&.Mui-focused fieldset': { borderColor: colorChangeByTheme }
                            }
                        }} />)} />
        </Stack>
    )
}

export default Search