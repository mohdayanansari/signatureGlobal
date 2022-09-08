import React, { useState } from "react";
import {
  // Button,
  Input,
  // Row,
  // Col,
  UncontrolledTooltip,
  // ButtonDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // Label,
  Form,
} from "reactstrap";

// import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import {
  PaperAirplaneIcon,
  PhotographIcon,
  FolderAddIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import classnames from "classnames";
import QuickRepliesModal from "./Modals/QuickRepliesModal";

const ChatInput = (props) => {
  const {
    textValue,
    disabled,
    onSubmit,
    onChangeText,
    onFileLoad,
    onDocLoad,
    onVideoLoad,
    handleScrollToBottom
  } = props;

  const [textMessage, settextMessage] = useState("");
  // const [isOpen, setisOpen] = useState(false);
  const [file, setfile] = useState({
    name: "",
    size: "",
  });
  const [fileImage, setfileImage] = useState("");

  // const toggle = () => setisOpen(!isOpen);

  //!function for send data to onaddMessage function(in userChat/index.js component)
  const onAddMessage = (e) => {
    e.preventDefault();
    //if text value is not emptry then call onaddMessage function
    if (textMessage !== "") {
      props.onaddMessage(textMessage, "textMessage");
      settextMessage("");
    }

    //!if file input value is not empty then call onaddMessage function
    if (file.name !== "") {
      props.onaddMessage(file, "fileMessage");
      setfile({
        name: "",
        size: "",
      });
    }

    //!if image input value is not empty then call onaddMessage function
    if (fileImage !== "") {
      props.onaddMessage(fileImage, "imageMessage");
      setfileImage("");
    }
  };

  //!function for text input value change
  const handleChange = (e) => {
    settextMessage(e.target.value);
  };

  //!function for file input change
  const handleFileChange = (e) => {
    if (e.target.files.length !== 0)
      setfile({
        name: e.target.files[0].name,
        size: e.target.files[0].size,
      });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length !== 0)
      setfileImage(URL.createObjectURL(e.target.files[0]));
  };
  //function for add emojis
  // const addEmoji = (e) => {
  //   let emoji = e.native;
  //   settextMessage(textMessage + emoji);
  // };

  // sd
  const getQuickReplyMsg = (message) => {
    onChangeText(message);
  };

  return (
    <div className="grid place-items-center w-full h-[80px] px-[30px] text-white text-opacity-80 font-bold font-[24px]  shadow-xl border-t border-white border-opacity-10">
      <div className="grid items-center w-full">
          <div className="flex w-full gap-2">
            {/* col-1 */}
            <div className="w-[70%] ">
              <Input
              onClick={handleScrollToBottom}
                type="text"
                value={textValue}
                onChange={(e) => onChangeText(e.target.value)}
                className={classnames(
                  disabled && "disabled:cursor-not-allowed",
                  "w-full bg-appGray-300 border-none py-[10px] px-[15px] rounded-lg focus:ring focus:ring--appPurple-300 focus:outline-none",
                )}
                placeholder="Enter Message..."
                disabled={disabled}
              />
            </div>

            {/* col-2 */}
            <div className="w-[30%] flex items-center gap-2 justify-end">
              {/* ------------------------===Quick Replies Modal===------------------------- */}
              <QuickRepliesModal getQuickReplyMsg={getQuickReplyMsg} />

              <div
                className="relative group  flex justify-center items-center w-[40px] h-[40px] p-[5px] "
                id="files"
              >
                <div className=" absolute inset-0 rounded-lg bg-white bg-opacity-80 shadow-2xl backdrop-blur-xl group-hover:bg-opacity-70 transition duration-300"></div>
                <input
                  onChange={onDocLoad}
                  accept="application/msword, application/vnd.ms-excel,text/plain, application/pdf,"
                  className="  relative z-10 opacity-0 h-full w-full cursor-pointer"
                  type="file"
                  disabled={disabled}
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                  <FolderAddIcon className="text-appPurple-400 w-[20px] h-[20px]" />
                  {/* <div class="space-y-6 text-center"></div> */}
                </div>
              </div>

              {/*<UncontrolledTooltip*/}
              {/*  target="files"*/}
              {/*  placement="top"*/}
              {/*  className="text-white text-opacity-80 text-xs mb-1"*/}
              {/*>*/}
              {/*  Attached File*/}
              {/*</UncontrolledTooltip>*/}

              <div
                className="relative group  flex justify-center items-center w-[40px] h-[40px] p-[5px] "
                id="images"
              >
                <div className="absolute inset-0 rounded-lg bg-white bg-opacity-80 shadow-2xl backdrop-blur-xl group-hover:bg-opacity-70 transition duration-300"></div>
                <input
                  onChange={onFileLoad}
                  accept="image/png, image/jpeg ,image/jpg,.jpg, .jpeg .png, .svg, .webp, image"
                  className="relative z-10 opacity-0 h-full w-full cursor-pointer"
                  type="file"
                  disabled={disabled}
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                  <PhotographIcon className="text-appPurple-400 w-[20px] h-[20px] " />
                  {/* <div class="space-y-6 text-center"></div> */}
                </div>
              </div>
              <div
                className="relative group  flex justify-center items-center w-[40px] h-[40px] p-[5px] "
                id="images"
              >
                <div className="absolute inset-0 rounded-lg bg-white bg-opacity-80 shadow-2xl backdrop-blur-xl group-hover:bg-opacity-70 transition duration-300"></div>
                <input
                  onChange={onVideoLoad}
                  accept=".mp4"
                  className="relative z-10 opacity-0 h-full w-full cursor-pointer"
                  type="file"
                  disabled={disabled}
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                  <VideoCameraIcon className="text-appPurple-400 w-[20px] h-[20px] " />
                  {/* <div class="space-y-6 text-center"></div> */}
                </div>
              </div>

              {/*<UncontrolledTooltip*/}
              {/*  target="images"*/}
              {/*  placement="top"*/}
              {/*  className="text-white text-opacity-80 text-xs "*/}
              {/*>*/}
              {/*  Images*/}
              {/*</UncontrolledTooltip>*/}

              <button
                type="submit"
                color="primary"
                disabled={disabled}
                onClick={onSubmit}
                className={classnames(
                  disabled && "disabled:cursor-not-allowed",
                  "bg-appPurple-300 p-[10px] rounded-lg hover:bg-appPurple-400",
                )}
              >
                <PaperAirplaneIcon className="w-[20px]" />
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ChatInput;
