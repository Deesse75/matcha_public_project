import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../app.configuration/path.config';
import IsLoading from '../../utils/components/IsLoading';
import { appRoute } from '../app.configuration/path.config';
import Cookies from 'js-cookie';

const Loading = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const nav = useNavigate();
  const [matchaOn, setMatchaOn] = useState(false);
  const [url, setUrl] = useState('');
  const [reset, setReset] = useState(false);

  // Verify if server is on
  useEffect(() => {
    Cookies.remove('matchaOn');
    Cookies.remove('Geoloc');
    Cookies.remove('IP');
    //a supprimer *********************************************
    Cookies.set('matchaOn', 'Matcha', { expires: 1 });
    nav(appRedir.signin);
    return;
    //a supprimer *********************************************
    setReset(true);
    const request = async () => {
      try {
        const response = await fetch(appRoute.init);
        const data = await response.json();
        if (response.status !== 200) {
          setNotif(data.message || response.statusText);
          nav(appRedir.errorServer);
          return;
        }
        if (data.ip) Cookies.set('IP', data.ip, { expires: 1 });
        Cookies.set('matchaOn', 'Matcha', { expires: 1 });
        setMatchaOn(true);
      } catch (error) {
        setNotif((error as Error).message);
        nav(appRedir.errorServer);
        return;
      }
    };
    request();
  }, []);

  // Get position navigator
  useEffect(() => {
    if (!matchaOn || !reset) return;
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
  }, [matchaOn, reset]);

  // Get geolocation
  useEffect(() => {
    if (!url || !reset) return;
    const request = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          //set geoloc by IP ************************************
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
  }, [url, reset]);
  return (
    <>
      <IsLoading />
    </>
  );
};

export default Loading;
