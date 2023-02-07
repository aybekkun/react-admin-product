import { Button, Paper, TextField } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBot, createContactInfo, deleteBot, fetchSetting } from "../../redux/settings/asyncActions";
import LeadStatus from "./components/LeadStatus";
import styles from "./Settings.module.scss";
const Settings = () => {
  const dispatch = useDispatch();
  const { data, isSending } = useSelector((state) => state.settings);
  const [token, setToken] = React.useState("");
  const [info, setInfo] = React.useState("");
  React.useEffect(() => {
    (async function () {
      await dispatch(fetchSetting());
    })();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createBot({ bot_token: token }));
    setToken("");
  };
  const onSubmitContact = async (e) => {
    e.preventDefault();
    await dispatch(createContactInfo({ contact: info }));
    setInfo("");
  };

  const onDelete = async () => {
    if (window.confirm("Delete bot")) {
      await dispatch(deleteBot());
    }
  };
  return (
    <>
      <div className={styles.root}>
        <Paper>
          <div className={styles.box}>
            <h4>Bot</h4>
            <div className={styles.bot}>
              <a href={data.bot_username} target="_blank" rel="noreferrer">
                {data.bot_username}
              </a>
            </div>
            <h4>Contact</h4>
            <div className={styles.bot}>{data.contact}</div>
            <h4>Date</h4>
            <div className={styles.bot}>{dayjs(data.createdAt).format("DD-MM-YYYY")}</div>
            <Button onClick={onDelete} color="error" variant="contained">
              Delete
            </Button>
          </div>
        </Paper>

        <Paper>
          <div className={styles.box}>
            <h4>Create bot</h4>
            <form onSubmit={onSubmit}>
              <TextField
                onChange={(e) => setToken(e.target.value)}
                value={token}
                name="bot_token"
                size="small"
                margin="dense"
                placeholder="Token here"
                fullWidth
              />
              <Button type="submit" disabled={isSending} size="small" variant="contained">
                Create
              </Button>
            </form>
          </div>
        </Paper>
        <Paper>
          <div className={styles.box}>
            <h4>Contact info</h4>
            <form onSubmit={onSubmitContact}>
              <textarea
                onChange={(e) => setInfo(e.target.value)}
                value={info}
                name="contact"
                size="small"
                margin="dense"
                placeholder="About bot "
                fullWidth
              ></textarea>
              <Button type="submit" disabled={isSending} size="small" variant="contained">
                Create
              </Button>
            </form>
          </div>
        </Paper>
      </div>
      <LeadStatus />
    </>
  );
};

export default Settings;
