import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  templateHeading:{
    marginRight:20
  },
  chatWindow:{
    backgroundColor:"#f5f8ff",
    padding:50
  },
  chatList:{
    background: "#fff",
    paddingBottom: "10px",
    paddingLeft: "20px",
    borderRadius: "10px",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  },
  inputText:{
    padding:"10px",
    margin:"10px",
    borderRadius: "10px",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
  },
  templateChip:{
    height: "20px",
    fontSize: "10px",
    textAlign: "left",
    background:theme.palette.secondary.contrastText
  },
  recipientTitle:{
    padding:"10px",
    backgroundColor:"#ffffff",
    marginBottom:"10px",
    width:"100%",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    borderRadius:10
  },
  recipientList:{
    padding:"10px",
    margin:"10px",
    backgroundColor:"#ffffff",
    width:"90%",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    borderRadius:10
  },
  selectedRecipientList:{
    padding:"10px",
    paddingTop:"20px",
    paddingBottom:"20px",
    margin:"10px",
    backgroundColor:"#3f51b521",
    width:"94%",
    border:"2px solid #536DFE",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    borderRadius:10
  },
  bold:{
    "& > span":{
      fontWeight:"bold"
    }
  },
  templateMsgBlock:{
    maxWidth:"350px",
    // width:"350px"
  },
  flexTitle:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between"
  },
  leftMsg:{
    display:"flex",
    justifyContent:"flex-start",
    flexDirection:"column",
    alignItems:"flex-start"
  },
  rightMsg:{
    display:"flex",
    justifyContent:"flex-end",
    flexDirection:"column",
    alignItems:"flex-end"
  },
  fromMe:{
    backgroundColor:theme.palette.success.main,
  },
  fromSender:{
    backgroundColor:theme.palette.secondary.main,
  },
  msgText:{
    color:theme.palette.secondary.contrastText,
    padding:"5px 10px",
    borderRadius: "10px",
    margin: "5px 10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
  },
  beforeLoading:{
    paddingTop:"10px",
    height:"45vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    // background:theme.palette.success.light
  },
  afterLoading:{
    paddingTop:"10px",
    "& > div":{
      height:"45vh",
      overflowY:"scroll"
    }
    // background:theme.palette.success.light
  },
  chatWrapperGrid:{
    display:"flex",
    flexDirection:"column",
    paddingLeft:20
  },

  inputFile:{
    display:"none"
  },
  phoneNumberInput: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    padding: "2px 0px",
    borderRadius: "6px",
    "& .PhoneInputInput": {
      flex: "1 1",
      minWidth: 0,
      height:"30px",
      background: "hsla(0,0%,100%,.4)",
      outline: "none",
      border: "none",
    },
    "& .PhoneInputCountry": {
      paddingLeft: 10,
    },
    "&:hover": {
      border: "1px solid #111",
    },
    "&:focus-within": {
      border: `1.5px solid ${theme.palette.primary.main}`,
    },
  },

  buttonPrimary:{
    backgroundColor:theme.palette.primary.main
  },
  buttonSecondary:{
    backgroundColor:theme.palette.secondary.main
  },
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  visitsNumberContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: theme.spacing(1),
  },
  progressSection: {
    marginBottom: theme.spacing(1),
  },
  progressTitle: {
    marginBottom: theme.spacing(2),
  },
  progress: {
    marginBottom: theme.spacing(1),
    backgroundColor: 'rgb(236, 236, 236)',
  },
  pieChartLegendWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: theme.spacing(1),
  },
  legendItemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  fullHeightBody: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tableWidget: {
    overflowX: "auto",
  },
  progressBarPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  progressBarWarning: {
    backgroundColor: theme.palette.warning.main,
  },
  performanceLegendWrapper: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  legendElement: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  legendElementText: {
    marginLeft: theme.spacing(1),
  },
  serverOverviewElement: {
    display: "flex",
    alignItems: "center",
    maxWidth: "100%",
  },
  serverOverviewElementText: {
    minWidth: 145,
    paddingRight: theme.spacing(2),
  },
  serverOverviewElementChartWrapper: {
    width: "100%",
  },
  mainChartBody: {
    overflowX: "auto",
  },
  mainChartHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap",
    },
  },
  mainChartHeaderLabels: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      order: 3,
      width: "100%",
      justifyContent: "center",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },
  mainChartHeaderLabel: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(3),
  },
  mainChartSelectRoot: {
    borderColor: theme.palette.text.hint + "80 !important",
  },
  mainChartSelect: {
    padding: 10,
    paddingRight: 25,
  },
  mainChartLegentElement: {
    fontSize: "18px !important",
    marginLeft: theme.spacing(1),
  },
  failed:{
    color:theme.palette.error.main
  },
  read:{
    color:theme.palette.primary.main
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  }

}));


