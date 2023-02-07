import React from "react";
import styles from "./PublicForm.module.scss";

import { useDispatch } from "react-redux";
import PublicCustomForm from "../../components/PublicCustomForm";

const PublicForm = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <h2>Форма</h2>
        <PublicCustomForm />
      </div>
    </div>
  );
};

export default PublicForm;
