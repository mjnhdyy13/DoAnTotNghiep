import { Box, Typography } from '@mui/material'
import promotionApi from '../../apis/promotionApi'
import { useEffect, useState } from 'react'

function Promotion() {
    // const [promotions, setPromotions] = useState([])
    // useEffect(() => {
    //     promotionApi.getAllPromotions()
    //         .then(response => {
    //             setPromotions(response.data)
    //         })
    //         .catch(err => [
    //             console.log(err)
    //         ])
    // }, [])
    return (
        <Box sx={{ m: 10 }}>
            <Typography variant="body1" mb={2}>Trang chủ / Khuyến mãi</Typography>
            <Typography variant="h5" fontWeight={'bold'}>Tin khuyến mãi</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <img src='https://phanphoiled.net/wp-content/uploads/2019/10/den-led-tron-rang-dong-A70N1-12w-gia-bong-den-led-rang-dong.jpg'alt='image'
                    style={{ objectFit: 'cover', borderRadius: '5px', height: '200px', with: '200px' }} />
                <img src='https://loyaltynetwork.com.vn/wp-content/uploads/2021/06/buy2get1-2048x1279.jpg'alt='image'
                    style={{ objectFit: 'cover', borderRadius: '5px', height: '200px', with: '200px' }} />
                <img src='https://iwater.vn/Image/Picture/New/khuyen_mai_nuoc_top_1.jpg'alt='image'
                    style={{ objectFit: 'cover', borderRadius: '5px', height: '200px', with: '200px' }} />
                <img src='https://loyaltynetwork.com.vn/wp-content/uploads/2021/06/cac-hinh-thuc-khuyen-mai-doc-dao.jpg'alt='image'
                    style={{ objectFit: 'cover', borderRadius: '5px', height: '200px', with: '200px' }} />
            </Box>
            <Typography variant="h5" fontWeight={'bold'}>Danh sách mã khuyến mãi</Typography>
        </Box>
    )
}

export default Promotion