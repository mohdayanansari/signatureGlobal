import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  MuiThemeProvider,
  TextField,
  Typography,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { People as PeopleIcon, Add } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { Link, withRouter } from "react-router-dom";
import classNames from "classnames";
import jwtDecode from "jwt-decode";
import {
  ChatIcon,
  StatusOnlineIcon,
  MenuAlt1Icon,
  ArrowLeftIcon,
  UserCircleIcon,
  LogoutIcon,
  AdjustmentsIcon,
  CollectionIcon,
  DatabaseIcon,
  BriefcaseIcon,
} from "@heroicons/react/outline";

import Modal from "../Modal";
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
import { useDispatch, useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { logout } from "../../store/reducer/login";

const structure = [
  {
    id: 0,
    label: "Broadcast History",
    uid: "broadcast-history",
    link: "/app/dashboard",
    activeIcon: <StatusOnlineIcon className="w-8 h-8 text-[#ffdc2b]" />,
    inActiveIcon: <StatusOnlineIcon className="w-8 h-8 text-[#c0a002]" />,
  },
  {
    id: 1,
    label: "Individual Chat",
    uid: "chats",
    link: "/app/chat",
    activeIcon: <ChatIcon className="w-8 h-8 text-[#ffdc2b]" />,
    inActiveIcon: <ChatIcon className="w-8 h-8 text-[#c0a002]" />,
  },
  {
    id: 2,
    label: "Sequence",
    uid: "sequence",
    link: "/app/sequence",
    activeIcon: <AdjustmentsIcon className="w-8 h-8 text-[#ffdc2b]" />,
    inActiveIcon: <AdjustmentsIcon className="w-8 h-8 text-[#c0a002]" />,
  },
  {
    id: 3,
    label: "Show Jobs",
    uid: "jobs",
    link: "/app/jobs",
    activeIcon: <BriefcaseIcon className="w-8 h-8 text-[#ffdc2b]" />,
    inActiveIcon: <BriefcaseIcon className="w-8 h-8 text-[#c0a002]" />,
  },
  {
    id: 4,
    label: "Bulk Sequence",
    uid: "bulkSequence",
    link: "/app/bulk-sequence",
    activeIcon: <DatabaseIcon className="w-8 h-8 text-[#ffdc2b]" />,
    inActiveIcon: <DatabaseIcon className="w-8 h-8 text-[#c0a002]" />,
  },
];
const adminStructure = [
  { id: 2, label: "Users", link: "/app/users", icon: <PeopleIcon /> },
];

function Sidebar(props) {
  const { location } = props;
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  const accessToken = useSelector((state) => state.login.access_token);
  const [isAdmin, setIsAdmin] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    if (accessToken) {
      const jDecode = jwtDecode(accessToken);
      if (jDecode?.sub === "admin@signatureglobal.in") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [accessToken]);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  const [openApiKeyModal, setOpenApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const error = useSelector((state) => state.utils.error);
  const loading = useSelector((state) => state.utils.loading);
  const usernameData = useSelector((state) => state.login.username);

  const onApiKeyCancelClick = () => {
    setOpenApiKeyModal(false);
    setApiKey("");
  };

  const onApiKeyNextClick = () => {};

  const TextFieldTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.palette.primary.main,
      },
    },
  });
  var layoutState = useLayoutState();

  const dispatch = useDispatch();

  return (
    <div
      className={classNames(
        {
          [classes.drawerOpen]: layoutState.isSidebarOpened,
          [classes.drawerClose]: !layoutState.isSidebarOpened,
        },
        "h-screen border-r border-gray-100/20 hidden lg:col-span-2 lg:flex flex-col items-center  shadow-xl py-5",
      )}
    >
      {/*<IconButton*/}
      {/*    color="inherit"*/}
      {/*    onClick={() => toggleSidebar(layoutDispatch)}*/}
      {/*    className={classNames(*/}
      {/*        classes.headerMenuButtonSandwich,*/}
      {/*        classes.headerMenuButtonCollapse,*/}
      {/*    )}*/}
      {/*>*/}
      {layoutState.isSidebarOpened ? (
        <Link
          className={
            "bg-appGray-700 my-2 w-4/5 [#FED500] h-14 flex justify-center items-center rounded-xl opacity-60"
          }
          onClick={() => toggleSidebar(layoutDispatch)}
        >
          <ArrowLeftIcon className={" w-10 h-10 text-[#FED500] "} />
        </Link>
      ) : (
        <Link
          className={
            "my-2 w-20 h-14 flex justify-center items-center rounded-xl opacity-60"
          }
          onClick={() => toggleSidebar(layoutDispatch)}
        >
          <MenuAlt1Icon className={"text-[#FED500] w-8 h-8 "} />
        </Link>
      )}
      {/*</IconButton>*/}
      <Modal
        title={"Add API Key"}
        onNext={onApiKeyNextClick}
        onCancel={onApiKeyCancelClick}
        loading={loading}
        error={error}
        theme={theme}
        open={openApiKeyModal}
      >
        <MuiThemeProvider theme={TextFieldTheme}>
          <br />
          <Typography variant={"body"}>
            Enter your API Key which you can get from 360 dialog dashboard
          </Typography>
          <br />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="api-key"
            label="API KEY"
            value={apiKey}
            type="text"
            variant={"outlined"}
            onChange={(e) => setApiKey(e.target.value)}
            fullWidth
          />
        </MuiThemeProvider>
      </Modal>
      {/*<List className={classes.sidebarList}>*/}
      {isSidebarOpened ? (
        <div className="my-10 py-5 flex flex-col items-center gap-5 glassed rounded border border-white/20  w-[80%] relative">
          <div className="w-[50px] h-[50px] rounded-full bg-[#FED500] text-black/90 font-black text-2xl flex justify-center items-center shadow -mt-[45px]">
            {usernameData.toUpperCase()[0]}
          </div>
          <div className="text-white/60 flex flex-col items-center justify-center">
            {/* <h1>Hey👋,</h1> */}
            <h1 className="text-lg font-bold">{usernameData}</h1>
          </div>
        </div>
      ) : (
        <div className="w-[50px] h-[50px] bg-[#FED500] text-black/80 rounded-full shadow-lg my-10 flex justify-center items-center text-2xl font-black">
          <div className="-mt-[3px]">{usernameData.toUpperCase()[0]}</div>
        </div>
      )}
     
      {isAdmin ? (
        <>
          {adminStructure.map((link) => (
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
        </>
      ) : (
        <>
          {structure.map((link) => (
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
        </>
      )}

      <div
        onClick={() => {
          dispatch(logout());
          props.history.push("/login");
        }}
        className="cursor-pointer bg-white/10 w-4/5 h-14 flex justify-center items-center rounded-xl opacity-60 mt-5"
      >
        <LogoutIcon className="w-8 h-8 text-appWhiteText-200" />
        {isSidebarOpened && (
          <p className="text-appWhiteText-200 ml-2">Logout</p>
        )}
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
