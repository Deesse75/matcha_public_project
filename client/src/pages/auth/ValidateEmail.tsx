import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IsLoading from '../../utils/components/IsLoading';
import { appRedir, appRoute } from '../app.configuration/path.config';
import ErrorNotif from '../error/ErrorNotif';
import Cookies from 'js-cookie';

const ValidateEmail = () => {
  const url = window.location.href;
  const [notif, setNotif] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    Cookies.get('matchaOn') ? null : nav(appRedir.loading);
    if (!url) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.validateEmail, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url }),
        });
        const data = await response.json();
        setNotif(data.message || response.statusText);
        if (data.redir) nav(data.redir);
        else nav(appRedir.signin);
      } catch (error) {
        setNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
  }, [url]);
  return (
    <>
      {notif && <ErrorNotif notif={notif} setNotif={setNotif} />}
      <IsLoading />
    </>
  );
};

export default ValidateEmail;
