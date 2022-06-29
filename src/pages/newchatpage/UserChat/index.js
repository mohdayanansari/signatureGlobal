import React, { useState, useEffect} from "react";
// import {
//   DropdownMenu,
//   DropdownItem,
//   DropdownToggle,
//   UncontrolledDropdown,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   CardBody,
//   Button,
//   ModalFooter,
// } from "reactstrap";
// import { connect } from "react-redux";
// import SimpleBar from "simplebar-react";
// import { withRouter } from "react-router-dom";

import TypingAnimation from "../../../components/TypingAnimation";

//Import Components
import UserHead from "./UserHead";
// import ImageList from "./ImageList";
import ChatInput from "./ChatInput";
// import FileList from "./FileList";
// import Index from "../../../components/Index";

//actions
// import { openUserSidebar, setFullUser } from "../../../redux/actions";

//Import Images
import avatar4 from "../../../images/av1.png";
import avatar1 from "../../../images/av2.png";
import { ClockIcon } from "@heroicons/react/outline";
import LeftSideBarMenu from "../../../components/LeftSideBarMenu";
import {TabContent, TabPane} from "reactstrap";
import Chats from "../Tabs/Chats";

//i18n
// import { useTranslation } from "react-i18next";

function UserChat(props) {
  // const ref = useRef();

  // const [modal, setModal] = useState(false);

  /* intilize t variable for multi language implementation */
  // const { t } = useTranslation();

  //demo conversation messages
  //userType must be required
  // const [allUsers] = useState(props.recentChatList);
  const [chatMessages, setchatMessages] = useState([]);
  // props.recentChatList[props.recentChatList.active_user].messages
  const activeUser = props.recentChatList.active_user;

  useEffect(() => {
    // console.log("😅😅", props.recentChatList);
    setchatMessages(props.recentChatList.users[activeUser].messages);
    // ref.current.recalculate();
    // if (ref.current.el) {
    //   ref.current.getScrollElement().scrollTop =
    //     ref.current.getScrollElement().scrollHeight;
    // }
  }, [activeUser, props.recentChatList]);

  // const toggle = () => setModal(!modal);

  // const addMessage = (message, type) => {
  //   var messageObj = null;

  //   let d = new Date();
  //   var n = d.getSeconds();

  //matches the message type is text, file or image, and create object according to it
  // switch (type) {
  //   case "textMessage":
  //     messageObj = {
  //       id: chatMessages.length + 1,
  //       message: message,
  //       time: "00:" + n,
  //       userType: "sender",
  //       image: avatar4,
  //       isFileMessage: false,
  //       isImageMessage: false,
  //     };
  //     break;

  //   case "fileMessage":
  //     messageObj = {
  //       id: chatMessages.length + 1,
  //       message: "file",
  //       fileMessage: message.name,
  //       size: message.size,
  //       time: "00:" + n,
  //       userType: "sender",
  //       image: avatar4,
  //       isFileMessage: true,
  //       isImageMessage: false,
  //     };
  //     break;

  //   case "imageMessage":
  //     var imageMessage = [{ image: message }];

  //     messageObj = {
  //       id: chatMessages.length + 1,
  //       message: "image",
  //       imageMessage: imageMessage,
  //       size: message.size,
  //       time: "00:" + n,
  //       userType: "sender",
  //       image: avatar4,
  //       isImageMessage: true,
  //       isFileMessage: false,
  //     };
  //     break;

  //   default:
  //     break;
  // }

  //add message object to chat
  //   setchatMessages([...chatMessages, messageObj]);

  //   let copyallUsers = [...allUsers];
  //   copyallUsers[props.active_user].messages = [...chatMessages, messageObj];
  //   copyallUsers[props.active_user].isTyping = false;
  //   props.setFullUser(copyallUsers);

  //   scrolltoBottom();
  // };

  // function scrolltoBottom() {
  //   if (ref.current.el) {
  //     ref.current.getScrollElement().scrollTop =
  //       ref.current.getScrollElement().scrollHeight;
  //   }
  // }

  // const deleteMessage = (id) => {
  //   let conversation = chatMessages;

  //   var filtered = conversation.filter(function (item) {
  //     return item.id !== id;
  //   });

  //   setchatMessages(filtered);
  // };

  console.log("👋👋👋", chatMessages);
  const activeTab = props.activeTab;

  return (
    <>
      <div className="col-span-12 overflow-hidden">
        <div className="grid grid-cols-12">
        {/* Chat Left Side Bar Container */}
          <div className="col-span-4 h-screen bg-appGray-500  px-[30px] py-[30px] overflow-hidden">
          <TabContent activeTab={activeTab}>
            {/* Profile Tab-Pane Open  */}
            {/* <TabPane tabId="profile" id="pills-user">
              <Profile />
          </TabPane> */}
            {/* Profile Tab-Pane Close */}
            {/* Chat Tab Pane Open */}
            <TabPane tabId="chat" id="pills-chat">
              <Chats
                  recentChatList={props.recentChatList}
                  users={props.recentChatList}
              />
            </TabPane>
            {/* Chat Tab Pane Close */}
          </TabContent>
        </div>
          <div className="col-span-8 overflow-hidden">
            {/* render user head */}
            <UserHead activeUser={props.recentChatList.users[activeUser]} />

            <div className="chat-custom-scroll bg-appGray-700 overflow-y-auto scrollbar scrollbar-thumb-appPurple-200 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded px-[30px]">
              {chatMessages.map((chat, key, index) => (
                  <div key={key} className="my-[20px]">
                    {chat.isToday === true ? (
                        <div className="flex relative justify-center items-center border-b border-appGray-200">
                          <div className="bg-appGray-200 rounded-lg px-4 py-1 flex justify-center items-center text-sm text-white text-opacity-50 top-[14px] relative ">
                            Today
                          </div>
                        </div>
                    ) : (
                        <>
                          {chat?.isTyping === true ? (
                              <div className="flex pl-[55px] text-white text-opacity-80 text-sm font-semibold">
                                <div className="flex bg-appPurple-300 min-w-max rounded-lg  p-[10px]">
                                  <h4>Typing</h4>
                                  <TypingAnimation />
                                </div>
                              </div>
                          ) : (
                              <>
                                {/* Chats Container */}
                                <div className="">
                                  {chat.userType === "receiver" ? (
                                      // !Right Container ==Sender
                                      <div className="flex justify-start mb-[20px]">
                                        <div className="flex gap-4 ">
                                          {/* Avatar */}
                                          <div className="flex items-end">
                                            <img
                                                src={avatar4}
                                                alt={chat.userName}
                                                className="w-[40px] rounded-full"
                                            />
                                          </div>
                                          {/* Message, Time & UserName  */}
                                          <div>
                                            {/* ----- */}
                                            <div className="bg-appPurple-300 min-w-[150px] rounded-lg  p-[10px] custom-design-chat-container">
                                              <h4 className="text-white text-opacity-80 font-semibold text-sm">
                                                {chat.message}
                                              </h4>
                                              <div className="flex justify-end mt-[5px] text-white text-opacity-50 gap-[2px] items-center ">
                                                <ClockIcon className="w-[12px] h-[12px] mt-[2px]" />
                                                <p className="text-xs">{chat.time}</p>
                                              </div>
                                              <span className="custom-triangle"></span>
                                            </div>
                                            {/* ---userName */}
                                            <h4 className="mt-[15px] text-white text-sm text-opacity-50 font-semibold">
                                              {chat.userName}
                                            </h4>
                                          </div>
                                        </div>
                                      </div>
                                  ) : (
                                      // !Right Container ==Receiver
                                      <div className="flex justify-end mb-[20px]">
                                        <div className="flex gap-4">
                                          {/* Message, Time & UserName  */}
                                          <div className="">
                                            {/* ----- */}
                                            <div className="bg-appGray-300 min-w-[150px] rounded-lg  p-[10px] custom-design-chat-right-container">
                                              <h4 className="text-white text-opacity-80 font-semibold text-sm">
                                                {chat.message}
                                              </h4>
                                              <div className="flex justify-start mt-[5px] text-white text-opacity-50 gap-[2px] items-center ">
                                                <ClockIcon className="w-[12px] h-[12px] mt-[2px]" />
                                                <p className="text-xs">{chat.time}</p>
                                              </div>
                                              <span className="custom-triangle-right"></span>
                                            </div>
                                            {/* ---userName */}
                                            <h4 className="flex justify-end mt-[15px] text-white text-sm text-opacity-50 font-semibold">
                                              {chat.userName}
                                            </h4>
                                          </div>
                                          {/* Avatar */}
                                          <div className="flex items-end">
                                            <img
                                                src={avatar1}
                                                alt={chat.userName}
                                                className="w-[40px] rounded-full"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                  )}
                                </div>
                              </>
                          )}
                        </>
                    )}
                  </div>
              ))}
            </div>
            <ChatInput />
            {/* onaddMessage={addMessage}  */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserChat;
