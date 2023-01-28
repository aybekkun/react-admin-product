import AddIcon from "@mui/icons-material/Add";
import { Button, CircularProgress, Drawer, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseTable from "../../components/Tables/CourseTable";
import { createCourse, fetchCourse } from "../../redux/course/asyncActions";
import { setCourseCount } from "../../redux/course/slice";
import styles from "./Courses.module.scss";
const Courses = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isSending, count } = useSelector((state) => state.course);
  const [drawer, setDrawer] = React.useState(false);
  const [form, updateForm] = React.useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { name: "", description: "" }
  );
  React.useEffect(() => {
    (async function () {
      await dispatch(fetchCourse());
    })();
  }, [count]);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createCourse({ name: form.name, description: form.description }));
    dispatch(setCourseCount());
    updateForm({ name: "", description: "" });
    setDrawer(false)
  };
  if (data.length < 1 && isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.actions}>
        <Button onClick={() => setDrawer(true)} size="small" variant="contained" startIcon={<AddIcon />}>
          Add course
        </Button>
        <Drawer anchor={"right"} open={drawer} onClose={() => setDrawer(false)}>
          <div className={styles.drawer}>
            <h3>Courses</h3>
            <form onSubmit={onSubmit}>
              <TextField
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
                type="text"
                margin="dense"
                size="small"
                label="Course name"
                variant="outlined"
                fullWidth
                required
                inputProps={{
                  maxLength: 25,
                }}
              />
              <TextField
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
                type="text"
                margin="dense"
                size="small"
                label="Description  "
                variant="outlined"
                fullWidth
                required
                inputProps={{
                  maxLength: 125,
                }}
              />
              <Button disabled={isSending} size="small" type="submit" variant="contained">
                Create
              </Button>
            </form>
          </div>
        </Drawer>
      </div>
      <CourseTable data={data} />
    </div>
  );
};

export default Courses;
