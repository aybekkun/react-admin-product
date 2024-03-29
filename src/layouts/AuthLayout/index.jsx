import { Button, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { userAuth } from "../../redux/auth/asyncActions";
import styles from "./AuthLayout.module.scss";
const AuthLayout = () => {
  const dispatch = useDispatch();

  const { isLoading, isAuth } = useSelector((state) => state.auth);
  let location = useLocation();
  const [form, updateForm] = React.useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { username: "", password: "" }
  );
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(userAuth({ username: form.username, password: form.password }));
  };

  if (isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <TextField
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
            autoComplete="off"
            name="username"
            sx={{ marginBottom: "20px" }}
            required
            label="Login"
            size="small"
            fullWidth
          />
          <TextField
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
            autoComplete="off"
            name="password"
            sx={{ marginBottom: "20px" }}
            required
            label="Password"
            size="small"
            type={"password"}
            fullWidth
          />
          <Button disabled={isLoading} type="submit" color="primary" variant="contained" fullWidth>
            {isLoading ? "Submiting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthLayout;
