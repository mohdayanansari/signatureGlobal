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

//download history data
export const downloadHistoryData = createAsyncThunk('users/downloadHistoryData',
  async(data)=>{
    const response = await downloadCSVFileInstance.post("/download_history", data)
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'download-history.csv'); //or any other extension
    document.body.appendChild(link);
    link.click();
    return response.data
  })

//download user history data
export const downloadUserHistoryData = createAsyncThunk('users/downloadUserHistoryData',
  async(data)=>{
    const response = await downloadCSVFileInstance.post("v1/download_user_history",data)
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'download-history.csv'); //or any other extension
    document.body.appendChild(link);
    link.click();
    return response.data
  })

export const usersSlice = createSlice({
  name:'users',
  initialState:{
    usersList:[],
    chatHistoryDownloaded : false,
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
    .addCase(downloadUserHistoryData.pending , (state , action)=>{
      state.loading = true
      state.chatHistoryDownloaded = false

    })
      .addCase(downloadUserHistoryData.fulfilled,(state , action )=>{
        state.loading = false
        state.chatHistoryDownloaded = true
      })
      .addCase(downloadUserHistoryData.rejected, (state , action)=>{
        state.loading = false
        state.error = !!action.error && action.error
        state.chatHistoryDownloaded = false

      })
  }
})

export default usersSlice.reducer