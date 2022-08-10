import React from "react";
import {
  Button,
  CircularProgress,
  createMuiTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  MuiThemeProvider,
  TextField,
  withStyles,
} from "@material-ui/core";

import { useTheme } from "@material-ui/styles";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

export default function Modal({
  theme,
  variant,
  children,
  title,
  open,
  onNext,
  onCancel,
  loading,
  error,
}) {
  const dialogTheme = (theme) =>
    createMuiTheme({
      overrides: {
        MuiDialog: {
          paper: {
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          },
        },
      },
    });
  const ColorButton = withStyles(() => ({
    root: {
      color: "black",
      backgroundColor: "#FED500",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  }))(Button);
  const TextButton = withStyles(() => ({
    root: {
      color: theme.palette.primary.main,
    },
  }))(Button);

  return (
    <Grid container>
      <Grid item xs={12}>
        <MuiThemeProvider theme={dialogTheme}>
          <Dialog
            maxWidth={"sm"}
            open={open}
            onClose={onCancel}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" className="text-black">{title}</DialogTitle>
            <Divider />
            <DialogContent>{children}</DialogContent>
            <DialogActions>
              <Typography size={"sm"} color={"secondary"}>
                {error && error?.message}
              </Typography>
              <TextButton onClick={onCancel} color="primary">
                Cancel
              </TextButton>
              <ColorButton
                onClick={onNext}
                color="primary"
                variant={"contained"}
              >
                {loading ? (
                  <CircularProgress size={24} style={{ color: "#fff" }} />
                ) : (
                  "Next"
                )}
              </ColorButton>
            </DialogActions>
          </Dialog>
        </MuiThemeProvider>
      </Grid>
    </Grid>
  );
}
