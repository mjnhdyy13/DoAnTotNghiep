import { Button, Menu, MenuItem, Typography } from '@mui/material'
import { KeyboardArrowDown, Person } from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthor } from '../../redux/actions/author'

function MenuAuthors({ authors }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleClickItem = (author) => {
        dispatch(setAuthor(author))
        navigate(`/genre-detail?${1}`)
    }
    return (
        <div>
            <Button onClick={handleClick} startIcon={<Person/>} endIcon={<KeyboardArrowDown />} sx={{ color: 'inherit' }}>
                <Typography variant='body1' sx={{ fontSize: '15px', fontWeight: 'bold', color: '#363636' }}>Tác giả</Typography>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                {authors?.map((author, index) => (
                    <MenuItem key={index} onClick={() => handleClickItem(author)}>{author.name}</MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default MenuAuthors