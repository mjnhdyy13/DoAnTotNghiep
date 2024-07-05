import { Box, Divider, Typography } from '@mui/material'
import UpdateBook from '../../pages/PostBook/Form/UpdateBook'
import DeleteBook from '../../pages/PostBook/Form/DeleteBook'

function BookToEdit({ book }) {
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box flex={1}>
                    <img src={book?.image} style={{ objectFit: 'contain', borderRadius: '15px', width: '100%', height: '100px' }} />
                    <Typography variant='subtitle1' fontWeight={'bold'} textAlign={'center'} sx={{ maxHeight: '3em', overflow: 'hidden' }}>{book?.name}</Typography>
                </Box>
                <Box mt={1} flex={{ xs: 3, sm: 4 }}>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' fontSize={13}><b>Tác giả:</b> {book?.name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' fontSize={13}><b>Thể loại:</b> {book?.name}</Typography>
                        </Box>
                        <Typography variant='subtitle1' fontWeight={'bold'} >Mô tả</Typography>
                        <Typography variant='body1' sx={{ maxHeight: '3em', overflow: 'scroll' }} fontSize={13}> {book?.description}
                            Sách Nói Online là trang web cung cấp các bộ sách nói tiếp nối tập 1 và 2 của Nguyên Phong, Liêu Trí Phong, Shunmyo Masuno, Liễu Thuật Quân, James Rickards, Mario Puzo, Donald J.Trump, Hồ Tiến Huân, Grant …
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <UpdateBook />
                            <DeleteBook />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ mt: 1 }} />
        </>
    )
}

export default BookToEdit