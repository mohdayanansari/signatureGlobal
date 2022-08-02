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
    <Grid container className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.logotypeContainer}>
          <img
            src={"https://signaturegurgaonindia.com/images/builder-logo.png"}
            alt="logo"
            className={classes.notBotLogo}
          />
          {/*<img src={notBotLogo} alt="logo" className={classes.notBotLogo} />*/}
          <img src={logo} alt="logo" className={classes.logotypeImage} />
          <Typography className={classes.logotypeText}>
            WHATSAPP DASHBOARD
          </Typography>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Login" classes={{ root: classes.tab }} />
              {/*<Tab label="New User" classes={{ root: classes.tab }} />*/}
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment>
                <Typography variant="h2" className={classes.greeting}>
                  Welcome User
                </Typography>
                {/*<Button size="large" className={classes.googleButton}>*/}
                {/*  <img src={google} alt="google" className={classes.googleIcon} />*/}
                {/*  &nbsp;Sign in with Google*/}
                {/*</Button>*/}
                {/*<div className={classes.formDividerContainer}>*/}
                {/*  <div className={classes.formDivider} />*/}
                {/*  <Typography className={classes.formDividerWord}>or</Typography>*/}
                {/*  <div className={classes.formDivider} />*/}
                {/*</div>*/}
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
                <TextField
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
                />
                {/*<FormLabel for={"password"}>Enter Password</FormLabel>*/}
                <TextField
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
                />
                <div className={classes.formButtons}>
                  {isLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
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
            {/*{activeTabId === 1 && (*/}
            {/*  <React.Fragment>*/}
            {/*    <Typography variant="h1" className={classes.greeting}>*/}
            {/*      Welcome!*/}
            {/*    </Typography>*/}
            {/*    <Typography variant="h2" className={classes.subGreeting}>*/}
            {/*      Create your account*/}
            {/*    </Typography>*/}
            {/*    <Fade in={error}>*/}
            {/*      <Typography color="secondary" className={classes.errorMessage}>*/}
            {/*        Something is wrong with your login or password :(*/}
            {/*      </Typography>*/}
            {/*    </Fade>*/}
            {/*    <TextField*/}
            {/*      id="name"*/}
            {/*      InputProps={{*/}
            {/*        classes: {*/}
            {/*          underline: classes.textFieldUnderline,*/}
            {/*          input: classes.textField,*/}
            {/*        },*/}
            {/*      }}*/}
            {/*      value={nameValue}*/}
            {/*      onChange={e => setNameValue(e.target.value)}*/}
            {/*      margin="normal"*/}
            {/*      placeholder="Full Name"*/}
            {/*      type="text"*/}
            {/*      fullWidth*/}
            {/*    />*/}
            {/*    <TextField*/}
            {/*      id="email"*/}
            {/*      InputProps={{*/}
            {/*        classes: {*/}
            {/*          underline: classes.textFieldUnderline,*/}
            {/*          input: classes.textField,*/}
            {/*        },*/}
            {/*      }}*/}
            {/*      value={loginValue}*/}
            {/*      onChange={e => setLoginValue(e.target.value)}*/}
            {/*      margin="normal"*/}
            {/*      placeholder="Email Adress"*/}
            {/*      type="email"*/}
            {/*      fullWidth*/}
            {/*    />*/}
            {/*    <TextField*/}
            {/*      id="password"*/}
            {/*      InputProps={{*/}
            {/*        classes: {*/}
            {/*          underline: classes.textFieldUnderline,*/}
            {/*          input: classes.textField,*/}
            {/*        },*/}
            {/*      }}*/}
            {/*      value={passwordValue}*/}
            {/*      onChange={e => setPasswordValue(e.target.value)}*/}
            {/*      margin="normal"*/}
            {/*      placeholder="Password"*/}
            {/*      type="password"*/}
            {/*      fullWidth*/}
            {/*    />*/}
            {/*    <div className={classes.creatingButtonContainer}>*/}
            {/*      {isLoading ? (*/}
            {/*        <CircularProgress size={26} />*/}
            {/*      ) : (*/}
            {/*        <Button*/}
            {/*          onClick={() =>*/}
            {/*            loginUser(*/}
            {/*              userDispatch,*/}
            {/*              loginValue,*/}
            {/*              passwordValue,*/}
            {/*              props.history,*/}
            {/*              setIsLoading,*/}
            {/*              setError,*/}
            {/*            )*/}
            {/*          }*/}
            {/*          disabled={*/}
            {/*            loginValue.length === 0 ||*/}
            {/*            passwordValue.length === 0 ||*/}
            {/*            nameValue.length === 0*/}
            {/*          }*/}
            {/*          size="large"*/}
            {/*          variant="contained"*/}
            {/*          color="primary"*/}
            {/*          fullWidth*/}
            {/*          className={classes.createAccountButton}*/}
            {/*        >*/}
            {/*          Create your account*/}
            {/*        </Button>*/}
            {/*      )}*/}
            {/*    </div>*/}
            {/*    <div className={classes.formDividerContainer}>*/}
            {/*      <div className={classes.formDivider} />*/}
            {/*      <Typography className={classes.formDividerWord}>or</Typography>*/}
            {/*      <div className={classes.formDivider} />*/}
            {/*    </div>*/}
            {/*    <Button*/}
            {/*      size="large"*/}
            {/*      className={classnames(*/}
            {/*        classes.googleButton,*/}
            {/*        classes.googleButtonCreating,*/}
            {/*      )}*/}
            {/*    >*/}
            {/*      <img src={google} alt="google" className={classes.googleIcon} />*/}
            {/*      &nbsp;Sign in with Google*/}
            {/*    </Button>*/}
            {/*  </React.Fragment>*/}
            {/*)}*/}
          </div>
          {/*<Typography color="primary" className={classes.copyright}>*/}
          {/*© 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic</a>, LLC. All rights reserved.*/}
          {/*</Typography>*/}
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
