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
  MuiThemeProvider,
  IconButton,
  CircularProgress,
  Chip,
  ListItemSecondaryAction,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTheme } from "@material-ui/styles";
import SendIcon from "@material-ui/icons/Send";
import {
  CloudUpload,
  Description,
  Face,
  InsertPhoto,
  Send,
  AttachFile,
  Image,
} from "@material-ui/icons";
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
import { getContacts, getSelectedChatHistory } from "../../store/reducer/chat";
import classnames from "classnames";
import Av1 from "../../images/av1.png";
import DocIcon from "../../images/docs.png";
import Chats from "../newchatpage/Tabs/Chats";
import { ClockIcon, SearchIcon } from "@heroicons/react/outline";
import { DocumentTextIcon } from "@heroicons/react/solid";
import TypingAnimation from "../../components/TypingAnimation";
import UserHead from "../newchatpage/UserChat/UserHead";
import avatar4 from "../../images/av1.png";
import avatar1 from "../../images/av2.png";
import ChatInput from "../newchatpage/UserChat/ChatInput";

export default function Chat(props) {
  var classes = useStyles();
  var theme = useTheme();
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

  let intRef = useRef();
  let conRef = useRef();

  const [chatWindowScroll, setChatWindowScroll] = useState(false);

  useEffect(() => {
    setChatWindowScroll(true);
  }, [selectedChat]);
  useEffect(() => {
    let divHeight = chatListRef.current?.scrollHeight;

    if (divHeight != undefined) {
      if (chatListRef.current.scrollTop == 0 && chatWindowScroll) {
        chatListRef.current.scrollTop = divHeight;
        console.log(chatListRef.current);

        setChatWindowScroll(false);
      }
    }
    clearTimeout(intRef);
    if (selectedChat != null) {
      intRef = setTimeout(
        () => dispatch(getBackgroundChatHistory(selectedChat)),
        2000,
      );
    }
  }, [chatHistory]);
  const newobj = [
    {
      _id: 918890293146,
      messages: [
        {
          _id: "gBEGkYiQKTFGAgm0cp5Vo7ePPCA",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgkLbF2Yr4o2ZYA",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgmOncEatsiZYtU",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgkO7r52Ng8Tiww",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgkNA7XG0n6daVc",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgm3hC0Tf7XuNWA",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgkMXLeBrjenRrY",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgk_-ACtdAZTtJs",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgkBDilqfUS9ej0",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgkI0WBqvahtSXQ",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgllOIy1ea7le3Q",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgkcuMrG018vGtA",
          fromMe: true,
        },
        {
          _id: "ABEGkYiQKTFGAhAFYNhocgCBPTqrhPyY7UXg",
          fromMe: false,
        },
        {
          _id: "ABEGkYiQKTFGAhDVEHdC14RvGDkP0ow8dqZ6",
          fromMe: false,
        },
        {
          _id: "ABEGkYiQKTFGAhDynvsS4pVioELDYWtXuxLM",
          fromMe: false,
        },
        {
          _id: "gBEGkYiQKTFGAgkI_sptqQmM-BQ",
          brodcast_name: "none",
          fromMe: true,
        },
        {
          _id: "ABEGkYiQKTFGAgo-sJnxWwnPtk43",
          fromMe: false,
        },
        {
          _id: "gBEGkYiQKTFGAgmMFcHE8KuCj_I",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgmKLODm2sDw55E",
          brodcast_name: "",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgmjGMHZPBPGHIE",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgmIOUy66BIWxmQ",
          brodcast_name: "",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgnsHfCNgelBB1c",
          brodcast_name: "seq1",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgkQSK5amopMROQ",
          brodcast_name: "seq1",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAglSGQRv9cw6mQQ",
          brodcast_name: "seq1",
          fromMe: true,
        },
        {
          _id: "ABEGkYiQKTFGAhD9SO0K4_z76jIASBgpHLwF",
          fromMe: false,
        },
        {
          _id: "gBEGkYiQKTFGAgmrPa_jf0hRKuk",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgngU-dwfazHHkg",
          brodcast_name: "none",
          fromMe: true,
        },
        {
          _id: "gBEGkYiQKTFGAgl43VdnZt03MGo",
          fromMe: true,
        },
      ],
      name: "Aayush",
      number: 918890293146,
      status: "In Progress",
      timestamp: 1647364415,
      unseen: 0,
      unseen_count: 2,
      username: "foo@foo.foo",
    },
  ];
  useEffect(() => {
    let number = contacts[0]?.number;
    let name = contacts[0]?.name;
    setSelectedChat(number);
    setSelectedChatName(name);
    dispatch(getBackgroundChatHistory(number));
  }, []);

  useEffect(() => {
    dispatch(getContacts());
    conRef = setInterval(() => {
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
          onClick={() => onClickItem(id, name)}
        >
          {/* User Image Container */}
          <div>
            <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
              {name.toUpperCase()[0]}
            </div>
          </div>
          {/* User Image Container ENDS-- */}
          <div className="mt-[-5px] pl-4 w-full text-white text-opacity-80">
            <div className="flex justify-between pr-[10px]">
              <h1 className="font-bold ">{name}</h1>
              <div className="">
                <p className="text-xs ">{timeConverter(time)}</p>
              </div>
            </div>
            <div className="flex w-full justify-between pr-[10px]">
              <p className=" text-sm">{number}</p>
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
  const onClickItem = (item, name) => {
    if (item !== null) {
      clearInterval(intRef);
      setSelectedChat(item);
      setSelectedChatName(name);
      dispatch(getSelectedChatHistory(item));
    }
  };

  const onFileLoad = ({ target }) => {
    let file = target.files[0];
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
    if (e.keyCode == 13 || e.keyCode == undefined) {
      if (typedMsg != null && selectedChat != null) {
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
    }
  };

  const getChatListItems = () => {
    let listItems = contacts.map((item) => (
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
    ));
    return listItems;
  };

  const getStatusText = (param) => {
    if (param == "read") {
      return (
        <Typography
          variant={"caption"}
          color={"primary"}
          className={classes.read}
          style={{ marginRight: "10px" }}
        >
          {capitalize(param)}
        </Typography>
      );
    } else if (param == "failed") {
      return (
        <Typography
          variant={"caption"}
          color={"secondary"}
          className={classes.failed}
          style={{ marginRight: "10px" }}
        >
          {capitalize(param)}
        </Typography>
      );
    } else {
      return (
        <Typography
          variant={"caption"}
          color={"secondary"}
          style={{ marginRight: "10px", color: "#797979" }}
        >
          {capitalize(param)}
        </Typography>
      );
    }
  };

  const GetMessages = ({ classes, item }) => {
    if (item?.type == "template") {
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
    } else if (item?.type == "text") {
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
    } else if (item?.type == "image") {
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
            <img src={item?.image} style={{ width: "200px" }} />
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
    } else if (item?.type == "document") {
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
            <a href={item?.document.toString()} target={"_blank"}>
              <img src={DocIcon} style={{ width: "200px" }} />
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

  const GetNewMessages = ({ item }) => {
    if (item?.type == "text") {
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
                  <h4 className="text-white text-opacity-80 font-semibold text-sm">
                    {item?.text?.body}
                  </h4>
                  <div className="flex justify-end mt-[5px] text-white text-opacity-50 gap-[2px] items-center ">
                    {/*<ClockIcon className="w-[12px] h-[12px] mt-[2px]" />*/}
                    {item?.status && getStatusText(item?.status)}
                    <p className="text-xs">{timeConverter(item?.timestamp)}</p>
                  </div>
                  <span className="custom-triangle"></span>
                </div>
                {/* ---userName */}
                <h4 className="mt-[15px] text-white text-sm text-opacity-50 font-semibold">
                  {item?.phone}
                </h4>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex justify-end mb-[20px]">
            <div className="flex gap-4">
              {/* Message, Time & UserName  */}
              <div className="">
                {/* ----- */}
                <div className="bg-appGray-300 min-w-[150px] rounded-lg  p-[10px] custom-design-chat-right-container">
                  <h4 className="text-white text-opacity-80 font-semibold text-sm">
                    {item?.text?.body}
                  </h4>
                  <div className="flex justify-start my-[5px] text-white text-opacity-50 gap-[2px] items-center ">
                    {/*<ClockIcon className="w-[12px] h-[12px] mt-[2px]" />*/}
                    {item?.status && getStatusText(item?.status)}
                    <p className="text-xs">{timeConverter(item?.timestamp)}</p>
                  </div>
                  <span className="custom-triangle-right"></span>
                </div>
                {/* ---userName */}
                <h4 className="flex justify-end mt-[15px] text-white text-sm text-opacity-50 font-semibold">
                  {item?.phone}
                </h4>
              </div>
              {/* Avatar */}
              <div className="flex items-end">
                <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                  {item?.phone && item?.phone.toString()[0]}
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else if (item?.type == "template") {
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
                  <h4 className="text-white text-opacity-80 font-semibold text-sm">
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
                    <p className="text-xs">{timeConverter(item?.timestamp)}</p>
                  </div>
                  <span className="custom-triangle"></span>
                </div>
                {/* ---userName */}
                <h4 className="mt-[15px] text-white text-sm text-opacity-50 font-semibold">
                  {item?.phone}
                </h4>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex justify-end mb-[20px]">
            <div className="flex gap-4">
              {/* Message, Time & UserName  */}
              <div className="">
                {/* ----- */}
                <div className="bg-appGray-300 min-w-[150px] rounded-lg  p-[10px] custom-design-chat-right-container">
                  <h4 className="text-white mb-[2px] text-opacity-80 font-regular text-right text-sm">
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
                  <div className="flex justify-start my-[5px] text-white text-opacity-50 gap-[2px] items-center ">
                    {/*<ClockIcon className="w-[12px] h-[12px] mt-[2px]"/>*/}
                    {item?.status && getStatusText(item?.status)}
                    <p className="text-xs">{timeConverter(item?.timestamp)}</p>
                  </div>
                  <span className="custom-triangle-right"></span>
                </div>
                {/* ---userName */}
                <h4 className="flex justify-end mt-[15px] text-white text-sm text-opacity-50 font-semibold">
                  {item?.phone}
                </h4>
              </div>
              {/* Avatar */}
              <div className="flex items-end">
                <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                  {item?.phone && item?.phone.toString()[0]}
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else if (item?.type == "image") {
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
                  <h4 className="text-white text-opacity-80 font-semibold text-sm">
                    {removeUnderscoreAndCapitalize(item?.filename)}
                  </h4>
                  <img src={item?.image} />
                  <div className="flex justify-end mt-[5px] text-white text-opacity-50 gap-[2px] items-center ">
                    {/*<ClockIcon className="w-[12px] h-[12px] mt-[2px]" />*/}
                    {item?.status && getStatusText(item?.status)}
                    <p className="text-xs">{timeConverter(item?.timestamp)}</p>
                  </div>
                  <span className="custom-triangle"></span>
                </div>
                {/* ---userName */}
                <h4 className="mt-[15px] text-white text-sm text-opacity-50 font-semibold">
                  {item?.phone}
                </h4>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex justify-end mb-[20px]">
            <div className="flex gap-4">
              {/* Message, Time & UserName  */}
              <div className="">
                {/* ----- */}
                <div className="bg-appGray-300 min-w-[150px] rounded-lg  p-[10px] custom-design-chat-right-container">
                  <h4 className="text-white text-opacity-80 font-semibold text-sm">
                    {removeUnderscoreAndCapitalize(item?.filename)}
                  </h4>
                  <img src={item?.image} />
                  <div className="flex justify-start my-[5px] text-white text-opacity-50 gap-[2px] items-center ">
                    {/*<ClockIcon className="w-[12px] h-[12px] mt-[2px]" />*/}
                    {item?.status && getStatusText(item?.status)}
                    <p className="text-xs">{timeConverter(item?.timestamp)}</p>
                  </div>
                  <span className="custom-triangle-right"></span>
                </div>
                {/* ---userName */}
                <h4 className="flex justify-end mt-[15px] text-white text-sm text-opacity-50 font-semibold">
                  {item?.phone}
                </h4>
              </div>
              {/* Avatar */}
              <div className="flex items-end">
                <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                  {item?.phone && item?.phone.toString()[0]}
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else if (item?.type == "document") {
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
                  <h4 className="text-white text-opacity-80 font-semibold text-sm">
                    Document
                  </h4>
                  <div className={"p-10 bg-appPurple-200"}>
                    <p className="text-sm">{item?.filename}</p>
                  </div>
                  <div className="flex justify-end mt-[5px] text-white text-opacity-50 gap-[2px] items-center ">
                    {/*<ClockIcon className="w-[12px] h-[12px] mt-[2px]" />*/}
                    {item?.status && getStatusText(item?.status)}
                    <p className="text-xs">{timeConverter(item?.timestamp)}</p>
                  </div>
                  <span className="custom-triangle"></span>
                </div>
                {/* ---userName */}
                <h4 className="mt-[15px] text-white text-sm text-opacity-50 font-semibold">
                  {item?.phone}
                </h4>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex justify-end mb-[20px]">
            <div className="flex gap-4">
              {/* Message, Time & UserName  */}
              <div className="">
                {/* ----- */}
                <div className="bg-appGray-300 min-w-[150px] rounded-lg  p-[10px] custom-design-chat-right-container">
                  <h4 className="text-white mb-[2px] text-opacity-80 font-regular text-right text-sm">
                    Document
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
                      {item?.filename}
                    </p>
                  </div>
                  <div className="flex justify-start mt-[5px] text-white text-opacity-50 gap-[2px] items-center ">
                    {/*<ClockIcon className="w-[12px] h-[12px] mt-[2px]" />*/}
                    {item?.status && getStatusText(item?.status)}
                    <p className="text-xs">{timeConverter(item?.timestamp)}</p>
                  </div>
                  <span className="custom-triangle-right"></span>
                </div>
                {/* ---userName */}
                <h4 className="flex justify-end mt-[15px] text-white text-sm text-opacity-50 font-semibold">
                  {item?.phone}
                </h4>
              </div>
              {/* Avatar */}
              <div className="flex items-end">
                <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                  {item?.phone && item?.phone.toString()[0]}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  const lastDateOfChat = [];
  Object.assign(lastDateOfChat, chatHistory);
  const d = lastDateOfChat.reverse().filter((item) => item?.fromMe != true);
  const timestamp = d[0]?.timestamp
    ? timeConverter(parseInt(d[0]?.timestamp) + 24 * 3600)
    : null;
  const chatDisabled = timestamp ? new Date(timestamp) < new Date() : false;

  return (
    <div className="grid lg:grid-cols-12 w-full">
      <div className="col-span-12 overflow-hidden">
        <div className="grid grid-cols-12">
          <div className="col-span-4 h-screen bg-appGray-500  px-[30px] py-[30px] overflow-hidden">
            <div className="h-[100px] ">
              <h2 className="text-white opacity-80 text-[22px] font-semibold">
                Chats
              </h2>

              {/* Search Field */}
              <div className="relative text-gray-600 focus-within:text-gray-400 mt-5">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-outline"
                  >
                    <SearchIcon className="w-6 h-6 " />
                  </button>
                </span>
                <input
                  type="search"
                  name="searchChat"
                  placeholder="Search message or users"
                  id=""
                  className="py-3 text-base text-opacity-80 text-white bg-appGray-300 w-full rounded-md pl-12 focus:outline-none
          focus:text-white"
                />
              </div>
            </div>
            {/* Recent Chat Section */}
            <div className="h-[30px]">
              <h4 className="text-white opacity-80 text-[16px] mt-5 font-semibold overflow-auto">
                Recent
              </h4>
            </div>

            <div className="overflow-y-auto custom-scroll scrollbar scrollbar-thumb-appPurple-200 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded">
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
                (chatHistory?.length == 0 || chatHistoryLoading) &&
                  "flex justify-center items-center",
                " chat-custom-scroll bg-appGray-700 overflow-y-auto scrollbar scrollbar-thumb-appPurple-200 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded px-[30px]",
              )}
            >
              {chatHistoryLoading ? (
                <CircularProgress style={{ width: "100px", height: "100px" }} />
              ) : (
                <div className="my-[20px]">
                  {chatHistory?.length > 0 ? (
                    <>
                      {chatHistory.map((item) => {
                        if (item?.phone == selectedChat) {
                          return <GetNewMessages item={item} />;
                        }
                      })}
                    </>
                  ) : (
                    <h1 className={"text-4xl text-white text-opacity-80 "}>
                      You don't have messages yet
                    </h1>
                  )}
                </div>
              )}
            </div>
            <ChatInput
              textValue={typedMsg}
              disabled={chatDisabled}
              onSubmit={sendMsg}
              onChangeText={setTypedMsg}
              onFileLoad={onFileLoad}
              onDocLoad={onDocLoad}
            />
          </div>
        </div>
        {/*<Grid item xs={4}>*/}
        {/*  <Typography variant={"h5"} style={{marginLeft:"10px", fontWeight:"bold"}}>Chats</Typography>*/}
        {/*  <br/>*/}
        {/*  <List style={{height:"64vh" , overflowY:"scroll" , display:"flex",overflowX:"hidden",*/}
        {/*    flexDirection:"column",alignItems:"center"}}>*/}
        {/*    {getChatListItems()}*/}
        {/*  </List>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={8} className={classes.chatWrapperGrid}>*/}
        {/*  <ListItem className={classes.recipientTitle} disableGutters>*/}
        {/*    <ListItemAvatar>*/}
        {/*      <Avatar src={AvatarArray[0]} />*/}
        {/*    </ListItemAvatar>*/}
        {/*    <ListItemText primary={selectedChat ? selectedChat : "Recipient name"}*/}
        {/*    secondary={timestamp && (chatDisabled ? "Your chat is disabled" :`Your chat will be active till ${timestamp}`)}*/}
        {/*    /><br/>*/}
        {/*  </ListItem>*/}
        {/*  <div className={classes.chatList}>*/}
        {/*    <Box flex={1}*/}
        {/*         className={chatHistoryLoading || chatHistory.length ==0 ?*/}
        {/*           classes.beforeLoading : classes.afterLoading}>*/}
        {/*      {chatHistoryLoading*/}
        {/*        ?<CircularProgress style={{width:"100px" , height:"100px"}}/>*/}
        {/*        :*/}
        {/*        <div ref={chatListRef}>*/}
        {/*          {chatHistory.length > 0*/}
        {/*            ? <>*/}
        {/*              {chatHistory.map((item)=>{*/}

        {/*                if(item?.phone == selectedChat){*/}
        {/*                  if(item.fromMe){*/}
        {/*                    return(*/}
        {/*                      <Box className={classes.rightMsg}>*/}
        {/*                        <GetMessages classes={classes} item={item}/>*/}
        {/*                      </Box>*/}
        {/*                    )*/}
        {/*                  }else{*/}
        {/*                    return (*/}
        {/*                      <Box className={classes.leftMsg}>*/}
        {/*                        <GetMessages classes={classes} item={item}/>*/}
        {/*                      </Box>*/}
        {/*                    )*/}
        {/*                  }*/}
        {/*                }*/}
        {/*              })}*/}
        {/*            </>*/}
        {/*            : <Typography size={"xl"}>You don't have messages yet</Typography>*/}
        {/*          }*/}
        {/*        </div>*/}
        {/*      }*/}
        {/*    </Box>*/}
        {/*    <Box display={"flex"} className={classes.inputText}>*/}
        {/*      <TextField*/}
        {/*        fullWidth*/}
        {/*        value={typedMsg}*/}
        {/*        disabled={chatDisabled}*/}
        {/*        placeholder={"Type your message here"}*/}
        {/*        variant={"outlined"}*/}
        {/*        onKeyDown={sendMsg}*/}
        {/*        onChange={(e)=>setTypedMsg(e.target.value)}/>*/}
        {/*      <IconButton disabled={chatDisabled} color={"primary"} onClick={sendMsg}>*/}
        {/*        <Send/>*/}
        {/*      </IconButton>*/}
        {/*      <div>*/}
        {/*        <input*/}
        {/*            accept="image/png, image/jpeg ,.png,.jpg,.jpeg"*/}
        {/*            className={classes.inputFile}*/}
        {/*            id="contained-button-image"*/}
        {/*            onChange={onFileLoad}*/}
        {/*            disabled={chatDisabled}*/}
        {/*            type="file"*/}
        {/*        />*/}
        {/*        <label htmlFor="contained-button-image">*/}
        {/*          <IconButton disabled={chatDisabled} color={"secondary"} component={"span"}>*/}
        {/*            <Image />*/}
        {/*          </IconButton>*/}
        {/*        </label>*/}
        {/*      </div>*/}
        {/*      <div>*/}
        {/*        <input*/}
        {/*            accept="application/pdf"*/}
        {/*            className={classes.inputFile}*/}
        {/*            id="contained-button-file"*/}
        {/*            onChange={onDocLoad}*/}
        {/*            disabled={chatDisabled}*/}
        {/*            type="file"*/}
        {/*        />*/}
        {/*        <label htmlFor="contained-button-file">*/}
        {/*          <IconButton disabled={chatDisabled} color={"secondary"} component={"span"}>*/}
        {/*            <AttachFile />*/}
        {/*          </IconButton>*/}
        {/*        </label>*/}
        {/*      </div>*/}

        {/*    </Box>*/}
        {/*  </div>*/}
        {/*</Grid>*/}
      </div>
    </div>
  );
}
