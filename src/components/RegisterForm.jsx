import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { register } from '../redux/auth/operations';
import { useRegisterFormValidation } from '../hooks/useRegisterFormValidation';
import { Copyright } from '../utils/copyright';

const defaultTheme = createTheme();

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const { handleSubmit, reset, registerName, registerEmail, registerPassword, errorMessage } =
    useRegisterFormValidation();

  const onSubmit = ({ name, email, password }) => {
    dispatch(register({ name, email, password }));
    toast.success(`User ${name} has been successfully created`);
    reset();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Register
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  {...registerName}
                  name='name'
                  required
                  fullWidth
                  label='Name'
                />
                {errorMessage('name')}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='email'
                  {...registerEmail}
                  name='email'
                  required
                  fullWidth
                  label='Email Address'
                />
                {errorMessage('email')}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='new-password'
                  {...registerPassword}
                  name='password'
                  required
                  fullWidth
                  label='Password'
                  type='password'
                />
                {errorMessage('password')}
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
};
