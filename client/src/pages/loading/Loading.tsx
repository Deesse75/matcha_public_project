import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../components/app.configuration/path.config';
import IsLoading from '../../components/app.utilities/components/IsLoading';
import { appRoute } from '../../components/app.configuration/path.config';
import Cookies from 'js-cookie';

const Loading = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const nav = useNavigate();
  const [url, setUrl] = useState('');

  useEffect(() => {
    Cookies.remove('matchaOn');
    const request = async () => {
      try {
        const response = await fetch(appRoute.init);
        if (!response.ok) {
          setNotif(response.statusText);
          nav(appRedir.errorServer);
          return;
        }
        const data = await response.json();
        if (!data) {
          setNotif(response.statusText);
          nav(appRedir.errorInternal);
          return;
        }
        Cookies.set('matchaOn', '35135435sdfg64643gerer1334634343s54d654', {
          expires: 1,
        });
        Cookies.set('IP', data.ip, { expires: 1 });
        Cookies.get('seesion') ? nav(appRedir.getMe) : nav(appRedir.signin)
      } catch (error) {
        setNotif((error as Error).message);
        nav(appRedir.errorInternal);
        return;
      }
    };
    request();
  }, []);

  // Get position navigator
  useEffect(() => {
    const getUrl = async () => {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          position.coords.latitude;
          position.coords.longitude;
          setUrl(
            `${appRoute.geoloc}lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
          );
        });
      } catch (error) {
        console.log('Géolocalisation désactivée: ', error);
        Cookies.get('session') ? nav(appRedir.getMe) : nav(appRedir.signin);
      }
    };
    getUrl();
  }, []);

  // Get geolocation
  useEffect(() => {
    if (!url) return;
    const request = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          //set geoloc by IP ****************************************************
          return;
        }
        const data = await response.json();
        Cookies.set('Geoloc', data.address.state, { expires: 1 });
        Cookies.get('session') ? nav(appRedir.getMe) : nav(appRedir.signin);
      } catch (error) {
        console.log(
          'Echec lors de la récupération de la géolocalisation: ',
          error,
        );
        Cookies.get('session') ? nav(appRedir.getMe) : nav(appRedir.signin);
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

export default Loading;
