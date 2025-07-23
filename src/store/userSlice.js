import { createSlice } from "@reduxjs/toolkit";
const auth = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,   
    userRole: "",
  },
  reducers: {
    Login: (state, action) => {      
      state.isLoggedIn = true;
      state.user = action.payload.user;     
      state.userRole = action.payload.userRole;
    },
    logOut: (state, action) => {      
      state.isLoggedIn = false;
      state.user = "";
      state.userRole = "";
    },    
  },
});
export const { Login, logOut } = auth.actions; /// to use entire application
export default auth.reducer; ////for import on main or app.js file
