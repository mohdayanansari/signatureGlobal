import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, customInstance, downloadCSVFileInstance, wabaInstance } from "../../utils/axios-instance";
import { responsiveFontSizes } from "@material-ui/core";
// thunk actions

//get Users list
export const getUsers = createAsyncThunk('users/getUsers',
  async()=>{
    const response = await axiosInstance.get("/get_users")
    return response.data
  })

export const utilsSlice = createSlice({
  name:'utils',
  initialState:{
    loading:false,
    error:undefined,
  },
  extraReducers:builder=>{
    builder.addCase(getUsers.pending , (state , action)=>{
      state.loading = true
      state.usersList = []
      state.error = undefined
    })
      .addCase(getUsers.fulfilled,(state , action )=>{
        state.loading = false
        state.usersList = action.payload?.user_id
      })
      .addCase(getUsers.rejected, (state , action)=>{
        state.loading = false
        state.usersList = []
        state.error = !!action.error && action.error
      })
    }
})

export default utilsSlice.reducer