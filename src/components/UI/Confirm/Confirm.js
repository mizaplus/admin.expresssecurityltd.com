import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./styles.module.css";
import classNames from "classnames";

export default function Confirm({ open, setOpen, title, message, onChange }) {
  const handleClose = (value) => {
    setOpen(false);
    onChange(value);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className={classNames(styles.btn, styles.ghost)}
            onClick={() => handleClose(false)}
          >
            Disagree
          </button>
          <button
            className={classNames(styles.btn, styles.full)}
            onClick={() => handleClose(true)}
          >
            Agree
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
