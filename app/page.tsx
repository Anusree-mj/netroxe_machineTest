
'use client'

import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Home() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ userName: '', password: '' })
  const [span, setSpan] = useState({ userNameSpan: '', passwordSpan: '' })
  const [mainSpan, setMainSpan] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isValid = () => {
    let validity = true
    if (credentials.userName === '') {
      validity = false;
      setSpan(prevState => ({
        ...prevState,
        userNameSpan: 'Invalid username'
      }))
    }
    if (credentials.password === '') {
      setSpan(prevState => ({
        ...prevState,
        passwordSpan: 'Invalid password'
      }))
      validity = false;
    }
    return validity
  }

  const handleLogin = () => {
    setMainSpan('')
    const valid = isValid()
    if (!valid) return;
    // if (name !== credentials.name || password !== credentials.password) {
    //   setMainSpan("Invalid username or password")
    //   return;
    // } else {
    //   route.push('/home')
    // }
  }
  return (
    <Box sx={{
      flexDirection: 'column',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #3d3f42, #212226)', // Lighter to darker gradient
    }}>
      <Typography sx={{
        textAlign: 'center', fontSize: '1rem',
        fontWeight: '800', mb: 2, color: 'white'
      }}>
        Login
      </Typography>
      <Box sx={{
        display: 'flex', flexDirection: 'column', width: '30rem',
        gap: 2, p: 3, maxWidth: '90%',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        background: 'linear-gradient(to right, #f792f0,#cf46c8)',
      }}>
        <TextField
          id="outlined-text-input"
          label="User Name"
          error={!!span.userNameSpan}
          helperText={span.userNameSpan}
          onClick={() => { setSpan({ ...span, userNameSpan: '' }) }}
          onChange={(e) => { setCredentials({ ...credentials, userName: e.target.value }) }}
        ></TextField>
        
        <TextField
          id="outlined-password-input"
          label="Password"
          type={passwordVisible ? "text" : "password"}
          onClick={() => { setSpan({ ...span, passwordSpan: '' }) }}
          onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }}
          error={!!span.passwordSpan}
          helperText={span.passwordSpan}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setPasswordVisible(prevState => !prevState)}
                sx={{ position: 'absolute', right: '1rem', zIndex: 1 }}
              >
                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
        />

        <Typography sx={{
          color: 'white', cursor: 'pointer', textAlign: 'center', fontSize: '0.9rem',
          textDecoration: 'underline'
        }} onClick={() => { router.push('/signup') }} >
          New to netroxe? Create Account
        </Typography>
        <Button variant="contained" onClick={handleLogin} sx={{
          mt: 2,
        }}>Login</Button>
      </Box>
    </Box>
  );
}
