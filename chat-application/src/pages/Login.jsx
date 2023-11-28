import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { Paper } from '@mui/material'
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';
import { GoogleLogo } from '../styles/svgs';
import { Stack } from '@mui/material'

// TODO remove, this demo shouldn't need to reset the theme.



export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [viewer, setViewer] = useState(false);
  const handleVisibility = () => {
    setViewer((prev) => !prev);
  };

  const theme = useTheme();


  return (
    <Container sx={{
      display: 'flex',
      minHeight: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}>
      <Box display='flex' flexDirection={'column'} alignItems='center' px={5} py={5}
        sx={{
          width: "fit-content",
          borderRadius: "10px",
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'primary.sidebar'
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          Login
        </Typography>
        <Typography variant="p">
          Welcome back 👋
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, maxWidth: '400px' }}>
          <div className='spaced'>
            <label className='spaced'>Email:</label>
            <input
              className='field-input-email'
              required
              id='email'
              aria-label='Email'
              name="email"
              autoComplete='email'
              autoFocus
              placeholder='Email *'
            />
            <label className='spaced' id='label'>Password:</label>
            <Stack sx={{
              display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', backgroundColor: 'primary.white', padding: '0 10px', borderRadius: '5px', mt:'5px', border: '2px solid rgba(170, 170, 170, 0.3);', '&:hover': {
                border: '2px solid #1565c0',
                cursor:'text',
              },
            }}>
              <input
                className='field-input'
                required
                id='password'
                aria-label='password'
                name="password"
                autoComplete='password'
                autoFocus
                placeholder='Password *'
                type={viewer ? "text" : "password"}
              />
              <InputAdornment onClick={handleVisibility} sx={{
                cursor: 'pointer',
                color: 'primary.svgs'
              }}>
                {viewer ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            </Stack>
          </div>
          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            variant='standard'
          /> */}
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={viewer ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={handleVisibility} sx={{
                  cursor: 'pointer'
                }}>
                  {viewer ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
            id="password"
            autoComplete="current-password"
            variant='standard'
          /> */}
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" size="small" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "primary.button" }}
          >
            Sign In
          </Button>
          <Divider>OR</Divider>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 2, mb: 2, color: 'primary.svgs' }}
          >
            <GoogleLogo /><Typography sx={{ marginLeft: '7px' }}>Continue with Google</Typography>
          </Button>
          <Stack spacing={0.25} sx={{ textAlign: 'center' }}>
            <Link href="/register" variant="body2" color={theme.palette.text.primary} >
              {"Don't have an account? Sign Up"}
            </Link>
            <Link href="#" variant="body2" sx={{ color: "primary.text" }}>
              Forgot password?
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}