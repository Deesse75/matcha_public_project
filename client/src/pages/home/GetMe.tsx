import { useNavigate } from 'react-router-dom';
import IsLoading from '../../components/app.utilities/components/IsLoading';
import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  appRedir,
  appRoute,
} from '../../components/app.configuration/path.config';
import { UserContext } from '../../components/app.utilities/context/user.context';
import { OpenPageContext } from '../../components/app.utilities/context/open.context';

const GetMe = () => {
  const nav = useNavigate();
  const setNotif = useContext(OpenPageContext).setNotif;
  const me = useContext(UserContext);

  useEffect(() => {
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    if (!Cookies.get('session')) {
      nav(appRedir.signout);
      return;
    }
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
          setNotif(data.message);
          if (data.redir) nav(data.redir);
          return;
        }
        me.setUser(data?.user);
        nav(appRedir.home);
      } catch (error) {
        setNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
  }, []);
  return (
    <>
      <IsLoading />
    </>
  );
};

export default GetMe;
