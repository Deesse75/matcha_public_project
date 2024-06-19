import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import initializeMatcha from '../app.configuration/initiate';
import ErrorNotif from '../error/ErrorNotif';
import {appRedir} from '../app.configuration/path.config';
import IsLoading from '../../utils/IsLoading';

const Loading = () => {
  const nav = useNavigate();
  const [notif, setNotif] = useState('');

  useEffect(() => {
    // a supprimer
    nav(appRedir.signin);
    // a supprimer
    const initiate = async () => {
      const check: string = await initializeMatcha();
      if (check === 'ok') {
        nav(appRedir.signin);
      } else {
        setNotif(check);
        nav(appRedir.errorServer);
      }
    };
    initiate;
  }, []);
  return (
    <>
      {notif && <ErrorNotif notif={notif} setNotif={setNotif} />}
      <IsLoading />
    </>
  );
};

export default Loading;
