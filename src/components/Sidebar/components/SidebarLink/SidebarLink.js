import React, { useState } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Inbox as InboxIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Dot from "../Dot";
import {UncontrolledTooltip} from "reactstrap";

export default function SidebarLink({
  link,
  activeIcon,
  inActiveIcon,
  label,
  children,
  location,
  isSidebarOpened,
  nested,
  type,
    uid
}) {
  var classes = useStyles();

  // local
  var [isOpen, setIsOpen] = useState(false);
  var isLinkActive =
    link &&
    (location.pathname === link || location.pathname.indexOf(link) !== -1);

  if (type === "title")
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    );

  if (type === "divider") return <Divider className={classes.divider} />;
  if (link && link.includes('http')) {
    return (
      <ListItem
        button
        className={classes.link}
        classes={{
          root: classnames(classes.linkRoot, {
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
        disableRipple
      >
        <a className={classes.externalLink} href={link}>
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {nested ? <Dot color={isLinkActive && "primary"} /> : activeIcon}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
        </a>
      </ListItem>
    )
  }
  if (!children){
      if(isLinkActive){
          return (
              <>
                  <Link to={link} id={uid} className="glass-des my-2 w-4/5 h-14 flex justify-center items-center rounded-xl opacity-60">
                      {activeIcon}
                      {isSidebarOpened && <p className="text-white ml-2">{label}</p>}
                  </Link>
                  {/*<UncontrolledTooltip target={uid} placement="top">*/}
                  {/*    {label}*/}
                  {/*</UncontrolledTooltip>*/}
              </>
          )
      }else{
          return (
              <>
                  <Link to={link} id={uid} className="my-2 w-4/5 h-14 flex justify-center items-center rounded-xl opacity-60">
                      {inActiveIcon}
                      {isSidebarOpened && <p className="text-appWhiteText-200 ml-2">{label}</p>}
                  </Link>
                  {/*<UncontrolledTooltip target={uid} placement="top">*/}
                  {/*    {label}*/}
                  {/*</UncontrolledTooltip>*/}
              </>
          );
      }
  }


  return (
    <>
      <ListItem
        button
        component={link && Link}
        onClick={toggleCollapse}
        className={classes.link}
        to={link}
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {activeIcon ? activeIcon : <InboxIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
      {children && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {children.map(childrenLink => (
              <SidebarLink
                key={childrenLink && childrenLink.link}
                location={location}
                isSidebarOpened={isSidebarOpened}
                classes={classes}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );

  // ###########################################################

  function toggleCollapse(e) {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
}
