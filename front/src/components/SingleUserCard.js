import { Box,  Typography } from '@mui/material'
import React from 'react'
import theme from '../assets/mui-theme';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import http from '../plugins/http';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users';
import { useNavigate } from 'react-router-dom'

const SingleUserCard = ({data}) => {
  const nav = useNavigate();
  const disp = useDispatch()
  const deleteHandle = async () => {
    const res = await http.get("deleteUser/"+data.firstname)
  if(res.success) { 
    disp(fetchUsers({allUsers: res.allUsers}))
  }
  }



  return (
    <ThemeProvider theme={theme}>
    <Box  sx={{ border: 1, borderColor: 'orange.main', padding: 1}}>
      <Typography sx={{ color: 'orange.main', padding: 1}}>Firstname: {data.firstname}</Typography>
      <Typography sx={{ color: 'orange.main', padding: 1}}>Lastname: {data.lastname}</Typography>
      <Typography sx={{ color: 'orange.main', padding: 1}}>Email: {data.email}</Typography>
      <Typography sx={{ color: 'orange.main', padding: 1}}>Subscription date: 
      {data.subscription.length > 0 
      ? 
      `${data.subscription[0].start} - ${data.subscription[0].end}`
      : 'Dont have subscription'} 
      </Typography>
      <Box sx={{padding: 2, display: 'flex', justifyContent: 'space-between'}}>
        <Button onClick={() => {
  
          nav('/user/'+data._id)
        }
          } color='warning' variant='contained'>Edit</Button>
        <Button onClick={deleteHandle} color='error' variant='contained'>Delete</Button>
      </Box>
    </Box>
    </ThemeProvider>
  )
}

export default SingleUserCard