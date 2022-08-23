import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState } from "../context/UserContext";
import { useDispatch, useStore, useSelector } from "react-redux";
import { setAuth } from "../store/reducer/login";
import jwtDecode from "jwt-decode";

export default function App() {
  // global
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  const accessToken = useSelector((state) => state.login.access_token);
  const username = useSelector((state) => state.login.username);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (accessToken) {
      const jDecode = jwtDecode(accessToken);
      if (jDecode?.sub === "admin@signatureglobal.in") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [accessToken]);

  useEffect(() => {
    let accessToken = localStorage.getItem("id_token");
    let username = localStorage.getItem("username");
    let obj = {
      isAuthenticated: accessToken !== null ? true : false,
      access_token: accessToken,
      username: username,
    };
    dispatch(setAuth(obj));
    if (accessToken) {
      const jDecode = jwtDecode(accessToken);
      if (jDecode?.sub === "admin@signatureglobal.in") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      // console.log(jDecode)
    }
  }, []);

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <DemoRoute isAdmin={isAdmin} />} />
        <Route
          exact
          path="/app"
          render={() => <DemoRoute isAdmin={isAdmin} />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  function DemoRoute({ isAdmin }) {
    if (isAdmin) {
      return <Redirect to={"/app/users"} />;
    } else {
      return <Redirect to={"/app/dashboard"} />;
    }
  }

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
