import { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const UserAuth = () => {
  const [userLogin, setUserLogin] = useState({
    username: '',
    password: '',
  });

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setUserLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/signin', userLogin)
      .catch((err) => console.log(err));
  };

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
        <h4>A chat platform for 100xCohort</h4>
        <TextField
          required
          id='standard'
          label='Username'
          variant='standard'
          name='username'
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
          color='success'
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
