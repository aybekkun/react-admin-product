import { IconButton, Popover } from "@mui/material";
import React from "react";
import styles from "./ShowComment.module.scss";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
const ShowComment = ({ text = "" }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div className={styles.root}>
      <IconButton sx={{ marginLeft: "10px" }} onClick={handleClick} color="primary" size="small">
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        {text ? (
          <div className={styles.content}>
            <p>{text}</p>
          </div>
        ) : (
          <p className={styles.content}>No comments</p>
        )}
      </Popover>
    </div>
  );
};

export default ShowComment;
