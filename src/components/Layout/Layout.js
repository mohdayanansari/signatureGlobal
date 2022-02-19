import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Broadcast from "../../pages/broadcast";
import Chat from "../../pages/chat";
import Users from "../../pages/users/Users";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Broadcast} />
              <Route path="/app/chat" component={Chat} />
              <Route path="/app/users" component={Users} />
              <Route path="/app/typography" component={Typography} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
            {/*bottom footer*/}

            {/*<Box*/}
            {/*  mt={5}*/}
            {/*  width={"100%"}*/}
            {/*  display={"flex"}*/}
            {/*  alignItems={"center"}*/}
            {/*  justifyContent="space-between"*/}
            {/*>*/}
            {/*  <div>*/}
            {/*    <Link*/}
            {/*      color={'primary'}*/}
            {/*      href={'#'}*/}
            {/*      target={'_blank'}*/}
            {/*      className={classes.link}*/}
            {/*    >*/}
            {/*      Notbot.com*/}
            {/*    </Link>*/}
            {/*  </div>*/}
            {/*  <div>*/}
            {/*    <Link*/}
            {/*      href={'#'}*/}
            {/*      target={'_blank'}*/}
            {/*    >*/}
            {/*      <IconButton aria-label="facebook">*/}
            {/*        <Icon*/}
            {/*          path={FacebookIcon}*/}
            {/*          size={1}*/}
            {/*          color="#6E6E6E99"*/}
            {/*        />*/}
            {/*      </IconButton>*/}
            {/*    </Link>*/}
            {/*    <Link*/}
            {/*      href={'#'}*/}
            {/*      target={'_blank'}*/}
            {/*    >*/}
            {/*      <IconButton aria-label="twitter">*/}
            {/*        <Icon*/}
            {/*          path={TwitterIcon}*/}
            {/*          size={1}*/}
            {/*          color="#6E6E6E99"*/}
            {/*        />*/}
            {/*      </IconButton>*/}
            {/*    </Link>*/}
            {/*    <Link*/}
            {/*      href={'#'}*/}
            {/*      target={'_blank'}*/}
            {/*    >*/}
            {/*      <IconButton*/}
            {/*        aria-label="github"*/}
            {/*        style={{marginRight: -12}}*/}
            {/*      >*/}
            {/*        <Icon*/}
            {/*          path={GithubIcon}*/}
            {/*          size={1}*/}
            {/*          color="#6E6E6E99"*/}
            {/*        />*/}
            {/*      </IconButton>*/}
            {/*    </Link>*/}
            {/*  </div>*/}
            {/*</Box>*/}
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);