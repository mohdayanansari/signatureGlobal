import React, { useEffect, useState } from "react";
import {
    Grid,
    Button, Box, TextField, InputLabel, Divider, MuiThemeProvider, createMuiTheme, InputAdornment, IconButton, Snackbar,
} from "@material-ui/core";
import  Autocomplete from  "@material-ui/lab/Autocomplete"
import { useTheme } from "@material-ui/styles";
import SendIcon from '@material-ui/icons/Send';
import {CloudUpload, Description, Email, Visibility, VisibilityOff, VpnKey} from "@material-ui/icons";
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
import {downloadHistoryData, downloadUserHistoryData, getUsers, updateUserPassword} from "../../store/reducer/users";
import Alert from "@material-ui/lab/Alert";


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

const ChangePasswordStep = ({onChangePassword ,password,email, classes , onEyeClick,passwordVisible})=>{
  return(
    <div>
      <TextField fullWidth
                 variant={"outlined"}
                 disabled
                 value={email}
                 label="User Email"
                 type="email"
                 margin={"normal"}
                 InputProps={{
                   startAdornment: (
                       <InputAdornment position="start">
                         <Email />
                       </InputAdornment>
                   )
                 }}
                 id="email" />
      <br/>

      <TextField fullWidth
                 label="Enter New Password"
                 type={passwordVisible ? "text":"password"}
                 margin={"normal"}
                 variant={"outlined"}
                 InputProps={{
                   startAdornment: (
                       <InputAdornment position="start">
                         <VpnKey/>
                       </InputAdornment>
                   ),
                   endAdornment:(
                       <InputAdornment position="start">
                         <IconButton onClick={onEyeClick}>
                           {passwordVisible ? <VisibilityOff/> :<Visibility/>}
                         </IconButton>
                       </InputAdornment>
                   )
                 }}
                 value={password}
                 onChange={onChangePassword}/>
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
  const passwordUpdated = useSelector((state)=>state.users.passwordUpdated)

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
  const [currentUser , setCurrentUser] = useState("")

  const [editUserModal , setEditUserModal] = useState(false)
  const [password , setPassword] = useState("")
  const [passwordVisible , setPasswordVisible] = useState(false)
    const [showSnackBar , setShowSnackBar] = useState(false)

  const onChangeNumber = (value)=>{
    setContactNumber(value)
  }
  const ChatHistoryModal = [
    <PhoneNumberStep
      number={contactNumber}
      onChangeNumber={onChangeNumber}
      classes={classes}/>
  ]
  const onChangePassword = (e)=>{
    setPassword(e.target.value)
  }
  const onEyeClick = ()=>{
    setPasswordVisible(!passwordVisible)
  }
  const EditChatModal = [
      <ChangePasswordStep
          onEyeClick={onEyeClick}
          passwordVisible={passwordVisible}
          password={password}
          email={currentUser}
          onChangePassword={onChangePassword}
          classes={classes}
      />
  ]
  useEffect(()=>{
    if(chatHistoryDownloaded){
      setCurrentUser("")
      setOpenChatModal(false)
      setContactNumber("")
    }
  },[chatHistoryDownloaded])

  useEffect(()=>{
    if(passwordUpdated){
      setCurrentUser("")
      setEditUserModal(false)
      setPassword("")
        setPasswordVisible(false)
        setShowSnackBar(true)
    }
  },[passwordUpdated])

  
  const onDownloadHistory = (user)=>{
    if(user != "" && user != undefined){
      var formData = new FormData()
      formData.append("user" , user)
      dispatch(downloadHistoryData(formData))
    }
  }

  const onEditUser = (user)=>{
    setCurrentUser(user)
    setEditUserModal(true)
  }
  const onEditUserNextClick = ()=>{
    if(currentUser != "" && password !== ""){
      let formData = new FormData()
      formData.append("password" , password)
      formData.append("user" , currentUser)
      dispatch(updateUserPassword(formData))
    }
  }
  const onEditUserCancelClick = ()=>{
    setCurrentUser("")
    setEditUserModal(false)
      setPasswordVisible(false)
    setPassword("")
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


  const onDownloadUserHistory = (user)=>{
    setCurrentUser(user)
    setOpenChatModal(true)
    setChatCurrentModalStepIndex(0)
  }

  const handleCloseSnackbar = ()=>{
      setShowSnackBar(false)
  }


  return (
    <Box margin={2}>
      <PageTitle title="Users History" />
        <Snackbar
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            open={showSnackBar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success">
                Password updated successfully!
            </Alert>
        </Snackbar>
      {/*download chat modal*/}
      <Modal title={"Download Chat History"}
             onNext={onChatModalNextClick}
             onCancel={onChatModalCancelClick}
             loading={loading}
             error={error}
             theme={theme}
             open={openChatModal} >
        {ChatHistoryModal[currentChatModalStepIndex]}
      </Modal>
      {/*edit user modal*/}
      <Modal title={"Edit user details"}
             onNext={onEditUserNextClick}
             onCancel={onEditUserCancelClick}
             loading={loading}
             error={error}
             theme={theme}
             open={editUserModal} >
        {EditChatModal[0]}
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
              onEditUser={onEditUser}
              onDownloadHistory={onDownloadHistory}
              onDownloadUserHistory={onDownloadUserHistory}/>
          </Widget>
        </Grid>
      </Grid>
    </Box>
  );
}

