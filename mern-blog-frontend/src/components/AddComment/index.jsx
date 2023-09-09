import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

export const Index = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src=""
        />
        <div className={styles.form}>
          <TextField
            label={t("write comment")}
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">{t("send")}</Button>
        </div>
      </div>
    </>
  );
};
