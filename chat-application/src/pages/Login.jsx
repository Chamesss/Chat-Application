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
//import { styled } from '@mui/material/styles';

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
    <Container component="main" maxWidth="xs" sx={{
      marginTop: 8,
      backgroundColor: 'primary.main',
      borderRadius: '25px'
    }}>
      <CssBaseline />
      <Box mt={8} mb={8} display='flex' flexDirection={'column'} alignItems='center'>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            variant='filled'
          />
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
                  cursor:'pointer'
                }}>
                  {viewer ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
            id="password"
            autoComplete="current-password"
            variant='filled'
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "primary.blue" }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
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