import {createSlice} from "@reduxjs/toolkit";

export const userSlice  = createSlice({
  name: "users",
  initialState: {
    allUsers: {
    },
    loggedInUser: {

    },
    username: {
    },

    subscription: [

    ],
    admin: Boolean(false),

  },
  reducers: {
    fetchUsers: (state, action) => {
      const { allUsers } = action.payload
      state.allUsers = allUsers
   },
   setLoggedInUser: (state, action) => {
    const { user } = action.payload
    state.loggedInUser = user
   },
   setUsername: (state, action) => {
    const { firstname } = action.payload
    state.username = firstname
   },
   setSubscription: (state, action) => {
    const { subscription } = action.payload
    state.subscription = subscription
   },
   setAdmin: (state, action) => {
    const { boolean } = action.payload
    state.admin = boolean
   },

   
  },
  clearStates: (state, action) => {
    state = ''
  }
})

export const { fetchUsers, setAdmin, clearStates, setLoggedInUser, setUsername, setSubscription} = userSlice.actions
export default userSlice.reducer