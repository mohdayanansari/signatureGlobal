import React, { useEffect, useState } from "react";
import {
  Grid,
  Button, Box, TextField, InputLabel, Divider, MuiThemeProvider, createMuiTheme,
} from "@material-ui/core";
import  Autocomplete from  "@material-ui/lab/Autocomplete"
import { useTheme } from "@material-ui/styles";
import SendIcon from '@material-ui/icons/Send';
import { CloudUpload, Description } from "@material-ui/icons";
// styles
import useStyles from "./styles";
import ImageShowCase from "../../images/image-column.PNG"
import AudioShowCase from "../../images/audio.PNG"
import VideoShowCase from "../../images/video-column.PNG"
import PhoneShowCase from "../../images/phone-number.PNG"
// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Table from "./components/Table/Table";
import Modal from "../../components/Modal";
import { useDispatch , useStore , useSelector} from "react-redux";
import PhoneInput from "react-phone-number-input"
import 'react-phone-number-input/style.css'
import {isValidPhoneNumber} from "react-phone-number-input"
import { useRouteMatch } from "react-router-dom";
import { timeConverter } from "../../utils/date-parse";
import { downloadHistoryData, downloadUserHistoryData, getUsers } from "../../store/reducer/users";


const PhoneNumberStep = ({onChangeNumber ,number, classes})=>{
  return(
    <div>
      <Typography size={"sm"}>Enter phone number</Typography>
      <PhoneInput
        style={{marginTop:"5px"}}
        international
        onCountryChange={(countryCode) => {
          console.log(countryCode)
        }}
        defaultCountry="IN"
        autoComplete="on"
        value={number}
        className={classes.phoneNumberInput}
        countryCallingCodeEditable={false}
        onChange={onChangeNumber}
        error={
          number
            ? isValidPhoneNumber(number)
              ? undefined
              : "Invalid Phone Number"
            : ``
        }
      />
    </div>
  )
}


export default function Users(props) {
  var classes = useStyles();
  var theme = useTheme();
  const dispatch = useDispatch()
  const store = useStore()
  const userList = useSelector((state)=>state.users.usersList)

  const error = useSelector((state)=>state.users.error)
  const chatHistoryDownloaded = useSelector((state)=>state.users.chatHistoryDownloaded)

  //loader for sending request
  const loading = useSelector((state)=>state.users.loading)

  // useEffect for get users
  useEffect(()=>{
    dispatch(getUsers())
  },[])

  // open chat modal state
  const [openChatModal, setOpenChatModal] = useState(false)
  const [currentChatModalStepIndex, setChatCurrentModalStepIndex] = useState(0)
  const [contactNumber , setContactNumber] = useState("")

  const onChangeNumber = (value)=>{
    setContactNumber(value)
  }
  const ChatHistoryModal = [
    <PhoneNumberStep
      number={contactNumber}
      onChangeNumber={onChangeNumber}
      classes={classes}/>
  ]
  useEffect(()=>{
    if(chatHistoryDownloaded){
      setOpenChatModal(false)
    }
  },[chatHistoryDownloaded])

  
  const onDownloadHistory = (user)=>{
    if(user != "" && user != undefined){
      var formData = new FormData()
      formData.append("user" , user)
      dispatch(downloadHistoryData(formData))
    }
  }

  const onChatModalNextClick = ()=>{
    if(currentUser != "" && contactNumber !=""){
      var formData = new FormData()
      let cNumber = contactNumber.slice(1 , contactNumber.length)
      formData.append("phone" , cNumber)
      formData.append("user" , currentUser)
      dispatch(downloadUserHistoryData(formData))
    }
  }
  const onChatModalCancelClick = ()=>{
    setCurrentUser("")
    setOpenChatModal(false)
    setContactNumber("")
  }

  const [currentUser , setCurrentUser] = useState("")

  const onDownloadUserHistory = (user)=>{
    setCurrentUser(user)
    setOpenChatModal(true)
    setChatCurrentModalStepIndex(0)
  }


  return (
    <Box margin={2}>
      <PageTitle title="Users History" />
      {/*single sending modal*/}
      <Modal title={"Download Chat History"}
             onNext={onChatModalNextClick}
             onCancel={onChatModalCancelClick}
             loading={loading}
             error={error}
             theme={theme}
             open={openChatModal} >
        {ChatHistoryModal[currentChatModalStepIndex]}
      </Modal>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title="User List"
            upperTitle
            noBodyPadding
            disableWidgetMenu={true}
            bodyClass={classes.tableWidget}
          >
            <Table
              data={userList}
              onDownloadHistory={onDownloadHistory}
              onDownloadUserHistory={onDownloadUserHistory}/>
          </Widget>
        </Grid>
      </Grid>
    </Box>
  );
}

