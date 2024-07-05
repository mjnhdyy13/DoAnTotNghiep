import { useState } from 'react'
import { Container, TextField, Stack, Button, Box, Checkbox } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import loginImage from '../../../assets/img/loginImage.jpg'
import authenApi from '../../../apis/authenApi'
import { validateEmail } from '../../../utils/email'

function ResetPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const onFinish = () => {
    if (!validateEmail(email)) {
      alert('Error infomation!')
    }
    else {
      authenApi.forgotPassword(email)
      alert('Xem mật khẩu đăng nhập của bạn trong email!')
      navigate('/login')
    }
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'black'
      }}>
        <img src={loginImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        <Box sx={{
          position: 'absolute',
          width: { xs: '90%', sm: '70%', md: '30%' },
          height: 'auto',
          borderRadius: '5px',
          top: '30%',
          left: '50%',
          bgcolor: 'black',
          opacity: 0.8,
          transform: 'translate(-50%, -30%)'
        }}>
          <h2 style={{ textAlign: 'center', color: 'white' }}> Reset Password</h2>
          <Stack
            component="form"
            sx={{ m: 3 }}
            spacing={4}
          >
            <TextField
              id="filled-hidden-label-small"
              placeholder='Input email to get password again'
              variant="filled"
              size="small"
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setEmail(e.target.value)}
            />
            <Button
              sx={{ bgcolor: 'red', color: 'white', fontWeight: 'bold', ':hover':{ bgcolor:'red' } }}
              onClick={() => onFinish()}
            >Get New Password From Email</Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

export default ResetPassword