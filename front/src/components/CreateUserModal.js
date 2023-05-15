import React from 'react'
import {  TextField, Button, Box  } from '@mui/material'
import theme from '../assets/mui-theme';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import http from '../plugins/http';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users';

const UpdateUserForm = () => {
  const nav = useNavigate()
  const disp = useDispatch()

  const firstnameRef = React.useRef()
  const lastnameRef = React.useRef()
  const emailRef = React.useRef()
  const passwordOneRef = React.useRef()
  const passwordTwoRef = React.useRef()
  const subscriptionStartRef = React.useRef()
  const subscriptionEndRef = React.useRef()


  const create  = async () => {
    const data = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordOneRef.current.value,
      subscription: {
        start: subscriptionStartRef.current.value,
        end: subscriptionEndRef.current.value
      },
    }
    if(passwordOneRef.current.value === passwordTwoRef.current.value) {
      const res = await http.post(data, 'register')
      if(!res.success) {
        console.log('klaida kuriant useri')
      } else {
        disp(fetchUsers({allUsers: res.allUsers}))
        nav('/admin')
    }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="modal">
          <div className="modal-content">
      <TextField sx={{backgroundColor: 'orange.main', borderRadius: '10px'}} inputRef={firstnameRef}   color='orange' required variant='outlined'   placeholder='First name'/>
      <TextField sx={{marginY: 2, backgroundColor: 'orange.main', borderRadius: '10px'}} inputRef={lastnameRef}  color='orange' required variant='outlined'   placeholder='Last name'/>
      <TextField sx={{backgroundColor: 'orange.main', borderRadius: '10px'}} inputRef={emailRef}  color='orange' required variant='outlined'   placeholder='Email'/>
      <TextField sx={{backgroundColor: 'orange.main', borderRadius: '10px', marginY: 2}}   color='orange' inputRef={passwordOneRef} type='password' required variant='outlined'   placeholder='Password'/>
      <TextField sx={{backgroundColor: 'orange.main', borderRadius: '10px'}}    color='orange' inputRef={passwordTwoRef} required variant='outlined' type='password'   placeholder='Confirm password'/>
      <TextField sx={{backgroundColor: 'orange.main', borderRadius: '10px', marginY: 2}} inputRef={subscriptionStartRef}   required variant='outlined'   placeholder='Subscription start'/>
      <TextField sx={{backgroundColor: 'orange.main', borderRadius: '10px'}} inputRef={subscriptionEndRef}   required variant='outlined'   placeholder='Subscription end'/>
      <Box sx={{width: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
      <Button sx={{marginY: 1, color: 'white'}} onClick={() => {
        create()
        nav('/admin')
      }
        } color='orange' variant='contained'>Create</Button>
      <Button sx={{marginY: 1, color: 'white'}} onClick={() => nav('/admin')} color='orange' variant='contained'>Cancel</Button>
      </Box>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default UpdateUserForm