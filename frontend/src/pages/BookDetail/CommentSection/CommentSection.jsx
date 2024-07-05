import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'

function CommentSection({ movie, reviews, setReviews }) {
    const [comment, setComment] = useState('')
    const handleInputChange = (event) => {
        setComment(event.target.value)
    }

    const handleAddComment = () => {
        setComment('')
    }

    return (
        <Box sx={{ width: '100%', borderRadius: '6px', display:'flex' }}>
            <TextField
                label='Viết bình luận'
                fullWidth
                variant="filled"
                value={comment}
                onChange={handleInputChange}
                sx={{ height: '50px', bgcolor: 'white', borderColor: 'black', border: '1px solid rgba(0, 0, 0, 0.23)' }}
            />
            <Button variant='contained' size='small' sx={{ height: '54px', color: 'white', bgcolor: '#00BFFF' }} onClick={handleAddComment}>
                <h5>Gửi bình luận</h5>
            </Button>
        </Box>
    )
}

export default CommentSection
