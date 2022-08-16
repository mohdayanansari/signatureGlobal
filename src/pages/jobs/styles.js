import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  variableInput:{
    border:"none",
    borderBottom:"1px solid #000",
    "&:focus-visible":{
      border:"none !important",
      borderBottom:"1px solid #000 !important",
      outline:"none"
    }
  },
  showCaseImage:{
    width: "60%",
    border:"1px solid #ccc",
    marginTop: "10px",
    marginBottom: "10px"
  },
  templateText:{
    fontWeight: "400",
    paddingTop: "20px",
    paddingBottom: "20px",
    border: "1px solid #ccc"
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
