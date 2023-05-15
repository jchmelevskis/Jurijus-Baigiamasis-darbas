import React from 'react'
import {  TextField, Button, Box, Typography  } from '@mui/material'
import theme from '../assets/mui-theme';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import http from '../plugins/http';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users';

const UpdateUserForm = () => {
  const disp = useDispatch()
  const users = useSelector((state) => state.users.allUsers)
  const { id } = useParams()
  const user = users.filter((x) => x._id === id)
  const nav = useNavigate()

  const firstnameRef = React.useRef()
  const lastnameRef = React.useRef()
  const emailRef = React.useRef()
  const subscriptionStartRef = React.useRef()
  const subscriptionEndRef = React.useRef()

  console.log(user)

  const update = async () => {
    const data = {
      firstname: firstnameRef.current.value === '' ? user[0].firstname : firstnameRef.current.value,
      lastname: lastnameRef.current.value === '' ? user[0].lastname : lastnameRef.current.value,
      email: emailRef.current.value === '' ? user[0].email : emailRef.current.value,
      start: subscriptionStartRef.current.value === '' ? '' : subscriptionStartRef.current.value,
      end: subscriptionEndRef.current.value === '' ? '' : subscriptionEndRef.current.value,
      id: user[0]._id
    }
    const res = await http.post(data, 'updateUser')
      if(res.success) {
        disp(fetchUsers({allUsers: res.allUsers}))
      }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="modal">
          <div className="modal-content">
      <Typography sx={{color: 'orange.main', fontSize: '20px', m: 2}}>Update {user[0].email} details</Typography>
      <TextField sx={{backgroundColor: 'orange.main', borderRadius: '10px'}} inputRef={firstnameRef}  defaultValue={user[0].firstname} color='orange' required variant='outlined'   placeholder='First name'/>
      <TextField sx={{marginY: 2, backgroundColor: 'orange.main', borderRadius: '10px'}} inputRef={lastnameRef} defaultValue={user[0].lastname} color='orange' required variant='outlined'   placeholder='Last name'/>
      <TextField sx={{backgroundColor: 'orange.main', borderRadius: '10px'}} inputRef={emailRef} defaultValue={user[0].email} color='orange' required variant='outlined'   placeholder='Email'/>
      <TextField sx={{backgroundColor: 'orange.main', borderRadius: '10px', marginY: 2}} inputRef={subscriptionStartRef} defaultValue={user[0].subscription.length > 0 ? user[0].subscription[0].start : ''}  required variant='outlined'   placeholder='Subscription start'/>
      <TextField sx={{backgroundColor: 'orange.main', borderRadius: '10px'}} inputRef={subscriptionEndRef} defaultValue={user[0].subscription.length > 0 ? user[0].subscription[0].end : ''}  required variant='outlined'   placeholder='Subscription end'/>
      <Box sx={{width: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
      <Button sx={{marginY: 1, color: 'white'}} onClick={() => {
        update()
        nav('/admin')
      }
        } color='orange' variant='contained'>Update</Button>
      <Button sx={{marginY: 1, color: 'white'}} onClick={() => nav('/admin')} color='orange' variant='contained'>Close form</Button>
      </Box>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default UpdateUserForm