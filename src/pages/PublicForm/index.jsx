import { Button, CircularProgress, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import styles from "./PublicForm.module.scss";

import PhoneMask from "../../helpers/Mask/PhoneMask";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, fetchCourses } from "../../redux/publicForm/asyncActions";

const MenuProps = {
  autoFocus: false,
  //OverflowX: "scroll",
  PaperProps: {
    style: {
      //maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxheight: "250px",
      overflowY: "scroll",
    },
  },
};
const PublicForm = () => {
  const dispatch = useDispatch();
  const { courses, isLoading, isSending } = useSelector((state) => state.publicFrom);
  const [form, updateForm] = React.useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { username: "", phone: "+998", courseId: "" }
  );
  React.useEffect(() => {
    (async function () {
      await dispatch(fetchCourses());
    })();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      createOrder({
        FIO: form.username,
        phone: form.phone,
        courseId: form.courseId,
      })
    );
    console.log({
      FIO: form.username,
      phone: form.phone,
      courseId: form.courseId,
    });
    updateForm({ username: "", phone: "+998", courseId: "" });
  };
  if (isLoading) {
    return (
      <div className={styles.root}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <h2>Форма</h2>
        <form onSubmit={onSubmit}>
          <TextField
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
            autoComplete="off"
            name="FIO"
            type={"text"}
            sx={{ marginBottom: "20px" }}
            required
            label="Имя и Фамилия"
            placeholder="Иван Иванов"
            size="small"
            fullWidth
            inputProps={{
              maxLength: 32,
            }}
          />
          <TextField
            value={form.phone}
            onChange={(e) => updateForm({ phone: e.target.value })}
            autoComplete="off"
            name="phone"
            sx={{ marginBottom: "20px" }}
            required
            label="Телефон"
            size="small"
            type={"tel"}
            placeholder={"+998"}
            InputProps={{
              inputComponent: PhoneMask,
            }}
            fullWidth
          />
          <Select
            value={form.courseId}
            onChange={(e) => updateForm({ courseId: e.target.value })}
            sx={{ marginBottom: "20px" }}
            MenuProps={{ ...MenuProps }}
            required
            fullWidth
            size="small"
          >
            {courses.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" disabled={isSending} color="primary" variant="contained" fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PublicForm;
