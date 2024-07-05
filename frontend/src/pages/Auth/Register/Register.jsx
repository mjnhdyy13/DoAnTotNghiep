import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, Stack, TextField, Container } from '@mui/material'
import loginImage from '../../../assets/img/loginImage.jpg'
import { validateEmail } from '../../../utils/email'
import authenApi from '../../../apis/authenApi'

function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')


  const onFinish = () => {
    if (!validateEmail(email) && password !== repeatPassword) {
      alert('Error infomation!')
    }
    else {
      authenApi.signup(username, password, email, fullName, phoneNo)
        .then(response => {
          alert('Sign Up Success')
          navigate('/login')
        })
        .catch(error => {
          console.log(error)
          alert('Sign up Fail!')
        })
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
          <h2 style={{ textAlign: 'center', color: 'white' }}> Sign Up</h2>
          <Stack
            component="form"
            sx={{ m: 3 }}
            spacing={4}
          >
            <TextField
              id="input-email"
              variant="filled"
              size="small"
              placeholder='Input email'
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setEmail(e.target.value)}
              error={!validateEmail(email)}
              helperText={validateEmail(email) ? '' : 'Email is invalid'}
            />
            <TextField
              id="input-username"
              variant="filled"
              size="small"
              placeholder='Input username'
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              id="input-fullname"
              variant="filled"
              size="small"
              placeholder='Input fullName'
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setFullName(e.target.value)}
            />
            <TextField
              id="input-password"
              placeholder='Input password'
              variant="filled"
              size="small"
              type='password'
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              id="input-repeatpassword"
              placeholder="Input repeat password"
              variant="filled"
              size="small"
              type='password'
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setRepeatPassword(e.target.value)}
              error={password !== repeatPassword}
              helperText={password !== repeatPassword ? 'Passwords do not match' : ''}
            />
            <TextField
              id="input-phone"
              variant="filled"
              size="small"
              placeholder='Input Phone'
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setPhoneNo(e.target.value)}
            />
            <Button sx={{ bgcolor: 'red', borderRadius: '5px', color: 'white', fontWeight: 'bold', ':hover': { bgcolor: 'brown' } }}
              onClick={onFinish}>Sign Up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link to={'/'} style={{ color: 'white' }}>Need help?</Link>
              <Link to={'/login'} style={{ color: 'white' }}>Sign In Now?</Link>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

export default Register