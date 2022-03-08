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
  MuiThemeProvider, IconButton, CircularProgress, Chip, ListItemSecondaryAction,
} from "@material-ui/core";
import  Autocomplete from  "@material-ui/lab/Autocomplete"
import { useTheme } from "@material-ui/styles";
import SendIcon from '@material-ui/icons/Send';
import {CloudUpload, Description, Face, InsertPhoto, Send, AttachFile, Image} from "@material-ui/icons";
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
import {getBackgroundChatHistory, sendDocChat, sendMediaChat, setTemplateChatHistory} from "../../store/reducer/chat";
import PhoneInput from "react-phone-number-input"
import 'react-phone-number-input/style.css'
import {isValidPhoneNumber} from "react-phone-number-input"
import { useRouteMatch } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import { getContacts, getSelectedChatHistory } from "../../store/reducer/chat";
import classnames from "classnames";
import Av1 from "../../images/av1.png"
import DocIcon from "../../images/docs.png"


export default function Chat(props) {
  var classes = useStyles();
  var theme = useTheme();
  const dispatch = useDispatch()
  const store = useStore()

  const contacts = useSelector((state)=>state.chat.contacts)
  const chatHistoryLoading = useSelector((state)=>state.chat.chatHistoryLoading)
  const chatHistory = useSelector((state)=>state.chat.chatHistory)
  const [selectedChat, setSelectedChat] = useState(null)
  const [typedMsg, setTypedMsg] = useState("")
  const responseSendingSingleTemplateMsg = useSelector((state)=>state.broadcast.responseSendingSingleTemplateMsg)

  const chatListRef = useRef(null)

  let intRef= useRef()
  let conRef = useRef()

  const [chatWindowScroll , setChatWindowScroll] = useState(false)

  useEffect(()=>{
    setChatWindowScroll(true)
  },[selectedChat])
  useEffect(()=>{
    let divHeight = chatListRef.current?.scrollHeight
    if(divHeight != undefined){
      if( chatListRef.current.scrollTop == 0 && chatWindowScroll){
        chatListRef.current.scrollTop = divHeight;
        setChatWindowScroll(false)
      }
    }
    clearTimeout(intRef)
    if(selectedChat != null){
      intRef = setTimeout(()=>dispatch(getBackgroundChatHistory(selectedChat)) , 2000)
    }
  },[chatHistory])

  useEffect(()=>{
    dispatch(getContacts())
    conRef = setInterval(()=>{
      dispatch(getContacts())
    },5000)
    return ()=>{
      clearTimeout(conRef)
    }
  },[])


  const ListTheme = ()=>createMuiTheme({
    overrides:{
      MuiList:{
        root:{
        }
      }
    }
  })

  const AvatarArray = [
    Av1
  ]



  const ChatListItem = ({title , onClickItem , id , unseenCount})=>{
    return(
    <>
      <MuiThemeProvider theme={ListTheme} key={title}>
        <ListItem
          className={id == selectedChat ? classes.selectedRecipientList : classes.recipientList} disableGutters button onClick={()=>onClickItem(id)}>
          <ListItemAvatar>
            <Avatar src={AvatarArray[0]} />
          </ListItemAvatar>
          <ListItemText primary={title} className={unseenCount !== 0 && classes.bold}/>
          {unseenCount != 0 &&<ListItemText primary={unseenCount}
                                             className={unseenCount !=0 && classes.bold}/>}
        </ListItem>
      </MuiThemeProvider>
      </>
  )}

  const onClickItem = (item)=>{
    if(item !== null){
      clearInterval(intRef)
      setSelectedChat(item)
      dispatch(getSelectedChatHistory(item))
    }
  }

  const onFileLoad = ({target}) => {
    let file = target.files[0]
    let url  =  URL.createObjectURL(file)
    let obj = new FormData()
    obj.append("file" , file)
    obj.append("phone" , selectedChat.toString())
    obj.append("caption" , "")
    let newMsg = {
      fromMe: true,
      filename: file?.name,
      image: url,
      url: url,
      send_type: "single",
      status: "sending",
      type: "image",
      phone: selectedChat,
      timestamp: 1643197893,
      _id: "gBEGkXhRiGVlAgnRrgK6hgWe5_M"
    }
    let newChatHistory = [...chatHistory , newMsg]
    dispatch(setTemplateChatHistory(newChatHistory))
    dispatch(sendMediaChat(obj))
  }

  const onDocLoad = ({target}) => {
    let file = target.files[0]
    let url  =  URL.createObjectURL(file)
    let obj = new FormData()
    obj.append("file" , file)
    obj.append("phone" , selectedChat)
    let newMsg = {
      fromMe: true,
      filename: file?.name,
      document: url,
      url: url,
      send_type: "single",
      status: "sending",
      type: "document",
      phone: selectedChat,
      timestamp: 1643197893,
      _id: "gBEGkXhRiGVlAgnRrgK6hgWe5_M"
    }
    let newChatHistory = [...chatHistory , newMsg]
    dispatch(setTemplateChatHistory(newChatHistory))
    dispatch(sendDocChat(obj))
  }

  const sendMsg = (e)=>{
    if(e.keyCode == 13 || e.keyCode == undefined){
      if(typedMsg != null && selectedChat != null){
        let obj = {
          phone: selectedChat ,
          type: "text",
          text: typedMsg.toString()
        }
        let newMsg = {
          fromMe: true,
          phone: selectedChat,
          text: {body: typedMsg},
          send_type: "single",
          status: "delivered",
          timestamp: 1643197893,
          type: "text",
          _id: "gBEGkXhRiGVlAgnRrgK6hgWe5_M"
        }
        dispatch(sendTemplateMessage(obj))
        let newChatHistory = [...chatHistory , newMsg]
        dispatch(setTemplateChatHistory(newChatHistory))
        setTimeout(()=>dispatch(getSelectedChatHistory(selectedChat)),1000)
        setTypedMsg("")
      }
    }
  }

  const getChatListItems = () => {

    let listItems = contacts.map((item)=>(
        <ChatListItem title={item?._id} id={item?._id}
                      unseenCount={item?.unseen_count}
                      onClickItem={onClickItem}
        />
    ))
    return listItems
  }

  const getStatusText = (param)=>{
    if(param == "read"){
      return(
        <Typography variant={"caption"}
                    color={"primary"}
                    className={classes.read}
                    style={{marginRight:"10px"}}>
          {capitalize(param)}
        </Typography>
      )
    }else if(param == "failed"){
      return (
        <Typography variant={"caption"}
                    color={"secondary"}
                    className={classes.failed}
                    style={{marginRight:"10px"}}>
          {capitalize(param)}
        </Typography>
      )
    }else{
      return (
        <Typography variant={"caption"}
                    color={"secondary"}
                    style={{marginRight:"10px", color:"#797979"}}>
          { capitalize(param)}
        </Typography>
      )
    }
  }


  const GetMessages = ({classes, item})=>{
    if(item?.type == "template") {
      return (
        <>
          <div className={classnames(classes.msgText , classes.templateMsgBlock,
            item?.fromMe ? classes.fromMe : classes.fromSender)}>
            <div className={classes.flexTitle}>
              <Typography variant={"h6"} className={classes.templateHeading}>
                Template
              </Typography>
              <Chip label={capitalize(item?.send_type)} className={classes.templateChip}/>
            </div>
              <Typography  size={"body1"}>
                {item?.text?.name}
              </Typography>
          </div>
          <div>
            <Typography variant={"caption"}
                        style={{marginRight:"10px", color:"#797979"}}>
              {item?.timestamp && timeConverter(item?.timestamp)}
            </Typography>
            {item?.status && getStatusText(item?.status)}
          </div>
        </>
      )
    }else if(item?.type == "text"){
      return (
        <>
          <Typography className={classnames(classes.msgText,
            item?.fromMe ? classes.fromMe : classes.fromSender)} size={"sm"}>
            {item?.text?.body}
          </Typography>
          <div>
            <Typography variant={"caption"}
                        style={{marginRight:"10px", color:"#797979"}}>
              {item?.timestamp && timeConverter(item?.timestamp)}
            </Typography>
            {item?.status && getStatusText(item?.status)}
          </div>
        </>
      )
    }else if(item?.type == "image"){
      return (
        <>
          <div className={classnames(classes.msgText , classes.templateMsgBlock ,
            item?.fromMe ? classes.fromMe : classes.fromSender)}>
            <div className={classes.flexTitle}>
              <Typography variant={"h6"} className={classes.templateHeading}>
                {removeUnderscoreAndCapitalize(item?.filename)}
              </Typography>
            </div>
            <img src={item?.image} style={{width:"200px"}}/>
          </div>
          <div>
            <Typography variant={"caption"}
                        style={{marginRight:"10px", color:"#797979"}}>
              {item?.timestamp && timeConverter(item?.timestamp)}
            </Typography>
            {item?.status && getStatusText(item?.status)}
          </div>
        </>
      )
    }else if(item?.type == "document") {
      return (
          <>
            <div className={classnames(classes.msgText, classes.templateMsgBlock,
                item?.fromMe ? classes.fromMe : classes.fromSender)}>
              <div className={classes.flexTitle}>
                <Typography variant={"h6"} className={classes.templateHeading}>
                  {removeUnderscoreAndCapitalize(item?.filename)}
                </Typography>
              </div>
              <a href={item?.document.toString()} target={"_blank"}>
                <img src={DocIcon} style={{width: "200px"}}/>
              </a>
            </div>
            <div>
              <Typography variant={"caption"}
                          style={{marginRight: "10px", color: "#797979"}}>
                {item?.timestamp && timeConverter(item?.timestamp)}
              </Typography>
              {item?.status && getStatusText(item?.status)}
            </div>
          </>)
    }else{
      return (<div/>)
    }
  }

  const lastDateOfChat = []
  Object.assign(lastDateOfChat , chatHistory)
  const d = lastDateOfChat.reverse().filter(item=>item?.fromMe != true)
  const timestamp = d[0]?.timestamp ? timeConverter(parseInt(d[0]?.timestamp)+(24*3600)) : null
  const chatDisabled = timestamp ? new Date(timestamp) < new Date() : false

  return (
    <Grid container className={classes.chatWindow}>
      <Grid item xs={4}>
        <Typography variant={"h5"} style={{marginLeft:"10px", fontWeight:"bold"}}>Chats</Typography>
        <br/>
        <List style={{height:"64vh" , overflowY:"scroll" , display:"flex",overflowX:"hidden",
          flexDirection:"column",alignItems:"center"}}>
          {getChatListItems()}
        </List>
      </Grid>
      <Grid item xs={8} className={classes.chatWrapperGrid}>
        <ListItem className={classes.recipientTitle} disableGutters>
          <ListItemAvatar>
            <Avatar src={AvatarArray[0]} />
          </ListItemAvatar>
          <ListItemText primary={selectedChat ? selectedChat : "Recipient name"}
          secondary={timestamp && (chatDisabled ? "Your chat is disabled" :`Your chat will be active till ${timestamp}`)}
          /><br/>
        </ListItem>
        <div className={classes.chatList}>
          <Box flex={1}
               className={chatHistoryLoading || chatHistory.length ==0 ?
                 classes.beforeLoading : classes.afterLoading}>
            {chatHistoryLoading
              ?<CircularProgress style={{width:"100px" , height:"100px"}}/>
              :
              <div ref={chatListRef}>
                {chatHistory.length > 0
                  ? <>
                    {chatHistory.map((item)=>{

                      if(item?.phone == selectedChat){
                        if(item.fromMe){
                          return(
                            <Box className={classes.rightMsg}>
                              <GetMessages classes={classes} item={item}/>
                            </Box>
                          )
                        }else{
                          return (
                            <Box className={classes.leftMsg}>
                              <GetMessages classes={classes} item={item}/>
                            </Box>
                          )
                        }
                      }
                    })}
                  </>
                  : <Typography size={"xl"}>You don't have messages yet</Typography>
                }
              </div>
            }
          </Box>
          <Box display={"flex"} className={classes.inputText}>
            <TextField
              fullWidth
              value={typedMsg}
              disabled={chatDisabled}
              placeholder={"Type your message here"}
              variant={"outlined"}
              onKeyDown={sendMsg}
              onChange={(e)=>setTypedMsg(e.target.value)}/>
            <IconButton disabled={chatDisabled} color={"primary"} onClick={sendMsg}>
              <Send/>
            </IconButton>
            <div>
              <input
                  accept="image/png, image/jpeg ,.png,.jpg,.jpeg"
                  className={classes.inputFile}
                  id="contained-button-image"
                  onChange={onFileLoad}
                  disabled={chatDisabled}
                  type="file"
              />
              <label htmlFor="contained-button-image">
                <IconButton disabled={chatDisabled} color={"secondary"} component={"span"}>
                  <Image />
                </IconButton>
              </label>
            </div>
            <div>
              <input
                  accept="application/pdf"
                  className={classes.inputFile}
                  id="contained-button-file"
                  onChange={onDocLoad}
                  disabled={chatDisabled}
                  type="file"
              />
              <label htmlFor="contained-button-file">
                <IconButton disabled={chatDisabled} color={"secondary"} component={"span"}>
                  <AttachFile />
                </IconButton>
              </label>
            </div>

          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
