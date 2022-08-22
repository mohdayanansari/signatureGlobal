import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from "@material-ui/core";
import Icon from "@mdi/react";

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from "@mdi/js";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Broadcast from "../../pages/broadcast";
import Chat from "../../pages/chat";
import Newchat from "../../pages/newchatpage/Dashboard";
import Sequence from "../../pages/sequence/Sequence";
import OldSequence from "../../pages/sequence/OldSequence";
import Users from "../../pages/users/Users";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import Contacts from "../../pages/contacts";
import BulkSequence from "../../pages/bulkSequence/BulkSequence";
// context
import { useLayoutState } from "../../context/LayoutContext";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import ShowSequence from "../../pages/showSequence/ShowSequence";
import Jobs from "../../pages/jobs/Jobs";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  const accessToken = useSelector((state) => state.login.access_token);
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

  return (
    <div className={classes.root}>
      <>
        <Sidebar history={props.history} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <Switch>
            <Route path="/app/dashboard" component={Broadcast} />
            <Route path="/app/chat" component={Chat} />
            <Route path="/app/sequence" component={Sequence} />
            <Route path="/app/show-sequence" component={ShowSequence} />
            <Route path="/app/bulk-sequence" component={BulkSequence} />
            <Route path="/app/jobs" component={Jobs} />
            <Route path="/app/oldsequence" component={OldSequence} />
            <Route path="/app/users" component={Users} />
            <Route path="/app/contacts" component={Contacts} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
