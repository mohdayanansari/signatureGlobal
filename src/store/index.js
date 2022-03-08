import {configureStore}  from "@reduxjs/toolkit";
import broadcastReducer  from "./reducer/broadcast";
import loginReducer  from "./reducer/login";
import chatReducer  from "./reducer/chat";
import usersReducer  from "./reducer/users";
import utilsReducer from "./reducer/utils"

export default configureStore({
  reducer:{
    broadcast:broadcastReducer,
    login:loginReducer,
    chat:chatReducer,
    users:usersReducer,
    utils:utilsReducer
  }
})