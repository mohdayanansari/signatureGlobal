import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  wrapper: {
    width: "90%",
    display: "flex",
    height: "90%",
    borderRadius: 20,
    border: "1px solid rgba(255, 255, 255, 0.25)",
    // backgroundColor:theme.palette.secondary.contrastText,
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  },
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
    // top: 0,
    // left: 0,
    // backgroundColor:theme.palette.primary.main
  },
  logotypeContainer: {
    position: "relative",
    borderRadius: 20,
    // backgroundColor: theme.palette.homebck.main,
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  notBotLogo: {
    width: "150px",
    position: "absolute",
    top: "20px",
    left: "40px",
  },
  logotypeImage: {
    width: "50%",
    border: 10,
    marginBottom: theme.spacing(4),
  },
  logotypeText: {
    color: "#FED500",
    fontWeight: 900,
    fontSize: 40,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  formContainer: {
    width: "40%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.80)",
    display: "flex",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  form: {
    padding: "0px 50px",
    minWidth: 320,
  },
  tab: {
    fontWeight: 500,
    fontSize: 12,
    color: "white"
  },
  greeting: {
    fontWeight: 700,
    textAlign: "center",
    color: "#4ec247",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  googleButton: {
    marginTop: theme.spacing(6),
    boxShadow: theme.customShadows.widget,
    backgroundColor: "white",
    width: "100%",
    textTransform: "none",
  },
  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2),
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40",
  },
  errorMessage: {
    textAlign: "center",
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light,
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    borderBottomColor: theme.palette.background.light,
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400,
  },
  loginLoader: {
    // marginLeft: theme.spacing(4),
    color: "#FED500"
  },
  loginBtn: {
    fontWeight: 700,
    boxShadow: "none",
    backgroundColor: "#4ec247",
    color: "white",
    "&:hover": {
      color: "black",
      boxShadow: "none",
      backgroundColor: "#FED500",
    },
  },
  copyright: {
    marginTop: theme.spacing(4),
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing(2),
    },
  },
}));
