import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IsLoading from '../../components/app.utilities/components/IsLoading';
import {
  appRedir,
  appRoute,
} from '../../components/app.configuration/path.config';
import { OpenPageContext } from '../../components/app.utilities/context/open.context';

const ValidateEmail = () => {
  const url = window.location.href;
  const nav = useNavigate();
  const setNotif = useContext(OpenPageContext).setNotif;

  useEffect(() => {
    if (!url) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.validateEmail, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url }),
        });
        const data = await response.json();
        setNotif(data.message);
        nav(appRedir.signin);
      } catch (error) {
        setNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
  }, [url]);
  return (
    <>
      <IsLoading />
    </>
  );
};

export default ValidateEmail;
