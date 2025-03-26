import { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CardMedia,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import NavBar from '../../components/NavBar/NavBar';
import 'react-toastify/dist/ReactToastify.css';
import useSigninFormStyle from './SigninFormStyle';

const URL = process.env.REACT_APP_URL;

const SigninForm = () => {
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const style = useSigninFormStyle();
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleSignInUser = async () => {
    if (email && password) {
      axios.post(`${URL}/login`, { emailAddress: email, password }).then(
        async (response) => {
          const { token } = response.data;
          localStorage.setItem('token', token);

          if (response.status === 200) {
            toast.success('You have successfully logged in', {
              position: 'bottom-center',
            });
            navigate('/');

            try {
              // Sign in with email and password in firebase auth service

              await signInWithEmailAndPassword(auth, email, password);
            } catch (err: any) {
              // Handle Errors here.
              const errorMessage = err.message;
              toast.error(errorMessage, { position: 'bottom-center' });
            }
          }
        },
        (error) => {
          localStorage.removeItem('token');
          toast.error(error.response.data.error, {
            position: 'bottom-center',
          });
        },
      );
    } else {
      if (email === '') {
        setEmailError('Email is required.');
      }
      if (password === '') {
        setPasswordError('Password is required.');
      }
    }
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const handleOnChange = (e: string, field: any) => {
    if (field === 'email') {
      setEmail(e);
      // check the regex for email
      if (e.length === 0) {
        setEmailError('Email is required.');
      } else if (!emailRegex.test(e)) {
        setEmailError('Invalid email.');
      } else {
        setEmailError('');
      }
    }
    if (field === 'password') {
      setPassword(e);
      if (e.length === 0) {
        // Password is required
        setPasswordError('Password is required.');
      } else if (e.length < 6) {
        // Password must be at least 6 characters
        setPasswordError('Password must be at least 6 characters.');
      } else {
        setPasswordError('');
      }
    }
  };

  return (
    <div className={`containerLogin ${style.containerLogin}`}>
      <NavBar />

      <div className={`loginForm ${style.loginForm}`}>
        <div className={`header ${style.header}`}>
          <h2>Sign In</h2>
        </div>

        <div className={`form ${style.form}`}>
          <div data-testid="emailField" className={style.emailField}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Email"
              onChange={(e) => handleOnChange(e.target.value, 'email')}
              error={Boolean(emailError)}
              helperText={emailError}
            />
          </div>
          <div className={`passwordField ${style.passwordField}`}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Password"
              type={visible ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleVisibility}
                      className={style.seePass}
                    >
                      {visible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => handleOnChange(e.target.value, 'password')}
              error={Boolean(passwordError)}
              helperText={passwordError}
            />
          </div>

          <div className={`signInButton ${style.signInButton}`}>
            <Button variant="contained" size="small" onClick={handleSignInUser}>
              Sign In
            </Button>
          </div>
        </div>

        <div className={`signUpFree ${style.signUpFree}`}>
          <span>
            Not a member? <Link to="/registerform">Sign up</Link> for free.
          </span>
        </div>
      </div>

      <div className={style.loginImage}>
        <CardMedia
          component="img"
          sx={{ height: '100vh' }}
          image="/images/login.jpg"
          title="cat"
        />
      </div>
    </div>
  );
};

export default SigninForm;
