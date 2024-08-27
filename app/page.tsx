
'use client'

import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction, userStateType } from "@/store/userAuthReducer";
import { toast } from "react-toastify";
import LoadingButton from '@mui/lab/LoadingButton';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [span, setSpan] = useState({ emailSpan: '', passwordSpan: '' })
  const [mainSpan, setMainSpan] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);
  const error = useSelector((state: { user: userStateType }) => state.user.error);
  const isLoading = useSelector((state: { user: userStateType }) => state.user.isLoading);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      router.push('/dashboard')
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const isValid = () => {
    let validity = true
    if (credentials.email === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      validity = false;
      setSpan(prevState => ({
        ...prevState,
        emailSpan: 'Invalid email'
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
    dispatch(userLoginAction({
      email: credentials.email, password: credentials.password,
      handleLoginAction
    }))
    setCredentials({ email: '', password: '' })
  }
  const handleLoginAction = () => {
    router.push('/dashboard')
  }
  return (
    <Box sx={{
      flexDirection: 'column',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #3d3f42, #212226)',
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
          label="Email"
          value={credentials.email}
          error={!!span.emailSpan}
          helperText={span.emailSpan}
          onClick={() => { setSpan({ ...span, emailSpan: '' }) }}
          onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }}
        ></TextField>

        <TextField
          id="outlined-password-input"
          label="Password"
          value={credentials.password}
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
        <LoadingButton
          loading={isLoading}
          loadingPosition="end"
          variant="contained" onClick={handleLogin} sx={{
            mt: 2,
          }}>Login</LoadingButton>
      </Box>
    </Box>
  );
}
