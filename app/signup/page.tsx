
'use client'

import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from "react-redux";
import { userSignupAction, userStateType } from "@/store/userAuthReducer";
import { toast } from "react-toastify";

export default function Signup() {
    const route = useRouter()
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confrmPassword: '' })
    const [span, setSpan] = useState({ nameSpan: '', emailSpan: '', passwordSpan: '', confrmPassword: '' })
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confrnPasswordVisible, setconfrnPasswordVisible] = useState(false)
    const error = useSelector((state: { user: userStateType }) => state.user.error);

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
        if (credentials.password === '' || credentials.password.length < 8) {
            setSpan(prevState => ({
                ...prevState,
                passwordSpan: 'Provide a password of at least 8 characters'
            }))
            validity = false;
        }
        if (credentials.confrmPassword === '' || credentials.password !== credentials.confrmPassword) {
            setSpan(prevState => ({
                ...prevState,
                confrmPassword: `Passwords doesn't match`
            }))
            validity = false;
        }
        return validity
    }

    const handleSignup = () => {
        const valid = isValid()
        if (!valid) return;
        dispatch(userSignupAction({
            name: credentials.name,
            email: credentials.email, password: credentials.password
        }))
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
                Create Account
            </Typography>
            <Box sx={{
                display: 'flex', flexDirection: 'column', width: '30rem',
                gap: 2, p: 3, maxWidth: '90%',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                background: 'linear-gradient(to right, #f792f0,#cf46c8)',
            }}>
                <TextField
                    id="outlined-text-input"
                    label="Name"
                    error={!!span.nameSpan}
                    helperText={span.nameSpan}
                    onClick={() => { setSpan({ ...span, nameSpan: '' }) }}
                    onChange={(e) => { setCredentials({ ...credentials, name: e.target.value }) }}
                ></TextField>
                <TextField
                    id="outlined-text-input"
                    label="Email"
                    error={!!span.emailSpan}
                    helperText={span.emailSpan}
                    onClick={() => { setSpan({ ...span, emailSpan: '' }) }}
                    onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }}
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
                <TextField
                    id="outlined-password-input"
                    label="Confirm Password"
                    type={confrnPasswordVisible ? "text" : "password"}
                    onClick={() => { setSpan({ ...span, confrmPassword: '' }) }}
                    onChange={(e) => { setCredentials({ ...credentials, confrmPassword: e.target.value }) }}
                    error={!!span.confrmPassword}
                    helperText={span.confrmPassword}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={() => setconfrnPasswordVisible(prevState => !prevState)}
                                sx={{ position: 'absolute', right: '1rem', zIndex: 1 }}
                            >
                                {confrnPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        ),
                    }}
                />
                <Typography sx={{
                    color: 'white', cursor: 'pointer', textAlign: 'center', fontSize: '0.9rem',
                    textDecoration: 'underline', fontWeight: '600'
                }} onClick={() => { route.push('/') }}
                >
                    Already LoggedIn? Login
                </Typography>
                <Button variant="contained" onClick={handleSignup} sx={{
                    mt: 2,
                }}>Create Account</Button>
            </Box>
        </Box>
    );
}
