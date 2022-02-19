import {configureStore}  from "@reduxjs/toolkit";
import broadcastReducer  from "./reducer/broadcast";
import loginReducer  from "./reducer/login";
import chatReducer  from "./reducer/chat";
import usersReducer  from "./reducer/users";

export default configureStore({
  reducer:{
    broadcast:broadcastReducer,
    login:loginReducer,
    chat:chatReducer,
    users:usersReducer
  },
})