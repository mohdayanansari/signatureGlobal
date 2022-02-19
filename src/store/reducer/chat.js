import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import setAuthorizationToken, { axiosInstance} from "../../utils/axios-instance";
// thunk actions

//get contacts
export const getContacts = createAsyncThunk('chat/getContacts',
  async(obj)=>{
  const response = await axiosInstance.get("contacts")
    return response.data
})

// fetch selected chat
export const getSelectedChatHistory = createAsyncThunk('chat/getSelectedChatHistory',
  async(number)=>{
    const response = await axiosInstance.get(`/v1/history?phone=${number}`)
    return response.data
  })


// fetch selected chat
export const getBackgroundChatHistory = createAsyncThunk('chat/getBackgroundChatHistory',
  async(number)=>{
    const response = await axiosInstance.get(`/v1/history?phone=${number}`)
    return response.data
  })


// send media chat
export const sendMediaChat = createAsyncThunk('chat/sendMediaChat',
  async(obj)=>{
    const response = await axiosInstance.post(`/v1/media` ,obj)
    return response.data
  })


export const chatSlice = createSlice({
  name:'chat',
  initialState:{
    contacts:[],
    loading:false,
    chatHistoryLoading:false,
    mediaSendingLoading:false,
    chatHistory:[
      {
        "_id": "gBEGkXMHR2JkAglXW9yegcttOOM",
        "send_type":"broadcast",
        "title":"if broadcast name otherwise / null",
        "fromMe": false,
        "phone": 918890293146,
        "status": "read",
        "text": {
          "name": "1sttemplate"
        },
        "timestamp": 1641228843,
        "type": "template"
      },
      {
        "_id": "gBEGkXMHR2JkAglXW9yegcttOOM",
        "send_type":"broadcast",
        "title":"kjasfnaklfsnmlk",
        "fromMe": false,
        "phone": 918890293146,
        "status": "read",
        "text": {
          "name": "1sttemplate"
        },
        "timestamp": 1641228843,
        "type": "template"
      },
      {
        "_id": "gBEGkXMHR2JkAglXW9yegcttOOM",
        "send_type":"broadcast",
        "title":"if broadcast name otherwise / null",
        "fromMe": true,
        "phone": 918890293146,
        "status": "read",
        "text": {
          "name": "1sttemplate"
        },
        "timestamp": 1641228843,
        "type": "template"
      },
      {
        "_id": "gBEGkXMHR2JkAglXW9yegcttOOM",
        "send_type":"broadcast",
        "title":"if broadcast name otherwise / null",
        "fromMe": true,
        "phone": 918890293146,
        "status": "read",
        "text": {
          "name": "1sttemplate"
        },
        "timestamp": 1641228843,
        "type": "template"
      }

    ],
    error:null
  },
  reducers:{
    setTemplateChatHistory:(state  , action)=>{
      state.chatHistory = action.payload
    }
  },
  extraReducers:builder=>{
    builder.addCase(getContacts.pending , (state , action)=>{
      state.loading = true
      state.error = null
    })
      .addCase(getContacts.fulfilled,(state , action )=>{
        state.loading = false
        state.error = null
        state.contacts = action.payload?.contacts
      })
      .addCase(getContacts.rejected, (state , action)=>{
        state.loading = false
        state.error = true
      })
      .addCase(getSelectedChatHistory.pending,(state , action )=>{
        state.chatHistoryLoading = true
        state.error = null
      })
      .addCase(getSelectedChatHistory.fulfilled, (state , action)=>{
        state.chatHistoryLoading = false
        state.error = false
        state.chatHistory = action.payload?.messages
      })
      .addCase(getSelectedChatHistory.rejected, (state , action)=>{
        state.chatHistoryLoading = false
        state.error = true
      })
      .addCase(sendMediaChat.pending,(state , action )=>{
        state.mediaSendingLoading = true
        state.error = null
      })
      .addCase(sendMediaChat.fulfilled, (state , action)=>{
        state.mediaSendingLoading = false
        state.error = false
      })
      .addCase(sendMediaChat.rejected, (state , action)=>{
        state.mediaSendingLoading = false
        state.error = true
      })
      .addCase(getBackgroundChatHistory .pending,(state , action )=>{
        state.error = null
      })
      .addCase(getBackgroundChatHistory.fulfilled, (state , action)=>{
        state.error = false
        state.chatHistory = action.payload?.messages
      })
      .addCase(getBackgroundChatHistory.rejected, (state , action)=>{
        state.error = true
      })
  }
})
export const {setTemplateChatHistory} = chatSlice.actions

export default chatSlice.reducer