import { useNavigate } from 'react-router-dom';
import IsLoading from '../../components/app.utilities/components/IsLoading';
import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  appRedir,
  appRoute,
} from '../../components/app.configuration/path.config';
import { UserContext } from '../../components/app.utilities/context/user.context';

const GetMe = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const nav = useNavigate();
  const me = useContext(UserContext);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    if (!Cookies.get('session')) {
      nav(appRedir.signin);
      return;
    }
    setConnected(true);
  }, []);

  useEffect(() => {
    if (!connected) return;
    //a supprimer****************************************************************
    nav(appRedir.home);
    return;
    //a supprimer****************************************************************
    window.scrollTo(0, 0);
    const request = async () => {
      try {
        const response = await fetch(appRoute.getMe, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
        });
        const data = await response.json();
        if (response.status !== 200) {
          setNotif(data?.message || response.statusText);
          nav(appRedir.errorInternal);
          return;
        }
        me.userDispatch({
          type: 'SET_USER_ON',
          payload: data.user,
        });
        nav(appRedir.home);
      } catch (error) {
        setNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
  }, [connected]);
  return (
    <>
      <IsLoading />
    </>
  );
};

export default GetMe;
