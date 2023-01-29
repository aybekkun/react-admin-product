import { Button, CircularProgress, IconButton, Popover } from "@mui/material";
import React from "react";
import styles from "./CreateComment.module.scss";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { createLeadsComment } from "../../../redux/leads/asyncActions";
import { setLeadsCount } from "../../../redux/leads/slice";
const CreateComment = ({ userId = 0 }) => {
  const dispatch = useDispatch();
  const { isSendingComment } = useSelector((state) => state.leads);
  const [text, setText] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createLeadsComment({ id: userId, comment: text }));
    dispatch(setLeadsCount());
    handleClose();
    setText("");
  };
  const open = Boolean(anchorEl);
  return (
    <div className={styles.root}>
      <IconButton sx={{ marginLeft: "10px" }} onClick={handleClick} color="primary" size="small">
        <ChatBubbleOutlineOutlinedIcon />
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
          {!isSendingComment ? (
            <form onSubmit={onSubmit}>
              <h3>Text</h3>
              <textarea
                maxLength={120}
                onChange={(e) => setText(e.target.value)}
                name="message"
                cols="30"
                rows="10"
              ></textarea>
              <Button sx={{ margin: "20px 0" }} type="submit" size="small" variant="contained">
                Send
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

export default CreateComment;
