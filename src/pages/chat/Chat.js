import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  createMuiTheme,
  MuiThemeProvider,
  CircularProgress,
  Chip,
} from "@material-ui/core";
// styles
import useStyles from "./styles";
import {
  capitalize,
  removeUnderscoreAndCapitalize,
  timeConverter,
} from "../../utils/date-parse";
// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Table from "./components/Table/Table";
import Modal from "../../components/Modal";
import { useDispatch, useStore, useSelector } from "react-redux";
import {
  setTemplateMessages,
  fetchTemplateMessages,
  sendTemplateMessage,
  sendBulkUploadTemplateMessage,
} from "../../store/reducer/broadcast";
import {
  getBackgroundChatHistory,
  sendDocChat,
  sendMediaChat,
  setTemplateChatHistory,
} from "../../store/reducer/chat";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useRouteMatch } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import Fab from "@mui/material/Fab";
import { getContacts, getSelectedChatHistory } from "../../store/reducer/chat";
import classnames from "classnames";
import Av1 from "../../images/av1.png";
import DocIcon from "../../images/docs.png";
// import Chats from "../newchatpage/Tabs/Chats";
import {
  CheckIcon,
  ClockIcon,
  DownloadIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  DocumentTextIcon,
  ExclamationCircleIcon,
  // SupportIcon,
  // UserCircleIcon,
} from "@heroicons/react/solid";
import TypingAnimation from "../../components/TypingAnimation";
import UserHead from "../newchatpage/UserChat/UserHead";
// import avatar4 from "../../images/av1.png";
// import avatar1 from "../../images/av2.png";
import ChatInput from "../newchatpage/UserChat/ChatInput";
import { saveAs } from "file-saver";
import { Avatar } from "@mui/material";

export default function Chat(props) {
  var classes = useStyles();
  // var theme = useTheme();
  const dispatch = useDispatch();
  const store = useStore();

  const contacts = useSelector((state) => state.chat.contacts);
  const chatHistoryLoading = useSelector(
    (state) => state.chat.chatHistoryLoading,
  );
  const chatHistory = useSelector((state) => state.chat.chatHistory);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatName, setSelectedChatName] = useState(null);
  const [typedMsg, setTypedMsg] = useState("");
  const responseSendingSingleTemplateMsg = useSelector(
    (state) => state.broadcast.responseSendingSingleTemplateMsg,
  );

  const chatListRef = useRef(null);
  const scrollToBottomRef = useRef(null);

  let intRef = useRef();
  let conRef = useRef();

  const [chatWindowScroll, setChatWindowScroll] = useState(false);
  // Search Chat State
  const [querry, setQuerry] = useState("");
  const [searchParams] = useState(["name", "number"]);
  const [filterParam, setFilterParam] = useState(["name"]);

  useEffect(() => {
    setChatWindowScroll(true);
  }, [selectedChat]);

  useEffect(() => {
    // let divHeight = chatListRef.current?.scrollHeight;

    if (selectedChat) {
      // chatListRef.current.scrollTop = divHeight;
      scrollToBottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setChatWindowScroll(false);
    }
    clearTimeout(intRef);
    if (selectedChat != null) {
      intRef.current = setTimeout(
        () => dispatch(getBackgroundChatHistory(selectedChat)),
        2000,
      );
    }
  }, [chatHistory]);

  useEffect(() => {
    let number = contacts[0]?.number;
    let name = contacts[0]?.name;
    setSelectedChat(number);
    setSelectedChatName(name);
    dispatch(getBackgroundChatHistory(number));
  }, []);

  useEffect(() => {
    dispatch(getContacts());
    conRef.current = setInterval(() => {
      dispatch(getContacts());
    }, 5000);
    return () => {
      clearTimeout(conRef);
    };
  }, []);

  const ListTheme = () =>
    createMuiTheme({
      overrides: {
        MuiList: {
          root: {},
        },
      },
    });

  const handleChatSearch = (e) => {
    e.preventDefault();
    contacts?.filter((item) => {
      return searchParams.some((newContact) => {
        return (
          item[newContact]
            .toString()
            .toLowerCase()
            .indexOf(querry.toLowerCase()) > -1
        );
      });
    });
  };
  // CONTACT SEARCH COMPONENTS
  const searchData = Object.values(contacts);
  const Search = (contacts) => {
    return contacts?.filter((item) => {
      return searchParams.some((newContact) => {
        return (
          item[newContact]
            .toString()
            .toLowerCase()
            .indexOf(querry.toLowerCase()) > -1
        );
      });
    });
  };

  const AvatarArray = [Av1];

  const ChatListItem = ({ title, onClickItem, id, unseenCount }) => {
    return (
      <>
        <MuiThemeProvider theme={ListTheme} key={title}>
          <ListItem
            className={
              id == selectedChat
                ? classes.selectedRecipientList
                : classes.recipientList
            }
            disableGutters
            button
            onClick={() => onClickItem(id)}
          >
            <ListItemAvatar>
              <Avatar src={AvatarArray[0]} />
            </ListItemAvatar>
            <ListItemText
              primary={title}
              className={unseenCount !== 0 && classes.bold}
            />
            {unseenCount != 0 && (
              <ListItemText
                primary={unseenCount}
                className={unseenCount != 0 && classes.bold}
              />
            )}
          </ListItem>
        </MuiThemeProvider>
      </>
    );
  };

  const NewChatListItem = ({
    data,
    name,
    number,
    status,
    messages,
    time,
    onClickItem,
    id,
    unseenCount,
  }) => {
    return (
      <>
        <div
          key={id}
          className="p-[15px] my-[5px] flex w-full rounded cursor-pointer hover:bg-appGray-200"
          onClick={() => onClickItem(id, name, number)}
        >
          {/* User Image Container */}
          <div>
            <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
              {!name ? "?" : name.toUpperCase()[0]}
            </div>
          </div>
          {/* User Image Container ENDS-- */}
          <div className="mt-[-5px] pl-4 w-full text-white text-opacity-80">
            <div className="flex justify-between pr-[10px]">
              <h1 className="font-bold ">{!name ? "User" : name}</h1>
              <div className="">
                <p className="text-xs ">{timeConverter(time)}</p>
              </div>
            </div>
            <div className="flex w-full justify-between pr-[10px]">
              <p className="text-sm ">{number}</p>
              {unseenCount === 0 ? (
                ""
              ) : (
                <div className="bg-red-500 h-[20px] w-[20px] text-red-600 font-bold bg-opacity-20 rounded-full flex justify-center items-center text-xs">
                  {unseenCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  const onClickItem = (item, name, number) => {
    if (item !== null) {
      clearInterval(intRef);
      // console.log("Selected Chat:::", item);
      setSelectedChat(item);
      setSelectedChatName(name);
      dispatch(getSelectedChatHistory(number));
    }
  };

  const onFileLoad = ({ target }) => {
    let file = target.files[0];
    console.log(file);
    let url = URL.createObjectURL(file);
    let obj = new FormData();
    obj.append("file", file);
    obj.append("phone", selectedChat.toString());
    obj.append("caption", "");
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
      _id: "gBEGkXhRiGVlAgnRrgK6hgWe5_M",
    };
    let newChatHistory = [...chatHistory, newMsg];
    dispatch(setTemplateChatHistory(newChatHistory));
    dispatch(sendMediaChat(obj));
  };
  const onVideoLoad = ({ target }) => {
    let file = target.files[0];
    let url = URL.createObjectURL(file);
    let obj = new FormData();
    obj.append("file", file);
    obj.append("phone", selectedChat);
    let newMsg = {
      fromMe: true,
      filename: file?.name,
      document: url,
      url: url,
      send_type: "single",
      status: "sending",
      type: "video",
      phone: selectedChat,
      timestamp: 1643197893,
      _id: "gBEGkXhRiGVlAgnRrgK6hgWe5_M",
    };
    let newChatHistory = [...chatHistory, newMsg];
    dispatch(setTemplateChatHistory(newChatHistory));
    dispatch(sendDocChat(obj));
  };

  const onDocLoad = ({ target }) => {
    let file = target.files[0];
    let url = URL.createObjectURL(file);
    let obj = new FormData();
    obj.append("file", file);
    obj.append("phone", selectedChat);
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
      _id: "gBEGkXhRiGVlAgnRrgK6hgWe5_M",
    };
    let newChatHistory = [...chatHistory, newMsg];
    dispatch(setTemplateChatHistory(newChatHistory));
    dispatch(sendDocChat(obj));
  };

  const sendMsg = (e) => {
    if (typedMsg != null && selectedChat != null) {
      //todo: condition to set the user or sender phone number in "phone key value pair"::
      let obj = {
        phone: selectedChat,
        type: "text",
        text: typedMsg.toString(),
      };
      let newMsg = {
        fromMe: true,
        phone: selectedChat,
        text: { body: typedMsg },
        send_type: "single",
        status: "delivered",
        timestamp: 1643197893,
        type: "text",
        _id: "gBEGkXhRiGVlAgnRrgK6hgWe5_M",
      };
      dispatch(sendTemplateMessage(obj));
      let newChatHistory = [...chatHistory, newMsg];
      dispatch(setTemplateChatHistory(newChatHistory));
      setTimeout(() => dispatch(getSelectedChatHistory(selectedChat)), 1000);
      setTypedMsg("");
    }
  };

  const getChatListItems = () => {
    let listItems = contacts.map((item, index) => (
      <NewChatListItem
        key={index}
        name={item?.name}
        number={item?.number}
        status={item?.status}
        time={item?.timestamp}
        messages={item?.messages}
        id={item?._id}
        unseenCount={item?.unseen_count}
        onClickItem={onClickItem}
      />
    ));
    return listItems;
  };

  const getStatusText = useCallback(
    (param) => {
      if (param === "read") {
        return (
          <>
            <CheckIcon className="w-4 text-green-600 " />
            <CheckIcon className="w-4 text-green-600  -ml-[13px]" />
          </>
        );
      } else if (param === "failed") {
        return (
          <>
            <Typography
              variant={"caption"}
              color={"secondary"}
              className={classes.failed}
              style={{ marginRight: "10px" }}
            >
              {capitalize(param)}
            </Typography>
            <ExclamationCircleIcon className="w-4 text-red-600 " />
          </>
        );
      } else {
        return (
          <>
            <CheckIcon className="w-4 text-[#FED500]" />
            <CheckIcon className="w-4 text-[#FED500] -ml-[13px]" />
          </>
        );
      }
    },
    [classes.failed],
  );

  const GetMessages = ({ classes, item }) => {
    if (item?.type === "template") {
      return (
        <>
          <div
            className={classnames(
              classes.msgText,
              classes.templateMsgBlock,
              item?.fromMe ? classes.fromMe : classes.fromSender,
            )}
          >
            <div className={classes.flexTitle}>
              <Typography variant={"h6"} className={classes.templateHeading}>
                Template
              </Typography>
              <Chip
                label={capitalize(item?.send_type)}
                className={classes.templateChip}
              />
            </div>
            <Typography size={"body1"}>{item?.text?.name}</Typography>
          </div>
          <div>
            <Typography
              variant={"caption"}
              style={{ marginRight: "10px", color: "#797979" }}
            >
              {item?.timestamp && timeConverter(item?.timestamp)}
            </Typography>
            {item?.status && getStatusText(item?.status)}
          </div>
        </>
      );
    } else if (item?.type === "text") {
      return (
        <>
          <Typography
            className={classnames(
              classes.msgText,
              item?.fromMe ? classes.fromMe : classes.fromSender,
            )}
            size={"sm"}
          >
            {item?.text?.body}
          </Typography>
          <div>
            <Typography
              variant={"caption"}
              style={{ marginRight: "10px", color: "#797979" }}
            >
              {item?.timestamp && timeConverter(item?.timestamp)}
            </Typography>
            {item?.status && getStatusText(item?.status)}
          </div>
        </>
      );
    } else if (item?.type === "image") {
      return (
        <>
          <div
            className={classnames(
              classes.msgText,
              classes.templateMsgBlock,
              item?.fromMe ? classes.fromMe : classes.fromSender,
            )}
          >
            <div className={classes.flexTitle}>
              <Typography variant={"h6"} className={classes.templateHeading}>
                {removeUnderscoreAndCapitalize(item?.filename)}
              </Typography>
            </div>
            <img src={item?.image} style={{ width: "200px" }} alt="Notbot" />
          </div>
          <div>
            <Typography
              variant={"caption"}
              style={{ marginRight: "10px", color: "#797979" }}
            >
              {item?.timestamp && timeConverter(item?.timestamp)}
            </Typography>
            {item?.status && getStatusText(item?.status)}
          </div>
        </>
      );
    } else if (item?.type === "document") {
      return (
        <>
          <div
            className={classnames(
              classes.msgText,
              classes.templateMsgBlock,
              item?.fromMe ? classes.fromMe : classes.fromSender,
            )}
          >
            <div className={classes.flexTitle}>
              <Typography variant={"h6"} className={classes.templateHeading}>
                {removeUnderscoreAndCapitalize(item?.filename)}
              </Typography>
            </div>
            <a
              href={item?.document.toString()}
              target={"_blank"}
              rel="noreferrer"
            >
              <img src={DocIcon} style={{ width: "200px" }} alt="Notbot" />
            </a>
          </div>
          <div>
            <Typography
              variant={"caption"}
              style={{ marginRight: "10px", color: "#797979" }}
            >
              {item?.timestamp && timeConverter(item?.timestamp)}
            </Typography>
            {item?.status && getStatusText(item?.status)}
          </div>
        </>
      );
    } else {
      return <div />;
    }
  };

  //! <-- -----------------------TEXT MESSAGES-- SEND BY USER--------------- -->
  const GetNewMessages = useCallback(
    ({ item }) => {
      if (item?.type === "text") {
        if (!item.fromMe) {
          // console.log(item);
          return (
            <div className={classnames("flex justify-start mb-[30px]")}>
              <div className="flex gap-4 ">
                {/* Avatar */}
                {/* <div className="flex items-start">
                <div className="w-[40px] h-[40px] bg-[#FED500] rounded-full flex justify-center items-center text-black/80 font-bold">
                  {item.phone.toString()[2]}
                </div>
              </div> */}
                {/* Message, Time & UserName  */}
                <div className="relative">
                  {/* <div className="absolute -top-[10px] -right-[10px] z-10 glassed w-[30px] h-[30px] rounded-full flex justify-center items-center">
                  <UserCircleIcon className="w-6 text-white/50" />
                </div> */}
                  {/* ----- */}
                  <div className="glassed min-w-[200px] rounded-tl-none rounded-2xl  p-[10px] px-[15px]">
                    <h4 className="text-sm font-semibold text-white/90 ">
                      {item?.text?.body}
                    </h4>
                    <div className="flex justify-start mt-[20px] text-white/40 gap-[2px] items-center ">
                      {item?.status && getStatusText(item?.status)}
                      <ClockIcon className="w-[12px] h-[12px] " />
                      <p className="text-xs">
                        {timeConverter(item?.timestamp)}
                      </p>
                    </div>
                  </div>
                  {/* ---userName */}
                  <h4 className=" text-white/70 text-[10px] text-opacity-50 font-semibold">
                    +{item?.phone}
                  </h4>
                </div>
              </div>
            </div>
          );
        } else {
          //! <-- ------------------TEXT MESSAGE--send by dashboard-------------- -->
          return (
            <div className="flex justify-end mb-[20px]">
              <div className="flex gap-4">
                {/* Message, Time & UserName  */}
                <div className="relative">
                  {/* <div className="absolute -top-[10px] -left-[10px] z-10 glassed w-[30px] h-[30px] rounded-full flex justify-center items-center">
                  <SupportIcon className="w-6 text-white/50" />
                </div> */}
                  {/* ----- */}
                  <div className="glassed min-w-[200px] rounded-tr-none rounded-2xl   p-[10px] px-[15px]">
                    <h4 className="text-sm font-semibold text-white text-opacity-80">
                      {item?.text?.body}
                    </h4>
                    <div className="flex justify-start mt-[20px] text-white/40 gap-[2px] items-center ">
                      {item?.status && getStatusText(item?.status)}
                      <ClockIcon className="w-[12px] h-[12px] " />
                      <p className="text-xs">
                        {timeConverter(item?.timestamp)}
                      </p>
                    </div>
                  </div>
                  {/* ---userName */}
                  <h4 className="flex justify-end text-white/70 text-[10px] text-opacity-50 font-semibold">
                    +918949674316
                    {/* {item?.phone} */}
                  </h4>
                </div>
                {/* Avatar */}
                <div className="flex items-start">
                  {/* <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                  {item?.phone && item?.phone.toString()[2]}
                  <SupportIcon className="w-6 text-white/50" />
                </div> */}
                </div>
              </div>
            </div>
          );
        }
        //  ! <-- ---------------If the template is send by USER ------------------- -->
      } else if (item?.type === "template") {
        if (!item.fromMe) {
          return (
            <div className={classnames("flex justify-start mb-[20px]")}>
              <div className="flex gap-4 ">
                {/* Avatar */}
                <div className="flex items-end">
                  <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                    {item?.phone && item?.phone.toString()[0]}
                  </div>
                </div>
                {/* Message, Time & UserName  */}
                <div>
                  {/* ----- */}
                  <div className="bg-appPurple-300 min-w-[150px] rounded-lg  p-[10px] custom-design-chat-container">
                    <h4 className="text-sm font-semibold text-white text-opacity-80">
                      Template
                    </h4>
                    <div
                      className={"p-2 bg-appGray-400 rounded flex items-center"}
                    >
                      <div
                        className={
                          "bg-appPurple-500 mr-[10px] rounded w-[40px] h-[40px] flex justify-center items-center"
                        }
                      >
                        <DocumentTextIcon
                          className={"text-appPurple-400 w-[25px] h-[25px]"}
                        />
                      </div>
                      <p className="text-sm text-white font-regular text-opacity-80">
                        {item?.text?.name}
                      </p>
                    </div>
                    <div className="flex justify-end mt-[5px] text-white text-opacity-50 gap-[2px] items-center ">
                      {/*<ClockIcon className="w-[12px] h-[12px] mt-[2px]" />*/}
                      {item?.status && getStatusText(item?.status)}
                      <p className="text-xs">
                        {timeConverter(item?.timestamp)}
                      </p>
                    </div>
                    <span className="custom-triangle"></span>
                  </div>
                  {/* ---userName */}
                  <h4 className="flex justify-end text-white/70 text-[10px] text-opacity-50 font-semibold">
                    {item?.phone}
                  </h4>
                </div>
              </div>
            </div>
          );
          //  ! <-- ---------------If the __TEMPLATE__ is send by DASHBOARD ------------------- -->
        } else {
          return (
            <div className="flex justify-end mb-[20px]">
              <div className="flex gap-4">
                {/* Message, Time & UserName  */}
                <div className="">
                  {/* ----- */}
                  <div className="relative glassed min-w-[250px] rounded-tr-none rounded-2xl   p-[15px] pt-[25px]">
                    <div className="absolute -top-[20px] -right-[10px] glassed rounded-md px-3 py-1 border border-white/10">
                      <h4 className="text-sm font-bold text-center uppercase text-white/70">
                        Template
                      </h4>
                    </div>
                    <div
                      className={"p-2 bg-appGray-400 rounded flex items-center"}
                    >
                      <div
                        className={
                          "bg-appPurple-500 mr-[10px] rounded w-[40px] h-[40px] flex justify-center items-center"
                        }
                      >
                        <DocumentTextIcon
                          className={"text-appPurple-400 w-[25px] h-[25px]"}
                        />
                      </div>
                      <p className="text-sm text-white font-regular text-opacity-80">
                        {item?.text?.name}
                      </p>
                    </div>
                    <div className="flex justify-start mt-[30px] text-white/50 gap-[2px] items-center ">
                      {item?.status && getStatusText(item?.status)}
                      <ClockIcon className="w-[12px] h-[12px]" />
                      <p className="text-xs">
                        {timeConverter(item?.timestamp)}
                      </p>
                    </div>
                  </div>
                  {/* ---userName */}
                  <h4 className="flex justify-end text-white/70 text-[10px] text-opacity-50 font-semibold">
                    +918949674316
                  </h4>
                </div>
                {/* Avatar */}
                {/* <div className="flex items-start">
                <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                  {item?.phone && item?.phone.toString()[0]}
                </div>
              </div> */}
              </div>
            </div>
          );
        }
        // ! <-- -------------------if the __IMAGE__ send by __USER__------------- -->
      } else if (item?.type === "image") {
        // console.log("imges::", item);
        if (!item.fromMe) {
          return (
            <div className={classnames("flex justify-start mb-[20px]")}>
              <div className="flex gap-4 ">
                {/* Avatar */}
                {/* <div className="flex items-end">
                <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                  {item?.phone && item?.phone.toString()[0]}
                </div>
              </div> */}
                {/* Message, Time & UserName  */}
                <div>
                  {/* ----- */}
                  <div className="relative glassed min-w-[250px] rounded-tl-none rounded-2xl   p-[15px] !pt-10">
                    <h4 className="mb-5 text-sm font-semibold text-white text-opacity-80">
                      {removeUnderscoreAndCapitalize(item?.filename)}
                    </h4>
                    <img src={item?.url} alt="Notbot" className="!w-[200px]" />
                    {/* download image */}
                    <div className="absolute -top-[10px] -right-[20px] z-50">
                      <button
                        type="button"
                        onClick={() => saveAs(item?.url)}
                        className="rounded-lg bg-[#FED500] text-black/80 font-semibold p-2 text-xs"
                      >
                        <DownloadIcon className="w-5 text-black/80" />
                      </button>
                    </div>
                    <div className="flex justify-start mt-[30px] text-white/50 gap-[2px] items-center  ">
                      {item?.status && getStatusText(item?.status)}
                      <ClockIcon className="w-[12px] h-[12px] mt-[2px]" />
                      <p className="text-xs">
                        {timeConverter(item?.timestamp)}
                      </p>
                    </div>
                  </div>
                  {/* ---userName */}
                  <h4 className="flex justify-end text-white/70 text-[10px] text-opacity-50 font-semibold">
                    +{item?.phone}
                  </h4>
                </div>
              </div>
            </div>
          );
          // ! <-- -------------------if the __IMAGE__ send by __DASHBOARD__------------- -->
        } else {
          // console.log(item?.image.slice(0, -4))
          return (
            <div className="flex justify-end mb-[20px]">
              <div className="flex gap-4">
                {/* Message, Time & UserName  */}
                <div className="">
                  {/* ----- */}
                  <div className="relative glassed min-w-[250px] rounded-tr-none rounded-2xl !pt-10  p-[15px] ">
                    <h4 className="mb-5 text-sm font-semibold text-white/80">
                      {removeUnderscoreAndCapitalize(item?.filename)}
                    </h4>
                    <img src={item?.url} alt="Notbot" className="!w-[200px]" />
                    {/* download image */}
                    <div className="absolute -top-[10px] -left-[20px] z-50">
                      <button
                        type="button"
                        onClick={() => saveAs(item?.url)}
                        className="rounded-lg bg-[#FED500] text-black/80 font-semibold p-2 text-xs"
                      >
                        <DownloadIcon className="w-5 text-black/80" />
                      </button>
                    </div>
                    <div className="flex justify-start mt-[30px] text-white/50 gap-[2px] items-center  ">
                      {item?.status && getStatusText(item?.status)}
                      <ClockIcon className="w-[12px] h-[12px] mt-[2px]" />
                      <p className="text-xs">
                        {timeConverter(item?.timestamp)}
                      </p>
                    </div>
                  </div>
                  {/* ---userName */}
                  <h4 className="flex justify-end text-white/70 text-[10px] text-opacity-50 font-semibold">
                    +918949674316
                  </h4>
                </div>
                {/* Avatar */}
                {/* <div className="flex items-end">
                <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                  {item?.phone && item?.phone.toString()[0]}
                </div>
              </div> */}
              </div>
            </div>
          );
        }
        // ! <-- -------------------if the __DOCUMENT__ send by __USER__------------- -->
      } else if (item?.type === "document") {
        if (!item.fromMe) {
          // console.log("Document::::",item);
          return (
            <div
              className={classnames("flex justify-start mt-[20px] mb-[20px]")}
            >
              <div className="flex gap-4 ">
                {/* Avatar */}
                {/* <div className="flex items-end">
                <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                  {item?.phone && item?.phone.toString()[0]}
                </div>
              </div> */}
                {/* Message, Time & UserName  */}
                <div>
                  {/* ----- */}
                  <div className="relative glassed min-w-[250px] rounded-tl-none rounded-2xl   p-[15px] !pt-10">
                    <div className="absolute -top-[20px] -left-[10px] glassed rounded-md px-3 py-1 border border-white/10">
                      <h4 className="text-sm font-bold text-center uppercase text-white/70">
                        Document
                      </h4>
                    </div>
                    <div
                      className={
                        "p-2 gap-2 rounded  bg-appPurple-200 flex items-center"
                      }
                    >
                      <DocumentTextIcon
                        className={"text-appPurple-400 w-[25px] h-[25px]"}
                      />
                      <p className="text-sm text-white/80">
                        {item?.document?.filename}
                      </p>
                    </div>
                    {/* Download Docs */}
                    <div className="absolute -top-[10px] -right-[20px] z-50">
                      <button
                        type="button"
                        onClick={() => saveAs(item?.url)}
                        className="rounded-lg bg-[#FED500] text-black/80 font-semibold p-2 text-xs"
                      >
                        <DownloadIcon className="w-5 text-black/80" />
                      </button>
                    </div>
                    <div className="flex justify-start mt-[30px] text-white/50 gap-[2px] items-center  ">
                      {item?.status && getStatusText(item?.status)}
                      <ClockIcon className="w-[12px] h-[12px] " />
                      <p className="text-xs">
                        {timeConverter(item?.timestamp)}
                      </p>
                    </div>
                  </div>
                  {/* ---userName */}
                  <h4 className="flex justify-start text-white/70 text-[10px] text-opacity-50 font-semibold">
                    +{item?.phone}
                  </h4>
                </div>
              </div>
            </div>
          );
          // ! <-- -------------------if the __DOCUMENT__ send by __DASHBOARD__------------- -->
        } else {
          // console.log("Document::::",item);

          return (
            <div className="flex justify-end mb-[20px] ">
              <div className="flex gap-4">
                {/* Message, Time & UserName  */}
                <div className="">
                  {/* ----- */}
                  <div className="relative glassed min-w-[250px] rounded-tr-none rounded-2xl   p-[15px] pt-[25px]">
                    <div className="absolute -top-[20px] -right-[10px] glassed rounded-md px-3 py-1 border border-white/10">
                      <h4 className="text-sm font-bold text-center uppercase text-white/70">
                        Document
                      </h4>
                    </div>
                    <div
                      className={
                        "p-2 bg-appGray-400 rounded flex items-center mt-5"
                      }
                    >
                      <div
                        className={
                          "bg-appPurple-500 mr-[10px] rounded w-[40px] h-[40px] flex justify-center items-center"
                        }
                      >
                        <DocumentTextIcon
                          className={"text-appPurple-400 w-[25px] h-[25px]"}
                        />
                      </div>
                      <p className="text-sm text-white font-regular text-opacity-80">
                        {item?.filename}
                      </p>
                    </div>
                    {/* Download Docs */}
                    <div className="absolute -top-[10px] -left-[20px] z-50">
                      <button
                        type="button"
                        onClick={() => saveAs(item?.url)}
                        className="rounded-lg bg-[#FED500] text-black/80 font-semibold p-2 text-xs"
                      >
                        <DownloadIcon className="w-5 text-black/80" />
                      </button>
                    </div>
                    <div className="flex justify-start mt-[30px] text-white/50 gap-[2px] items-center ">
                      {item?.status && getStatusText(item?.status)}
                      <ClockIcon className="w-[12px] h-[12px] " />
                      <p className="text-xs">
                        {timeConverter(item?.timestamp)}
                      </p>
                    </div>
                  </div>
                  {/* ---userName */}
                  <h4 className="flex justify-end text-white/70 text-[10px] text-opacity-50 font-semibold">
                    +918949674316
                  </h4>
                </div>
                {/* Avatar */}
                {/* <div className="flex items-end">
                <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                  {item.phone.toString()[2]}
                </div>
              </div> */}
              </div>
            </div>
          );
        }
        // !<-----------------------Video Send By USER---------------------->
      } else if (item?.type === "video") {
        if (!item.fromMe) {
          // console.log("video::::",item);
          return (
            <div
              className={classnames("flex justify-start mt-[20px] mb-[20px]")}
            >
              <div className="flex gap-4 ">
                {/* Avatar */}
                {/* <div className="flex items-end">
                <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                  {item?.phone && item?.phone.toString()[0]}
                </div>
              </div> */}
                {/* Message, Time & UserName  */}
                <div>
                  {/* ----- */}
                  <div className="relative glassed min-w-[250px] rounded-tl-none rounded-2xl   p-[15px] !pt-10">
                    <div className="absolute -top-[20px] -left-[10px] glassed rounded-md px-3 py-1 border border-white/10">
                      <h4 className="text-sm font-bold text-center uppercase text-white/70">
                        Video
                      </h4>
                    </div>
                    <div
                      className={
                        "p-2 gap-2 rounded  bg-appPurple-200 flex items-center"
                      }
                    >
                      <DocumentTextIcon
                        className={"text-appPurple-400 w-[25px] h-[25px]"}
                      />
                      <p className="text-sm text-white/80">{item?.filename}</p>
                    </div>
                    {/* Download Video */}
                    <div className="absolute -top-[10px] -right-[20px] z-50">
                      <button
                        type="button"
                        onClick={() => saveAs(item?.url)}
                        className="rounded-lg bg-[#FED500] text-black/80 font-semibold p-2 text-xs"
                      >
                        <DownloadIcon className="w-5 text-black/80" />
                      </button>
                    </div>
                    <div className="flex justify-start mt-[30px] text-white/50 gap-[2px] items-center  ">
                      {item?.status && getStatusText(item?.status)}
                      <ClockIcon className="w-[12px] h-[12px] " />
                      <p className="text-xs">
                        {timeConverter(item?.timestamp)}
                      </p>
                    </div>
                  </div>
                  {/* ---userName */}
                  <h4 className="flex justify-start text-white/70 text-[10px] text-opacity-50 font-semibold">
                    +{item?.phone}
                  </h4>
                </div>
              </div>
            </div>
          );
          // ! <-- -------------------if the ::VIDEO:: send by __DASHBOARD__------------- -->
        } else {
          // console.log("Video::::",item);

          return (
            <div className="flex justify-end mb-[20px] ">
              <div className="flex gap-4">
                {/* Message, Time & UserName  */}
                <div className="">
                  {/* ----- */}
                  <div className="relative glassed min-w-[250px] rounded-tr-none rounded-2xl   p-[15px] pt-[25px]">
                    <div className="absolute -top-[20px] -right-[10px] glassed rounded-md px-3 py-1 border border-white/10">
                      <h4 className="text-sm font-bold text-center uppercase text-white/70">
                        Video
                      </h4>
                    </div>
                    <div
                      className={
                        "p-2 bg-appGray-400 rounded flex items-center mt-5"
                      }
                    >
                      <div
                        className={
                          "bg-appPurple-500 mr-[10px] rounded w-[40px] h-[40px] flex justify-center items-center"
                        }
                      >
                        <DocumentTextIcon
                          className={"text-appPurple-400 w-[25px] h-[25px]"}
                        />
                      </div>
                      <p className="text-sm text-white font-regular text-opacity-80">
                        {item?.filename}
                      </p>
                    </div>
                    {/* Download Docs */}
                    <div className="absolute -top-[10px] -left-[20px] z-50">
                      <button
                        type="button"
                        onClick={() => saveAs(item?.url)}
                        className="rounded-lg bg-[#FED500] text-black/80 font-semibold p-2 text-xs"
                      >
                        <DownloadIcon className="w-5 text-black/80" />
                      </button>
                    </div>
                    <div className="flex justify-start mt-[30px] text-white/50 gap-[2px] items-center ">
                      {item?.status && getStatusText(item?.status)}
                      <ClockIcon className="w-[12px] h-[12px] " />
                      <p className="text-xs">
                        {timeConverter(item?.timestamp)}
                      </p>
                    </div>
                  </div>
                  {/* ---userName */}
                  <h4 className="flex justify-end text-white/70 text-[10px] text-opacity-50 font-semibold">
                    +918949674316
                  </h4>
                </div>
              </div>
            </div>
          );
        }
      }
    },
    [getStatusText],
  );

  const handleScrollToBottom = (e) => {
    scrollToBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // scroll to bottom
  // useEffect(() => {
  //   scrollToBottomRef.current !== null &&
  //     scrollToBottomRef.current.scrollIntoView({ behavior: "smooth" });
  // }, [onClickItem]);

  const lastDateOfChat = [];
  Object.assign(lastDateOfChat, chatHistory);
  const d = lastDateOfChat.reverse().filter((item) => item?.fromMe !== true);
  const timestamp = d[0]?.timestamp
    ? timeConverter(parseInt(d[0]?.timestamp) + 24 * 3600)
    : null;
  const chatDisabled = timestamp ? new Date(timestamp) < new Date() : false;

  return (
    <div className="grid w-full lg:grid-cols-12">
      <div className="col-span-12 overflow-hidden">
        <div className="grid grid-cols-12">
          <div className="col-span-4 h-screen border-r border-white/10 px-[30px] py-[30px] overflow-hidden">
            <div className="">
              <h2 className="text-white opacity-80 text-[22px] font-semibold">
                Chats
              </h2>

              {/* Search Field */}
              <div className="mt-5 text-gray-600 focus-within:text-gray-400">
                <div className="relative">
                  <SearchIcon className="absolute top-[12px] left-[10px] w-6 h-6 " />
                  <input
                    type="search"
                    id="searchChat"
                    autoComplete="off"
                    name="searchChat"
                    value={querry}
                    onChange={(e) => setQuerry(e.target.value)}
                    placeholder="Search message or users"
                    className="w-full py-3 pl-12 text-base text-white rounded-md text-opacity-80 bg-appGray-300 focus:outline-none focus:text-white caret-[#FED500]"
                  />
                </div>

                {/* Search Result */}
                {querry.length > 0 ? (
                  <div className="flex flex-col gap-2 p-2 mt-4 border rounded glassed border-white/20">
                    {Search(searchData).map((item, index) => {
                      return (
                        <div className="border rounded glassed border-white/20 ">
                          <NewChatListItem
                            name={item?.name}
                            number={item?.number}
                            status={item?.status}
                            time={item?.timestamp}
                            messages={item?.messages}
                            id={item?._id}
                            unseenCount={item?.unseen_count}
                            onClickItem={onClickItem}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* Recent Chat Section */}
            <div className="h-[30px] border-b border-white/10">
              <h4 className="text-white opacity-80 text-[22px] mt-6 font-semibold overflow-auto">
                Recent
              </h4>
            </div>

            <div className="overflow-y-auto custom-scroll scrollbar-thumb-appPurple-200 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded">
              {getChatListItems()}
            </div>
          </div>
          <div className="col-span-8 overflow-hidden">
            {/* render user head */}
            <UserHead
              name={selectedChatName}
              timestamp={timestamp}
              chatDisabled={chatDisabled}
              number={selectedChat}
            />
            <div
              ref={chatListRef}
              className={classnames(
                (chatHistory?.length === 0 || chatHistoryLoading) &&
                  "flex justify-center items-center",
                " chat-custom-scroll overflow-y-auto  scrollbar-thumb-appPurple-200 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded px-[30px] relative",
              )}
            >
              {chatHistoryLoading ? (
                <CircularProgress style={{ width: "100px", height: "100px" }} />
              ) : (
                <div className="my-[30px]">
                  {chatHistory?.length > 0 ? (
                    <>
                      {chatHistory.map((item, i) => {
                        return (
                          <div key={i}>
                            {
                              item?.phone === selectedChat ? (
                                <GetNewMessages item={item} />
                              ) : (
                                ""
                              )
                              // if (item?.phone == selectedChat) {
                              //   return <GetNewMessages item={item} />;
                              // }
                            }
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <h1 className={"text-4xl text-white text-opacity-80 "}>
                      You don't have messages yet
                    </h1>
                  )}
                  {/* Scroll to bottom div  */}
                  <div ref={scrollToBottomRef}></div>
{/* 
                  {chatHistory?.length > 0 ? (
                    <Fab
                      variant="extended"
                      className="!rounded-full !w-[0px] !h-[50px] !p-0 !sticky !bottom-5  !bg-white/20"
                      onClick={handleScrollToBottom}
                    >
                      <ChevronDownIcon className="w-8" />
                    </Fab>
                  ) : (
                    ""
                  )} */}
                </div>
              )}
            </div>
            <ChatInput
              textValue={typedMsg}
              disabled={chatDisabled}
              onSubmit={sendMsg}
              onChangeText={setTypedMsg}
              onFileLoad={onFileLoad}
              onVideoLoad={onVideoLoad}
              onDocLoad={onDocLoad}
              handleScrollToBottom={handleScrollToBottom}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
