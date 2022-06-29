import React, { useState, useEffect } from "react";
import {Box, Button, Drawer, IconButton, List, MuiThemeProvider, TextField, Typography} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core/styles"
import {
  People as PeopleIcon, Add,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import {Link, withRouter} from "react-router-dom";
import classNames from "classnames";
import jwtDecode from "jwt-decode";
import { ChatIcon  , StatusOnlineIcon , MenuAlt1Icon, ArrowLeftIcon , UserCircleIcon , LogoutIcon , AdjustmentsIcon} from "@heroicons/react/outline";

import Modal from "../Modal"
// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import {useDispatch, useSelector} from "react-redux";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {logout} from "../../store/reducer/login";

const structure = [
  { id: 0, label: "Broadcast History", uid:"broadcast-history", link: "/app/dashboard", activeIcon: <StatusOnlineIcon className="w-8 h-8 text-appPurple-300"  /> , inActiveIcon: <StatusOnlineIcon className="w-8 h-8 text-appWhiteText-200"  />},
  { id: 1, label: "Individual Chat",uid:"chats", link: "/app/chat", activeIcon: <ChatIcon className="w-8 h-8 text-appPurple-300"  /> , inActiveIcon: <ChatIcon className="w-8 h-8 text-appWhiteText-200" />},
  { id: 1, label: "Sequence", uid:"sequence",link: "/app/sequence", activeIcon:<AdjustmentsIcon className="w-8 h-8 text-appPurple-300"  />, inActiveIcon: <AdjustmentsIcon className="w-8 h-8 text-appWhiteText-200" />},
];
const adminStructure = [
  { id: 2, label: "Users", link: "/app/users", icon: <PeopleIcon /> },
];

function Sidebar(props) {
  const {location} = props;
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  const accessToken = useSelector((state)=>state.login.access_token)
  const [isAdmin , setIsAdmin] = useState(false)

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);


  useEffect(()=>{
    if(accessToken){
      const jDecode = jwtDecode(accessToken)
      if(jDecode?.sub === "admin@signatureglobal.in"){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
    }
  },[accessToken])


  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  const [openApiKeyModal , setOpenApiKeyModal] = useState(false)
  const [apiKey , setApiKey] = useState("")
  const error = useSelector((state)=>state.utils.error)
  const loading = useSelector((state)=>state.utils.loading)




  const onApiKeyCancelClick = ()=>{
    setOpenApiKeyModal(false)
    setApiKey("")
  }

  const onApiKeyNextClick = ()=>{

  }

  const TextFieldTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.palette.primary.main
      }
    },
  });
  var layoutState = useLayoutState();

  const dispatch = useDispatch()

  return (
   <div className={classNames(
       {
         [classes.drawerOpen]:layoutState.isSidebarOpened,
         [classes.drawerClose]:!layoutState.isSidebarOpened,
       }
     ,"h-screen bg-appGray-300 hidden lg:col-span-2 lg:flex flex-col items-center  shadow-xl")}>
     {/*<IconButton*/}
     {/*    color="inherit"*/}
     {/*    onClick={() => toggleSidebar(layoutDispatch)}*/}
     {/*    className={classNames(*/}
     {/*        classes.headerMenuButtonSandwich,*/}
     {/*        classes.headerMenuButtonCollapse,*/}
     {/*    )}*/}
     {/*>*/}
       {layoutState.isSidebarOpened ? (
           <Link className={"bg-appGray-200 my-2 w-4/5 h-14 flex justify-center items-center rounded-xl opacity-60"}
                 onClick={() => toggleSidebar(layoutDispatch)}>
             <ArrowLeftIcon className={" w-10 h-10 text-appWhiteText-200 "}/>
           </Link>
       ) : (
           <Link className={"my-2 w-20 h-14 flex justify-center items-center rounded-xl opacity-60"}
                 onClick={() => toggleSidebar(layoutDispatch)}>
             <MenuAlt1Icon className={"text-appPurple-300 w-8 h-8 "}/>
           </Link>
       )}
     {/*</IconButton>*/}
      <Modal title={"Add API Key"}
             onNext={onApiKeyNextClick}
             onCancel={onApiKeyCancelClick}
             loading={loading}
             error={error}
             theme={theme}
             open={openApiKeyModal} >
        <MuiThemeProvider theme={TextFieldTheme}>
          <br/>
          <Typography variant={"body"}>Enter your API Key which you can get from 360 dialog dashboard</Typography>
          <br/><br/>
          <TextField
              autoFocus
              margin="dense"
              id="api-key"
              label="API KEY"
              value={apiKey}
              type="text"
              variant={"outlined"}
              onChange={(e)=>setApiKey(e.target.value)}
              fullWidth
          />
        </MuiThemeProvider>

      </Modal>
      {/*<List className={classes.sidebarList}>*/}
     <div className={"pt-[5vh]"}></div>
        {isAdmin ?
          <>
            {adminStructure.map(link => (
              <SidebarLink
                key={link.id}
                location={location}
                isSidebarOpened={isSidebarOpened}
                {...link}
              />
            ))}
          </>
          :
          <>
            {structure.map(link => (
              <SidebarLink
                key={link.id}
                location={location}
                isSidebarOpened={isSidebarOpened}
                {...link}
              />
            ))}
          </>
        }
     <div className={"pt-[50vh]"}></div>

     <div
         onClick={()=>{
           dispatch(logout())
           props.history.push("/login")
         }}
         className="cursor-pointer my-2 w-4/5 h-14 flex justify-center items-center rounded-xl opacity-60">

       <LogoutIcon className="w-8 h-8 text-appWhiteText-200"/>
       {isSidebarOpened && <p className="text-appWhiteText-200 ml-2">Logout</p>}

     </div>
   </div>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
