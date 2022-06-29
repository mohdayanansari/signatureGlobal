import {configureStore}  from "@reduxjs/toolkit";
import broadcastReducer  from "./reducer/broadcast";
import loginReducer  from "./reducer/login";
import chatReducer  from "./reducer/chat";
import usersReducer  from "./reducer/users";
import utilsReducer from "./reducer/utils"
import newChatReducer from "./reducer/newchat"
import jobReducer from './reducer/jobs'
export default configureStore({
  reducer:{
    broadcast:broadcastReducer,
    login:loginReducer,
    chat:chatReducer,
    users:usersReducer,
    utils:utilsReducer,
    newchat:newChatReducer,
    jobs:jobReducer
  }
})