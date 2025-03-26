import { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CardMedia,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import useRegisterFormStyle from './RegisterFormStyle';

import NavBar from '../../components/NavBar/NavBar';

interface KeyPattern {
  userName?: number;
  emailAddress?: number;
}

interface ResponseObj {
  index: number;
  keyPattern: KeyPattern;
}

const URL = process.env.REACT_APP_URL;

const RegisterForm = () => {
  const [visible, setVisible] = useState(false);
  const style = useRegisterFormStyle();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorUsernameForm, setErrorUsernameForm] = useState('');
  const [errorEmailForm, setErrorEmailForm] = useState('');
  const [errorPasswordForm, setErrorPasswordForm] = useState('');

  const navigate = useNavigate();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const handleOnChange = (e: string, field: any) => {
    if (field === 'username') {
      setUsername(e);
      setErrorUsernameForm('');
    }
    if (field === 'email') {
      setEmail(e);
      // check the regex for email
      if (e.length === 0) {
        setErrorEmailForm('Email is required.');
      } else if (!emailRegex.test(e)) {
        setErrorEmailForm('Invalid email.');
      } else {
        setErrorEmailForm('');
      }
    }
    if (field === 'password') {
      setPassword(e);
      if (e.length === 0) {
        setErrorPasswordForm('Password is required.');
      } else if (e.length < 6) {
        setErrorPasswordForm('Password must be at least 6 characters.');
      } else {
        setErrorPasswordForm('');
      }
    }
  };
  const containsUserName = (element: ResponseObj): boolean => {
    return 'userName' in element.keyPattern;
  };
  const containsEmailAddress = (element: ResponseObj): boolean => {
    return 'emailAddress' in element.keyPattern;
  };

  const handleRegisterUser = async () => {
    if (
      username &&
      email &&
      password &&
      !errorUsernameForm &&
      !errorEmailForm &&
      !errorPasswordForm
    ) {
      axios
        .post(`${URL}/signup`, {
          userName: username,
          emailAddress: email,
          password,
        })
        .then(
          async (response) => {
            if (response.status === 200) {
              toast.success('User registered successfully', {
                position: 'bottom-center',
              });

              // create user for firebase
              try {
                // create a new user with email and password
                const userCredential = await createUserWithEmailAndPassword(
                  auth,
                  email,
                  password,
                );
                // Pull out user's data from the userCredential property
                const user = userCredential.user;
              } catch (err: any) {
                // Handle errors here
                const errorMessage = err.message;
                const errorCode = err.code;
              }
            }

            const { token } = response.data;
            localStorage.setItem('token', token);

            setTimeout(() => {
              navigate('/');
            }, 1000);
          },
          (error) => {
            const errorFromDB = error.response.data.error;
            const userNameExists = containsUserName(errorFromDB);
            const emailAddressExists = containsEmailAddress(errorFromDB);

            if (userNameExists) {
              toast.error('Username already exists.', {
                position: 'bottom-center',
              });
            } else if (emailAddressExists) {
              toast.error('Email already exists.', {
                position: 'bottom-center',
              });
            }
          },
        );
    } else {
      if (username === '') {
        setErrorUsernameForm('Username is required.');
      }
      if (email === '') {
        setErrorEmailForm('Email is required.');
      }
      if (password === '') {
        setErrorPasswordForm('Password is required.');
      }
    }
  };

  //TODO: change on select from suggestion the background color
  return (
    <div className={`registerContainer ${style.registerContainer}`}>
      <NavBar />
      <Box className={`registerForm ${style.registerForm}`}>
        <div className={`header ${style.header}`}>
          <h2>Create account</h2>
        </div>

        <div className={`form ${style.form}`}>
          <div className={style.usernameField}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Username"
              onChange={(e) => handleOnChange(e.target.value, 'username')}
              value={username}
              error={Boolean(errorUsernameForm)}
              helperText={errorUsernameForm}
            />
          </div>
          <div className={style.emailField}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Email"
              onChange={(e) => handleOnChange(e.target.value, 'email')}
              value={email}
              error={Boolean(errorEmailForm)}
              helperText={errorEmailForm}
            />
          </div>
          <div className={style.passwordField}>
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
              value={password}
              error={Boolean(errorPasswordForm)}
              helperText={errorPasswordForm}
            />
          </div>

          <div className={`signUpButton ${style.signUpButton}`}>
            <Button
              variant="contained"
              size="small"
              onClick={handleRegisterUser}
            >
              Create account
            </Button>
          </div>
        </div>
      </Box>

      <Box className={style.registerImage}>
        <CardMedia
          component="img"
          sx={{ height: '100vh' }}
          image="/images/registerPageImage.jpg"
          title="parrot"
        />
      </Box>
    </div>
  );
};

export default RegisterForm;
