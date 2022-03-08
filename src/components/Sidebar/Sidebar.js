import React, { useState, useEffect } from "react";
import {Box, Button, Drawer, IconButton, List, MuiThemeProvider, TextField, Typography} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core/styles"
import {
  Home as HomeIcon,
  RecordVoiceOver as SurroundSoundIcon,
  Sms as ChatIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  People as PeopleIcon, Add,
   ContactPhone as ContactsIcon
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import jwtDecode from "jwt-decode";
import Modal from "../Modal"
// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useSelector } from "react-redux";

const structure = [
  { id: 0, label: "Broadcast History", link: "/app/dashboard", icon: <SurroundSoundIcon /> },
  { id: 1, label: "Individual Chat", link: "/app/chat", icon: <ChatIcon /> },
  // { id: 2, label: "Contacts", link: "/app/contacts", icon: <ContactsIcon/> },

  // {
  //   id: 1,
  //   label: "Typography",
  //   link: "/app/typography",
  //   icon: <TypographyIcon />,
  // },
  // { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
  // {
  //   id: 3,
  //   label: "Notifications",
  //   link: "/app/notifications",
  //   icon: <NotificationsIcon />,
  // },
  // {
  //   id: 4,
  //   label: "UI Elements",
  //   link: "/app/ui",
  //   icon: <UIElementsIcon />,
  //   children: [
  //     { label: "Icons", link: "/app/ui/icons" },
  //     { label: "Charts", link: "/app/ui/charts" },
  //     { label: "Maps", link: "/app/ui/maps" },
  //   ],
  // },
  // { id: 5, type: "divider" },
  // { id: 6, type: "title", label: "HELP" },
  // { id: 7, label: "Library", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  // { id: 8, label: "Support", link: "https://flatlogic.com/forum", icon: <SupportIcon /> },
  // { id: 9, label: "FAQ", link: "https://flatlogic.com/forum", icon: <FAQIcon /> },
  // { id: 10, type: "divider" },
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 12,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="small" color="warning" />,
  // },
  // {
  //   id: 13,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="small" color="primary" />,
  // },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="small" color="secondary" />,
  // },
];
const adminStructure = [
  // { id: 0, label: "Broadcast History", link: "/app/dashboard", icon: <SurroundSoundIcon /> },
  // { id: 1, label: "Individual Chat", link: "/app/chat", icon: <ChatIcon /> },
  { id: 2, label: "Users", link: "/app/users", icon: <PeopleIcon /> },
  // { id: 3, label: "Contacts", link: "/app/contacts", icon: <ContactsIcon/> },
  // {
  //   id: 1,
  //   label: "Typography",
  //   link: "/app/typography",
  //   icon: <TypographyIcon />,
  // },
  // { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
  // {
  //   id: 3,
  //   label: "Notifications",
  //   link: "/app/notifications",
  //   icon: <NotificationsIcon />,
  // },
  // {
  //   id: 4,
  //   label: "UI Elements",
  //   link: "/app/ui",
  //   icon: <UIElementsIcon />,
  //   children: [
  //     { label: "Icons", link: "/app/ui/icons" },
  //     { label: "Charts", link: "/app/ui/charts" },
  //     { label: "Maps", link: "/app/ui/maps" },
  //   ],
  // },
  // { id: 5, type: "divider" },
  // { id: 6, type: "title", label: "HELP" },
  // { id: 7, label: "Library", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  // { id: 8, label: "Support", link: "https://flatlogic.com/forum", icon: <SupportIcon /> },
  // { id: 9, label: "FAQ", link: "https://flatlogic.com/forum", icon: <FAQIcon /> },
  // { id: 10, type: "divider" },
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 12,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="small" color="warning" />,
  // },
  // {
  //   id: 13,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="small" color="primary" />,
  // },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="small" color="secondary" />,
  // },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  const accessToken = useSelector((state)=>state.login.access_token)
  const [isAdmin , setIsAdmin] = useState(false)

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


  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames(classes.paper,{
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>

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
      <List className={classes.sidebarList}>

        {/*{isAdmin &&*/}
        {/*<Box marginTop={"20px"} marginBottom={"20px"} display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>*/}
        {/*  <Button*/}
        {/*      variant={"contained"}*/}
        {/*      color={"primary"}*/}
        {/*      startIcon={<Add/>}*/}
        {/*      onClick={()=>setOpenApiKeyModal(true)}*/}
        {/*  >*/}
        {/*    {isSidebarOpened && "Add API Key"}*/}
        {/*  </Button>*/}
        {/*</Box>}*/}

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
      </List>
    </Drawer>
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
