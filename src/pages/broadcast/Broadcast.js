import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Box,
  TextField,
  InputLabel,
  Divider,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTheme } from "@material-ui/styles";
import SendIcon from "@material-ui/icons/Send";
import { CloudUpload, Description } from "@material-ui/icons";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// styles
import useStyles from "./styles";
import ImageShowCase from "../../images/image-column.PNG";
import AudioShowCase from "../../images/audio.PNG";
import VideoShowCase from "../../images/video-column.PNG";
import PhoneShowCase from "../../images/phone-number.PNG";
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
  fetchVariablesFromTemplates,
  sendVariableTemplates,
  userHistoryData,
} from "../../store/reducer/broadcast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useRouteMatch } from "react-router-dom";
import { timeConverter } from "../../utils/date-parse";
import {
  axiosInstance,
  downloadCSVFileInstance,
} from "../../utils/axios-instance";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  backgroundColor: "rgba(0,0,0,0)",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const FirstStep = ({
  data,
  onChangeBroadcastName,
  onChangeTemplate,
  selectedTemplate,
  broadcastName,
}) => {
  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        id="broadcast-name"
        label="Broadcast Name"
        value={broadcastName}
        type="text"
        variant={"standard"}
        onChange={onChangeBroadcastName}
        size={"medium"}
        className="text-white"
        fullWidth
      />
      <br />
      <br />
      <Autocomplete
        id="combo-box-demo"
        freeSolo
        size={"small"}
        options={data}
        onChange={onChangeTemplate}
        getOptionLabel={(option) =>
          option.name.toString().replaceAll("_", " ") +
          "_".toString().concat(option.language.toString())
        }
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label="Select Template" variant="standard" />
        )}
      />
    </div>
  );
};
const PhoneNumberStep = ({
  data,
  onChangeNumber,
  number,
  onChangeTemplate,
  classes,
  selectedTemplate,
}) => {
  return (
    <div>
      <Typography size={"sm"} className="text-black">
        Enter phone number
      </Typography>
      <PhoneInput
        style={{ marginTop: "5px" }}
        international
        onCountryChange={(countryCode) => {
          console.log(countryCode);
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
      <br />
      <Autocomplete
        id="combo-box-demo"
        options={data}
        size={"small"}
        onChange={onChangeTemplate}
        getOptionLabel={(option) => option.name.toString()}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label="Select Template" variant="outlined" />
        )}
      />
    </div>
  );
};
const SecondStep = (props) => {
  const { classes, onFileLoad, file } = props;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.text} size="xs" gutterBottom>
          Selected document
        </Typography>
        <Box display={"flex"} alignItems={"center"}>
          <Description color={"primary"} />
          <Typography weight="bold" color="primary" className={classes.text}>
            {file?.name ? file?.name : "No Files"}
          </Typography>
        </Box>
        <br />
      </Grid>
      <Grid item xs={6}>
        <div>
          <input
            accept="*"
            className={classes.inputFile}
            id="contained-button-file"
            onChange={onFileLoad}
            disabled={file !== undefined}
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              startIcon={<Description />}
              disabled={file !== undefined}
              className={classes.buttonPrimary}
              color={"primary"}
              component="span"
            >
              Choose Files
            </Button>
          </label>
        </div>
      </Grid>
      <Grid>
        <Button
          variant="contained"
          startIcon={<CloudUpload />}
          className={classes.buttonSecondary}
          disabled={file == undefined}
          color={"secondary"}
          component="span"
        >
          Upload File
        </Button>
      </Grid>
    </Grid>
  );
};
const ThirdStep = (props) => {
  const {
    classes,
    onFileLoad,
    file,
    onUploadCSV,
    variables,
    downloadSampleCSV,
    handleWhentoSend,
    whentoSend,
    dateValue,
    setDateValue,
    timeValue,
    setTimeValue,
  } = props;

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            className={classes.text}
            variant={"subtitle1"}
            gutterBottom
          >
            You have to upload CSV file with extension(.csv).
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Description color={"primary"} />
            <Typography weight="bold" color="primary" className={classes.text}>
              {file?.name ? file?.name : "No Files"}
            </Typography>
          </Box>
          <br />
        </Grid>
        <Grid item xs={6}>
          <div className="">
            <input
              accept=".xslx,.csv,.xls,.png"
              className={classes.inputFile}
              id="contained-button-file"
              onChange={onFileLoad}
              disabled={file !== undefined}
              type="file"
            />

            <div className="flex flex-col  gap-2 w-full ">
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  startIcon={<Description />}
                  disabled={file !== undefined}
                  className={classes.buttonPrimary}
                  color={"primary"}
                  component="span"
                >
                  Choose Files
                </Button>
              </label>
              <div
                onClick={downloadSampleCSV}
                className="hover:cursor-pointer text-xs hover:bg-black/40 hover:text-white hover:p-2 hover:rounded hover:flex hover:justify-center hover:items-center w-[165px] hover:font-bold transition-all transform ease-in-out duration-200"
              >
                Download Sample CSV
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      {/* When to send the broadcast */}
      <div className="mt-8">
        <h1
          id="demo-controlled-radio-buttons-group"
          className="text-black/80 font-bold"
        >
          When to send
        </h1>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={whentoSend}
          onChange={handleWhentoSend}
        >
          <FormControlLabel value="now" control={<Radio />} label="Now" />
          <FormControlLabel value="later" control={<Radio />} label="Later" />
        </RadioGroup>
      </div>
      {whentoSend === "later" && (
        <div className="flex flex-col w-[250px] gap-3 mt-3 mb-10">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={dateValue}
              inputFormat="yyyy-MM-dd"
              mask="____-__-__"
              onChange={(newValue) => setDateValue(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />

            <TimePicker
              label="Select Time"
              value={timeValue}
              ampm={false}
              onChange={(newValue) => setTimeValue(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      )}

      <Accordion>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant={"subtitle2"} color={"secondary"} gutterBottom>
            Please read guidelines carefully below before uploading CSV(.csv)
            file.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Accordion Content */}
          <Grid item xs={12}>
            <ShowCaseTemplate classes={classes} variables={variables} />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const ShowCaseTemplate = (props) => {
  const { classes, variables } = props;

  const showCaseTextItems = variables?.map((item) => {
    if (item?.format.toLowerCase() == "text") {
      let no_of_variable = item?.no_of_variable;
      return (
        <>
          <Typography variant={"subtitle2"}>
            You have <b>{no_of_variable}</b> text variable in below
            template.Make columns according to variable names like if variable
            name is <b>{"{{1}}"}</b> then make a column with name <b>1</b> and
            then put the values in it. Variable name you can see in curly
            braces.
          </Typography>
          <br />
          <Typography className={classes.templateText} variant={"h5"}>
            {item?.text}
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography variant={"subtitle2"}>
            You have a <b>{item?.format.toLowerCase()}</b> variable in this
            template. Make a column in csv shown in below picture and put{" "}
            <b>{item?.format.toLowerCase()}</b> urls in it.
          </Typography>

          {item?.format.toLowerCase() === "video" && (
            <img
              className={classes.showCaseImage}
              src={VideoShowCase}
              alt="NotBot"
            />
          )}
          {item?.format.toLowerCase() === "image" && (
            <img src={ImageShowCase} alt="NotBot" />
          )}
          {item?.format.toLowerCase() === "audio" && (
            <img src={AudioShowCase} alt="NotBot" />
          )}
        </>
      );
    }
  });
  return (
    <>
      <Typography variant={"subtitle2"}>
        Make a column named <b>to</b> shown in below picture and put the
        recipients phone number in it with country code.
      </Typography>
      <img className={classes.showCaseImage} src={PhoneShowCase} alt="NotBot" />
      {showCaseTextItems}
    </>
  );
};

const FillingTemplates = (props) => {
  const {
    classes,
    variables,
    onVariableChange,
    templateData,
    templateName,
  } = props;

  const variablesItem = variables?.map((item) => {
    if (item?.format == "text") {
      let no_of_variable = item?.no_of_variable;
      let variableIndexes = [];
      let templateString;
      let initialIndex = 0;
      for (let i = 1; i <= no_of_variable; i++) {
        let placeholder = `{{${i}}}`;
        let textString = item?.text.toString();
        let index = textString.indexOf(placeholder);
        let slicedString = textString.slice(initialIndex, index);
        templateString = (
          <>
            <Typography size={"xs"} variant={"body1"} component={"span"}>
              {slicedString}
            </Typography>
            <input
              type={"text"}
              name={i.toString()}
              className={classes.variableInput}
              onChange={(e) => onVariableChange(e, item)}
            />
          </>
        );
        variableIndexes.push(templateString);
        initialIndex = parseInt(index) + parseInt(placeholder.length);
      }
      let joinedText = variableIndexes.map((item) => item);

      return <>{joinedText}</>;
    }
  });
  const ifVariableLengthZero = templateData?.waba_templates.map((item) => {
    let tempString = "";
    console.log(templateName);
    console.log(item?.name);
    if (item?.name == templateName) {
      if (item?.components?.length > 0) {
        let comp = item.components.map((it) => {
          if (it?.text != undefined && it.text != null) {
            tempString += it?.text;
          }
        });
      }
      return (
        <Typography size={"xs"} variant={"body1"} component={"span"}>
          {tempString}
        </Typography>
      );
    }
  });
  return (
    <Grid container>
      <Grid item xs={12}>
        <br />
        {variables.map((item) => {
          if (item?.format == "text") {
            return (
              <>
                <br />
                <Typography size={"sm"} variant={"h6"} weight={"bold"}>
                  {item?.type}
                </Typography>
                <br />
                {variablesItem}
                <br />
              </>
            );
          } else {
            return (
              <>
                <br />
                <Typography size={"sm"} variant={"h6"} weight={"bold"}>
                  {item?.type}
                </Typography>
                <br />
                <TextField
                  variant={"outlined"}
                  fullWidth
                  onChange={(e) => onVariableChange(e, item)}
                  placeholder={`Enter url of ${item?.format.toLowerCase()}`}
                />
                <br />
              </>
            );
          }
        })}
        {variables.length == 0 && (
          <>
            <Typography weight={"bold"} size={"md"}>
              Template name : {templateName}
            </Typography>
            {ifVariableLengthZero}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default function Broadcast() {
  var classes = useStyles();
  var theme = useTheme();
  const dispatch = useDispatch();
  const store = useStore();
  const templateData = useSelector((state) => state.broadcast.templateMessages);

  const error = useSelector((state) => state.broadcast.error);
  const responseVariableMessageId = useSelector(
    (state) => state.broadcast.variableMessageId,
  );
  const responseSendingBulkTemplateMsg = useSelector(
    (state) => state.broadcast.responseSendingBulkTemplateMsg,
  );
  const variables = useSelector((state) => state.broadcast.variables);

  //loader for sending request
  const loading = useSelector((state) => state.broadcast.loading);

  // useEffect for message modal close
  useEffect(() => {
    if (
      responseVariableMessageId != undefined &&
      responseVariableMessageId != ""
    ) {
      setOpenMessageModal(false);
      setContactsFile(undefined);
      setContactNumber("");
      setSelectedTemplate(undefined);
      if (Object.keys(singleSendingLocalObj).length > 0) {
        setTimeout(() => setDataInLocalStorage(singleSendingLocalObj), 5000);
        setSingleSendingLocalObj({});
      }
    }
  }, [responseVariableMessageId]);

  useEffect(() => {
    if (Object.keys(responseSendingBulkTemplateMsg).length > 0) {
      setOpenBroadcastModal(false);
      setContactsFile(undefined);
      setBroadcastName("");
      setSelectedTemplate(undefined);
      if (Object.keys(singleBulkLocalObj).length > 0) {
        setTimeout(() => setDataInLocalStorage(singleBulkLocalObj), 5000);
        setBulkSendingLocalObj({});
      }
    }
  }, [responseSendingBulkTemplateMsg]);

  // useEffect for fetching templates
  useEffect(() => {
    dispatch(fetchTemplateMessages());
  }, []);

  const [variableState, setVariableState] = useState([]);
  const [linkState, setLinkState] = useState([]);

  // broadcast modal state
  const [openBroadcastModal, setOpenBroadcastModal] = useState(false);
  const [
    currentBroadcastModalStepIndex,
    setBroadcastCurrentModalStepIndex,
  ] = useState(0);
  const [broadcastName, setBroadcastName] = useState("");
  const [singleBulkLocalObj, setBulkSendingLocalObj] = useState({});

  // single message modal state
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [
    currentMessageModalStepIndex,
    setMessageCurrentModalStepIndex,
  ] = useState(0);
  const [contactNumber, setContactNumber] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(undefined);
  const [singleSendingLocalObj, setSingleSendingLocalObj] = useState({});

  const [contactsFile, setContactsFile] = useState(undefined);
  const [selectedDocument, setSelectedDocument] = useState(undefined);
  const [whentoSend, setWhentoSend] = useState("now");
  const [dateValue, setDateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState(new Date());

  const downloadSampleCSV = async (template_name, language) => {
    console.log(selectedTemplate);
    try {
      let myData = new FormData();
      myData.append("template_name", String(selectedTemplate.name));
      myData.append("language", String(selectedTemplate.language));
      const resp = await downloadCSVFileInstance.post(
        "sample/template_csv",
        myData,
      );
      console.log("Sample CSV Data::", resp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWhentoSend = (e) => {
    // console.log(e.target.value);
    setWhentoSend(e.target.value);
  };

  const onContactsFileLoad = ({ target }) => {
    console.log(target.files[0].name);
    setContactsFile(target.files[0]);
  };
  const onUploadCSV = () => {};

  const onSelectDocument = ({ target }) => {
    console.log(target.files[0].name);
    setSelectedDocument(target.files[0]);
  };

  const tplList = templateData?.waba_templates
    ? templateData?.waba_templates
    : [];
  const onChangeTemplate = (e, newValue) => {
    console.log("tttttttttttttt:::", e, " vvvvvv::::::::::", newValue);
    setSelectedTemplate(newValue);
  };
  const onChangeBroadcastName = (e) => {
    const name = e.target.value;
    setBroadcastName(name);
  };

  const BroadcastModalStepArray = [
    <FirstStep
      onChangeTemplate={onChangeTemplate}
      onChangeBroadcastName={onChangeBroadcastName}
      selectedTemplate={selectedTemplate}
      broadcastName={broadcastName}
      data={tplList}
    />,
    // <SecondStep onFileLoad={onSelectDocument}
    // file={selectedDocument}
    // classes={classes}/>,
    <ThirdStep
      onFileLoad={onContactsFileLoad}
      onUploadCSV={onUploadCSV}
      file={contactsFile}
      variables={variables}
      classes={classes}
      downloadSampleCSV={downloadSampleCSV}
      whentoSend={whentoSend}
      handleWhentoSend={handleWhentoSend}
      dateValue={dateValue}
      setDateValue={setDateValue}
      timeValue={timeValue}
      setTimeValue={setTimeValue}
    />,
  ];

  const onChangeNumber = (value) => {
    setContactNumber(value);
  };
  const onVariableChange = (e, item) => {
    let name = e.target.name;
    let value = e.target.value;
    let format = item.format;
    let type = item.type;
    let variableObj = {
      name,
      value,
    };
    if (format == "text") {
      let index = variableState.findIndex(
        (item) => item.type.toLowerCase() == type.toLowerCase(),
      );
      let obj = {
        type: type.toLowerCase(),
        variable: [variableObj],
      };

      if (index != -1) {
        let copyOfVariableState = variableState;
        let variableArray = copyOfVariableState[index].variable;
        let variableIndex = variableArray.findIndex(
          (item) => item.name == name,
        );
        if (variableIndex != -1) {
          variableArray[variableIndex].value = value;
          copyOfVariableState[index].variable = variableArray;
          // console.log(copyOfVariableState)
          setVariableState(copyOfVariableState);
        } else {
          let newArray = [...variableArray, variableObj];
          copyOfVariableState[index].variable = newArray;
          setVariableState(copyOfVariableState);
        }
      } else {
        // console.log("in else")
        let newArray = [...variableState, obj];
        setVariableState(newArray);
      }
    } else {
      let index = linkState.findIndex(
        (item) => item.format == format.toLowerCase(),
      );
      let obj = {
        type: type.toLowerCase(),
        format: format.toLowerCase(),
        link: value,
      };
      let copyOfLinkState = linkState;
      if (index != -1) {
        copyOfLinkState[index].link = value;
        setLinkState(copyOfLinkState);
      } else {
        let newArray = [...copyOfLinkState, obj];
        setLinkState(newArray);
      }
    }
  };
  const MessageModalStepArray = [
    <PhoneNumberStep
      number={contactNumber}
      onChangeTemplate={onChangeTemplate}
      onChangeNumber={onChangeNumber}
      selectedTemplate={selectedTemplate}
      classes={classes}
      data={tplList}
    />,
    <FillingTemplates
      templateData={templateData}
      classes={classes}
      templateName={selectedTemplate?.name}
      variables={variables}
      onVariableChange={onVariableChange}
    />,
    // <SecondStep onFileLoad={onSelectDocument}
    //             file={selectedDocument}
    //             classes={classes}/>
  ];

  //broadcast modal function
  const onBroadcastModalNextClick = () => {
    if (currentBroadcastModalStepIndex < BroadcastModalStepArray.length) {
      console.log(broadcastName, selectedTemplate);

      if (
        currentBroadcastModalStepIndex ==
        BroadcastModalStepArray.length - 1
      ) {
        if (contactsFile && selectedTemplate && broadcastName) {
          const date = `${dateValue.getFullYear()}-${dateValue.getMonth()}-${dateValue.getDate()}`;
          let hours = timeValue.getHours();
          let mins = timeValue.getMinutes();
          hours = hours / 10 < 1 ? "0" + hours : hours;
          mins = mins / 10 < 1 ? "0" + mins : mins;
          // console.log("mins::", mins, "hours::", hours);
          const time = `${hours}:${mins}:00`;
          // current date
          var currentdate = new Date();
          let currHour = currentdate.getHours();
          let currMinute = currentdate.getMinutes();
          currHour = currHour / 10 < 1 ? "0" + currHour : currHour;
          currMinute = currMinute / 10 < 1 ? "0" + currMinute : currMinute;
          let currSec = currentdate.getSeconds();

          let current_datetime = `${currentdate.getFullYear()}-${currentdate.getMonth()}-${currentdate.getDate()} ${currHour}:${currMinute}:${
            currSec + 30
          }`;

          let obj = new FormData();
          obj.append("file", contactsFile);
          obj.append("template_name", selectedTemplate.name);
          obj.append("namespace", selectedTemplate.namespace);
          obj.append("language", selectedTemplate.language);
          obj.append("brodcast_name", broadcastName);
          obj.append(
            "start_datetime",
            whentoSend === "now" ? current_datetime : `${date} ${time}`,
          );
          dispatch(sendBulkUploadTemplateMessage(obj));

          const localObj = {
            number: "none",
            broadcast_name: broadcastName,
            template_name: selectedTemplate?.name,
            file: contactsFile?.name,
            start_datetime: `${date} ${time}`,
            type: "Broadcast",
            status: "Sent",
          };
          setBulkSendingLocalObj(localObj);
        }
      } else if (broadcastName.length > 4 && selectedTemplate) {
        console.log("click");
        let requestObj = {
          template_name: selectedTemplate.name,
          language: selectedTemplate.language,
        };
        dispatch(fetchVariablesFromTemplates(requestObj));
        setBroadcastCurrentModalStepIndex(currentBroadcastModalStepIndex + 1);
      }
    }
  };
  const onBroadcastModalCancelClick = () => {
    setOpenBroadcastModal(false);
    setContactsFile(undefined);
    setBroadcastName("");
    setSelectedTemplate(undefined);
  };
  const addNewBroadCast = () => {
    setOpenBroadcastModal(true);
    setBroadcastCurrentModalStepIndex(0);
  };
  const userHistory = useSelector((state) => state.broadcast.userHistory);
  let [listData, setListData] = useState([]);

  useEffect(() => {
    dispatch(userHistoryData());
  }, []);
  useEffect(() => {
    try {
      // localStorage.removeItem("id_token")
      // localStorage.removeItem("messages")
      let newData = userHistory.map((item) => {
        return {
          number: item?.number,
          type: item?.type,
          template_name: item?.template_name,
          broadcast_name: item?.brodcast_name,
          file: item?.file,
          timestamp: item?.timestamp,
          status: item?.status,
        };
      });
      newData.sort((a, b) => {
        if (
          new Date(timeConverter(a?.timestamp)) >
          new Date(timeConverter(b?.timestamp))
        ) {
          return -1;
        }
        if (
          new Date(timeConverter(a?.timestamp)) <
          new Date(timeConverter(b?.timestamp))
        ) {
          return 1;
        }
        return 0;
      });
      setListData(newData);
    } catch (e) {
      console.log(e);
    }
  }, [userHistory]);

  //set data in localstorage
  const setDataInLocalStorage = (obj) => {
    try {
      dispatch(userHistoryData());
      // let newData  = [...listData ,  obj]
      // setListData(newData)
    } catch (e) {
      console.log(e);
    }
  };

  //get data from localstorage
  const getDataFromLocalStorage = (obj) => {};

  //single sending modal function
  const onMessageModalNextClick = () => {
    if (currentMessageModalStepIndex < MessageModalStepArray.length) {
      if (
        currentMessageModalStepIndex == 0 &&
        isValidPhoneNumber(contactNumber) &&
        selectedTemplate
      ) {
        let requestObj = {
          template_name: selectedTemplate?.name,
          language: selectedTemplate?.language,
        };
        console.log(requestObj);
        dispatch(fetchVariablesFromTemplates(requestObj));
        setMessageCurrentModalStepIndex(currentMessageModalStepIndex + 1);
      } else if (
        currentMessageModalStepIndex == 1 &&
        variableState != [] &&
        linkState != []
      ) {
        let requestObj = {};
        if (linkState.length > 0) {
          requestObj = {
            template_name: selectedTemplate.name,
            language: selectedTemplate.language,
            to: parseInt(contactNumber.slice(1, contactNumber.length)),
            namespace: selectedTemplate.namespace,
            parameters: variableState,
            link: linkState,
            broadcast_name: "none",
          };
        } else if (variableState.length > 0) {
          requestObj = {
            template_name: selectedTemplate.name,
            language: selectedTemplate.language,
            to: parseInt(contactNumber.slice(1, contactNumber.length)),
            namespace: selectedTemplate.namespace,
            parameters: variableState,
            broadcast_name: "none",
          };
        } else {
          requestObj = {
            template_name: selectedTemplate.name,
            language: selectedTemplate.language,
            to: parseInt(contactNumber.slice(1, contactNumber.length)),
            namespace: selectedTemplate.namespace,
            broadcast_name: "none",
          };
        }
        const localObj = {
          number: parseInt(contactNumber.slice(1, contactNumber.length)),
          broadcast_name: "none",
          template_name: selectedTemplate?.name,
          file: "none",
          type: "Individual",
          status: "Sent",
        };
        setSingleSendingLocalObj(localObj);
        dispatch(sendVariableTemplates(requestObj));
      }
    }
  };
  const onMessageModalCancelClick = () => {
    setOpenMessageModal(false);
    setContactsFile(undefined);
    setContactNumber("");
    setSelectedTemplate(undefined);
  };
  const addNewMessage = () => {
    setOpenMessageModal(true);
    setMessageCurrentModalStepIndex(0);
  };

  const HeaderBtnComponent = () => (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Button
        variant="contained"
        size="medium"
        className="bg-[#FED500] hover:bg-[#caa901] hover:text-white hover:text-opacity-80"
        onClick={addNewBroadCast}
        startIcon={<SendIcon />}
      >
        Send Bulk
      </Button>
      <Button
        style={{ marginLeft: "20px" }}
        variant="contained"
        size="medium"
        className="bg-[#FED500] hover:bg-[#caa901] hover:text-white hover:text-opacity-80"
        onClick={addNewMessage}
        startIcon={<SendIcon />}
      >
        New Template Message
      </Button>
    </Box>
  );

  return (
    <div className="grid w-full h-screen lg:grid-cols-12 ">
      <div className="col-span-12 overflow-auto">
        <PageTitle title="Template History" button={<HeaderBtnComponent />} />
        {/*broadcast modal*/}
        <Modal
          title={"New Broadcast"}
          onNext={onBroadcastModalNextClick}
          loading={loading}
          error={error}
          theme={theme}
          onCancel={onBroadcastModalCancelClick}
          open={openBroadcastModal}
        >
          {BroadcastModalStepArray[currentBroadcastModalStepIndex]}
        </Modal>
        {/*single sending modal*/}
        <Modal
          title={"New Message"}
          onNext={onMessageModalNextClick}
          onCancel={onMessageModalCancelClick}
          loading={loading}
          error={error}
          theme={theme}
          open={openMessageModal}
        >
          {MessageModalStepArray[currentMessageModalStepIndex]}
        </Modal>

        {/*<Grid container spacing={4}>*/}
        {/*overview stats listing*/}
        {/*<Grid item xs={12}>*/}
        {/*  <Box display={"flex"} justifyContent={"space-between"}*/}

        {/*       alignItems={"center"} textAlign={"center"}>*/}
        {/*    {mock.randomOverview.map(d=>(*/}
        {/*      <div>*/}
        {/*        <Typography size="xxl" color="text" colorBrightness="secondary">*/}
        {/*          {d}*/}
        {/*        </Typography>*/}
        {/*        <Typography variant={"subtitle"}>Delivered</Typography>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </Box>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12}>*/}
        <Widget
          title="Recipients List"
          upperTitle
          noBodyPadding
          disableWidgetMenu={true}
          bodyClass={classes.tableWidget}
        >
          <Table data={listData} />
        </Widget>
        {/*  </Grid>*/}
        {/*</Grid>*/}
      </div>
    </div>
  );
}
