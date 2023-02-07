import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserStatus } from "../../../redux/leads/asyncActions";
import { setLeadsCount } from "../../../redux/leads/slice";
import styles from "./ShowStatus.module.scss";
const ShowStatus = ({ status, userId }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.status);
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    setValue(status.id);
    return ()=>{
      setValue(0);
    }
  }, [status.id]);
  const handleChange = async (event) => {
    setValue(event.target.value);
    await dispatch(editUserStatus({ id: userId, statusId: event.target.value }));
    dispatch(setLeadsCount());
  };
  return (
    <div className={styles.root}>
      <Select onChange={handleChange} value={value} defaultValue={status.id} size="small" sx={{ minWidth: 120 }}>
        {data.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default ShowStatus;
