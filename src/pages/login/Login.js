import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  FormLabel,
  InputAdornment,
} from "@material-ui/core";
import { Email, VpnKey } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "../../images/header.jpg";
import notBotLogo from "../../images/notbot-logo.png";
import google from "../../images/google.svg";

// context
import { useDispatch, useStore, useSelector } from "react-redux";
import { loginUser } from "../../store/reducer/login";
import { Label } from "@material-ui/icons";

function Login(props) {
  var classes = useStyles();

  // global
  const dispatch = useDispatch();
  // local
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  const loginError = useSelector((state) => state.login.error);
  const isLoading = useSelector((state) => state.login.loading);

  useEffect(() => {
    setError(loginError);
  }, [loginError]);

  const getLoggedIn = () => {
    if (
      loginValue.toString().length > 4 &&
      passwordValue.toString().length > 4
    ) {
      let obj = {
        email: loginValue,
        password: passwordValue,
      };
      dispatch(loginUser(obj));
    } else {
      setError(true);
    }
  };

  return (
    <Grid container className="h-screen">
      <div className="flex flex-col items-center justify-center w-full">
        <img
          src={
            "https://notbot.in/wp-content/uploads/2022/05/Notbot_Logo-Green.svg"
          }
          alt="logo"
          className=""
        />
        <div className="pt-24 -mt-[50px]">
          <Typography className="text-[52px] text-white/90 font-bold mb-10">
            <span className="text-[#FED500]">Grow</span> your business
            <span className="text-[#0085f8]"> faster </span>with{" "}
            <span className="text-[#4ec247]">whatsapp</span>.
          </Typography>
        </div>
        <div className="border border-white/20 p-12 rounded-xl">
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="#0085f8"
            textColor="#0085f8"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="Signup" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h2" className={classes.greeting}>
                Welcome User👋
              </Typography>

              {error && (
                <Fade in={error}>
                  <Typography
                    color="secondary"
                    className={classes.errorMessage}
                  >
                    Something is wrong with your login or password :(
                  </Typography>
                </Fade>
              )}
              {/*<FormLabel for={"email"}>Enter Email</FormLabel>*/}
              <div className="pt-1 pb-3 px-4 rounded-lg">
                <div className="flex items-center relative gap-2 p-4 border border-white/20 rounded-lg w-[500px] mb-5">
                  <Email className="text-white/90" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                    className="outline-none focus:outline-none bg-transparent text-white/70 text-lg font-semibold flex-1 caret-[#FED500]"
                  />
                </div>
                <div className="flex items-center relative gap-2 p-4 border border-white/20 rounded-lg w-[500px]">
                  <VpnKey className="text-white/90" />
                  <input
                    name="password"
                    id="password"
                    type="password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    className="outline-none focus:outline-none bg-transparent text-white/70 text-lg font-semibold flex-1 caret-[#FED500]"
                  />
                </div>
                {/* <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  variant={"outlined"}
                  value={loginValue}
                  onChange={(e) => setLoginValue(e.target.value)}
                  margin="normal"
                  placeholder="Email Adress"
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                /> */}
                {/*<FormLabel for={"password"}>Enter Password</FormLabel>*/}
                {/* <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={passwordValue}
                  variant={"outlined"}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  margin="normal"
                  placeholder="Password"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKey />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                /> */}
              </div>
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    size={"large"}
                    fullWidth
                    onClick={getLoggedIn}
                    variant="contained"
                    color="primary"
                    className={classes.loginBtn}
                  >
                    Login
                  </Button>
                )}
                {/*<Button*/}
                {/*  color="primary"*/}
                {/*  size="large"*/}
                {/*  className={classes.forgetButton}*/}
                {/*>*/}
                {/*  Forget Password*/}
                {/*</Button>*/}
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <>
              <div className="flex justify-center items-center p-5">
                <h1 className="text-white/70 text-xl ">
                  This feature is coming soon...
                </h1>
              </div>
            </>
          )}
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
