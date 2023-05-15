import React from 'react'
import { useSelector } from 'react-redux'
import SingleUserCard from '../components/SingleUserCard'
import { Box, Stack } from '@mui/material'
import theme from '../assets/mui-theme';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const nav = useNavigate()
  const users = useSelector((state) => state.users.allUsers)
  return (
    <ThemeProvider theme={theme}>
      <Stack sx={{ alignItems: 'center'}}>
      <Button onClick={() => nav('/create')} variant='contained'  color='orange' sx={{m: 1, width: '80%'}} >Create new user</Button>
      </Stack>
    <Box sx={{p: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2}}>
      {users.map((x) => <SingleUserCard data={x} key={x._id}/>)}
    </Box>
    </ThemeProvider>
  )
}

export default AdminPage