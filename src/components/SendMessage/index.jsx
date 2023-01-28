import { Button, CircularProgress, IconButton, Popover } from "@mui/material";
import React from "react";
import styles from "./SendMessage.module.scss";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useDispatch, useSelector } from "react-redux";
import { createSendMessage } from "../../redux/settings/asyncActions";

const SendMessage = ({ userId = 0 }) => {
  const dispatch = useDispatch();
  const { isSendingMessage } = useSelector((state) => state.settings);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [text, setText] = React.useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("message", text);
    fd.append("file", image);
    if (userId !== 0) {
      fd.append("user_id", userId);
      await dispatch(createSendMessage(fd));
    } else {
      await dispatch(createSendMessage(fd));
    }
    setImage(null);
    setText("");
    handleClose();
  };

  const handleFile = (e) => {
    let file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className={styles.root}>
      <IconButton sx={{ marginLeft: "10px" }} onClick={handleClick} color="primary" size="small">
        <EmailOutlinedIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={styles.content}>
          {!isSendingMessage ? (
            <form onSubmit={onSubmit}>
              <h3>Text</h3>
              <textarea
                maxLength={500}
                onChange={(e) => setText(e.target.value)}
                name="message"
                cols="30"
                rows="10"
              ></textarea>
              <h3>File *png, *jpg</h3>
              <input type="file" onChange={handleFile} accept="image/*" />
              <Button sx={{ margin: "20px 0" }} type="submit" size="small" variant="contained">
                Send all
              </Button>
            </form>
          ) : (
            <div>
              <CircularProgress />
            </div>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default SendMessage;
