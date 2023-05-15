import { Stack } from '@mui/system'
import React from 'react'
import theme from '../assets/mui-theme';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import http from '../plugins/http';
import { useDispatch } from 'react-redux';
import { setSubscription } from '../features/users';

const days = [];

for (let index = 1; index <= 31; index++) {
  days.push(index);
}

const SubscriptionForm = () => {
  const disp = useDispatch()
  const username = useSelector((state) => state.users.username)

  const yearRef = React.useRef()
  const monthRef = React.useRef()
  const dayRef = React.useRef()
  const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

  const buySubscription = async () => {
    const data = {
      username,
      dateStart: `${dayRef.current.value} ${monthRef.current.value} ${yearRef.current.value}`,
      dateEnd: `${dayRef.current.value} ${monthRef.current.value} ${Number(yearRef.current.value) + 1}`
    }
    const res = await http.post(data, 'newSubscription')
    if(res.success) disp(setSubscription( {subscription: res.subscription}))
  }



  return (
    <ThemeProvider theme={theme}>
    <Stack className='subscription-form' sx={{ width: '300px', border: 1, borderColor: 'orange.main', padding: 1, margin: '20px auto', display: 'flex', alignItems: 'center'}}>
    <div className='subscriptioon-form-subtitle'> 
    <h6>Get your subscription for a year! <br></br>  When you want to start? </h6>
    </div>
    <select ref={yearRef}>
    <option value="">Year</option>
    <option value="2023">2023</option>
    <option value="2024">2024</option>
    <option value="2025">2025</option>
  </select>
  <select ref={monthRef}>
  <option value="">Month</option>
    {months.map((x) => <option key={x} value={x}>{x}</option> )}
  </select>

  <select ref={dayRef}>
  <option value="">Day</option>
    {days.map((x) => <option key={x}  value={x} dangerouslySetInnerHTML={{ __html: x}}></option>)}
  </select>
  <Button onClick={buySubscription} sx={{marginY: 1, color: 'white'}} color='orange' variant='contained'>BUY</Button>
    </Stack>
     </ThemeProvider>
  )
}

export default SubscriptionForm