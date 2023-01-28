import { AccountCircle } from "@mui/icons-material";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { LoadingButton } from "@mui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchClean, setSearchFrom, setSearchName, setSearchPhone, setSearchTo } from "../../redux/search/slice";
import styles from "./Filter.module.scss";
import dayjs from "dayjs";
import SendMessage from "../SendMessage";
const Filter = ({ isLoading = false, onSearch = () => undefined, onClean = () => undefined }) => {
  const dispatch = useDispatch();
  const { searchParams } = useSelector((state) => state.search);
  React.useEffect(() => {
    return function cleanup() {
      dispatch(setSearchClean());
    };
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.item}>
        <TextField
          value={searchParams.name}
          onChange={(e) => dispatch(setSearchName(e.target.value))}
          className={styles.input}
          size="small"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={styles.item}>
        <TextField
          value={searchParams.phone}
          onChange={(e) => dispatch(setSearchPhone(e.target.value))}
          type="tel"
          className={styles.input}
          size="small"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={styles.item}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="From"
            showTodayButton
            inputFormat="DD-MM-YYYY"
            value={searchParams.from}
            onChange={(value) => dispatch(setSearchFrom(value))}
            className={styles.input}
            renderInput={(params) => <TextField variant="outlined" className={styles.input} size="small" {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className={styles.item}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="To"
            inputFormat="DD-MM-YYYY"
            value={searchParams.to}
            onChange={(value) => dispatch(setSearchTo(value))}
            className={styles.input}
            renderInput={(params) => <TextField variant="outlined" className={styles.input} size="small" {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className={styles.item}>
        <Box sx={{ display: "flex" }}>
          <IconButton onClick={onSearch} disabled={isLoading} color="primary" size="small">
            <SearchIcon />
          </IconButton>
          <IconButton onClick={onClean} sx={{ marginLeft: "10px" }} color="primary" size="small">
            <CleaningServicesOutlinedIcon />
          </IconButton>
          <SendMessage />
        </Box>
      </div>
    </div>
  );
};

export default Filter;
