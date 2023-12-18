import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Alert, TextField } from '@mui/material';
import axios from 'axios';

const UserAuth = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });
  const [resError, setResError] = useState(null);

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setUserLogin((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/signin', userLogin);
      const jwtToken = res.data.token ? res.data.token : null;
      if (jwtToken) {
        localStorage.setItem('jwtToken-100xDiscuss', jwtToken);
      }
      navigate('/home');
    } catch (err) {
      setResError(err.response.data.message);
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken-100xDiscuss');
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

    async function validateUserWithJWT() {
      await axios.post('http://localhost:4000').then((res) => {
        console.log(res);
        if (res.data.message === 'Token is valid') {
          navigate('/home')
        }
      });
    }
    validateUserWithJWT();
  }, [navigate]);

  return (
    <div>
      <Box
        component='form'
        onSubmit={onFormSubmit}
        sx={{
          '& .MuiTextField-root': { width: '100%' },
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
        noValidate
        autoComplete='off'
      >
        <h2>Sign in to 100xDiscuss</h2>
        <h4>A doubt discussion platform for 100xCohort</h4>
        {resError && <Alert severity='error'>{resError}</Alert>}
        <TextField
          required
          type='email'
          id='standard'
          label='Email'
          variant='standard'
          name='email'
          onChange={(e) => handleFormChange(e)}
        />
        <TextField
          id='standard-password-input'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='standard'
          name='password'
          onChange={(e) => handleFormChange(e)}
        />
        {/* <TextField
            id='standard-helperText'
            label='Helper text'
            defaultValue='Default Value'
            helperText='Some important text'
            variant='standard'
          /> */}
        <Button
          variant='contained'
          size='large'
          type='submit'
          sx={{ width: '100%' }}
          disableElevation
        >
          Sign In
        </Button>
      </Box>
    </div>
  );
};

export default UserAuth;
