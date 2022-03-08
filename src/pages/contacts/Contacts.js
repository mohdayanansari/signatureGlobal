import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Button,
  Box,
  TextField,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  Avatar,
  Divider,
  createMuiTheme,
  MuiThemeProvider, IconButton, CircularProgress, Chip, ListItemSecondaryAction, createStyles,
} from "@material-ui/core";
import  Autocomplete from  "@material-ui/lab/Autocomplete"
import { useTheme } from "@material-ui/styles";
import SendIcon from '@material-ui/icons/Send';
import {Add, CloudUpload, Description, Face, InsertPhoto, Send} from "@material-ui/icons";
// styles
import useStyles from "./styles";
import { capitalize, removeUnderscoreAndCapitalize, timeConverter } from "../../utils/date-parse";
// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Table from "./components/Table/Table";
import Modal from "../../components/Modal";
import { useDispatch , useStore , useSelector} from "react-redux";
import { setTemplateMessages , fetchTemplateMessages , sendTemplateMessage , sendBulkUploadTemplateMessage } from "../../store/reducer/broadcast";
import { getBackgroundChatHistory, sendMediaChat, setTemplateChatHistory } from "../../store/reducer/chat";
import PhoneInput from "react-phone-number-input"
import 'react-phone-number-input/style.css'
import {isValidPhoneNumber} from "react-phone-number-input"
import { useRouteMatch } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import { getContacts, getSelectedChatHistory } from "../../store/reducer/chat";
import classnames from "classnames";
import Av1 from "../../images/av1.png"

import DeleteIcon from '@material-ui/icons/Delete';


export default function Contacts(props) {
  var classes = useStyles();
  var theme = useTheme();
  const dispatch = useDispatch()
  const store = useStore()

  const contacts = useSelector((state)=>state.chat.contacts)
  const [selectedChat, setSelectedChat] = useState(null)

  let intRef= useRef()
  let conRef = useRef()

  useEffect(()=>{
    dispatch(getContacts())
  },[])


  const ListTheme = createMuiTheme({
    overrides:{
      MuiList:{
        padding:{
          padding:30
        }
      },
    }
  })

  const AvatarArray = [
    Av1
  ]

  const ChatListItem = ({name ,number, onClickItem , id , unseenCount})=>{
    return(
    <>
      <div key={id}>
        <ListItem
            className={classes.recipientList}
            disableGutters button onClick={()=>onClickItem(id)}
        >
          <ListItemAvatar className={classes.avatar}>
            <Avatar src={AvatarArray[0]} />
          </ListItemAvatar>
          <ListItemText primary={name}
                        secondary={number}/>
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon color={"error"} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    </>
  )}

  const onClickItem = (item)=>{
    // if(item !== null){
    //   clearInterval(intRef)
    //   setSelectedChat(item)
    //   dispatch(getSelectedChatHistory(item))
    // }
  }

  const getChatListItems = () => {

    let listItems = contacts.map((item)=>(
        <ChatListItem name={item?.name}
                      number={item?.number}
                      id={item?._id}
                      unseenCount={item?.unseen_count}
                      onClickItem={onClickItem}
        />
    ))
    return listItems
  }

  return (
    <Box className={classes.chatWindow}>
      <Box className={classes.innerBox}>
        <Box padding={3} display={"flex"} justifyContent={"space-between"} textAlign={"center"}>
          <Typography variant={"h2"}>Contacts List</Typography>
          <Button
              variant={"contained"}
              color={"primary"}
              startIcon={<Add/>}
          >
            Add Contact
          </Button>
        </Box>
        <Divider/>
        <br/>
        <MuiThemeProvider theme={ListTheme}>
          <List>
            {getChatListItems()}
          </List>
        </MuiThemeProvider>
      </Box>
    </Box>
  );
}
