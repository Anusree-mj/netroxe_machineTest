
'use client'

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { credentials } from './credentials';
import { useRouter } from "next/navigation";


export default function Home() {
  const route = useRouter()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [nameSpan, setNameSpan] = useState('')
  const [passwordSpan, setPasswordSpan] = useState('')
  const [mainSpan, setMainSpan] = useState('')
  const isValid = () => {
    let validity = true
    if (name === '') {
      setNameSpan("Invalid name")
      validity = false;
    }
    if (password === '') {
      setPasswordSpan("Invalid password")
      validity = false;
    }
    return validity
  }

  const handleLogin = () => {
    setMainSpan('')
    const valid = isValid()
    if (!valid) return;
    if (name !== credentials.name || password !== credentials.password) {
      setMainSpan("Invalid username or password")
      return;
    } else {
      route.push('/home')
    }
  }
  return (
    <Box sx={{
      border: '1px solid red', flexDirection: 'column',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', backgroundColor: '#b3b7ebeb'

    }}>
      <Typography sx={{
        textAlign: 'center', fontSize: '1rem',
        fontWeight: '800', mb: 2, color: '#c30226'
      }}>
        Login
      </Typography>
      <Box sx={{
        display: 'flex', flexDirection: 'column', width: '30rem',
        gap: 2, p: 3, maxWidth: '90%',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        backgroundColor: 'white'
      }}>
        <span style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }} >{mainSpan}</span>
        <TextField
          id="outlined-text-input"
          label="User Name"
          onClick={() => { setNameSpan('') }}
          onChange={(e) => { setName(e.target.value) }}
        ></TextField>
        <span style={{ color: 'red', fontSize: '0.7rem' }} >{nameSpan}</span>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          onClick={() => { setPasswordSpan('') }}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <span style={{ color: 'red', fontSize: '0.7rem' }}>{passwordSpan}</span>

        <Typography sx={{
          color: 'blue', textAlign: 'center', fontSize: '0.9rem',
          textDecoration: 'underline'
        }}>
          Forgot Password
        </Typography>
        <Typography sx={{
          color: 'blue', textAlign: 'center', fontSize: '0.9rem',
          textDecoration: 'underline'
        }}>
          New to netroxe? SignUp
        </Typography>
        <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>Login</Button>
      </Box>
    </Box>
  );
}
