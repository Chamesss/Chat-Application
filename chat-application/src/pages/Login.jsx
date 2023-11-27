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
      <Box display='flex' flexDirection={'column'} alignItems='center' px={4} py={10}
        sx={{
          backgroundColor: "primary.sidebar",
          width: "fit-content",
          borderRadius: "10px",
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, maxWidth: '400px' }}>
          <div className='spaced'>
            <input
              className='field-input'
              required
              id='email'
              aria-label='Email'
              name="email"
              autoComplete='email'
              autoFocus
              placeholder='Email *'
            />
            <input
              className='field-input'
              required
              id='password'
              aria-label='password'
              name="password"
              autoComplete='password'
              autoFocus
              placeholder='Password *'
            />
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
          <TextField
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
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
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{ color: "primary.text" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2" color={theme.palette.text.primary}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}