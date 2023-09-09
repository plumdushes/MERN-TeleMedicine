import React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>TELEMED</div>
          </Link>

          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Button onClick={() => changeLanguage("en")}>EN</Button>
                <Button onClick={() => changeLanguage("ru")}>RU</Button>
                <Link to="/add-appeal">
                  <Button variant="contained">{t("create appeal")}</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  {t("exit")}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">{t("entry")}</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">{t("create account")}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
