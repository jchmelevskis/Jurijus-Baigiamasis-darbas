import React from 'react'
import theme from '../assets/mui-theme';
import { ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/system'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';


const SubscriptionAvailable = () => {
  const subscription = useSelector((state) => state.users.subscription)
  return (
    <ThemeProvider theme={theme}>
    <Stack  sx={{ m: 3, width: '80%', border: 1, borderColor: 'orange.main', padding: 3, margin: '20px auto', display: 'flex', alignItems: 'center'}}>
      <Typography sx={{color: 'orange.main', fontWeight: 'bold'}}>Your subscription availabse since {subscription[0].start} until {subscription[0].end}</Typography>
    </Stack>
     </ThemeProvider>
  )
}

export default SubscriptionAvailable