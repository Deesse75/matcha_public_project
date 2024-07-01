import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../components/app.configuration/path.config';
import IsLoading from '../../components/app.utilities/components/IsLoading';
import { appRoute } from '../../components/app.configuration/path.config';
import Cookies from 'js-cookie';
import { useState, useEffect, useContext } from 'react';
import { OpenPageContext } from '../../components/app.utilities/context/open.context';

const Loading = () => {
  const nav = useNavigate();
  const [url, setUrl] = useState('');
  const setNotif = useContext(OpenPageContext).setNotif;

  useEffect(() => {
    Cookies.remove('matchaOn');
    const request = async () => {
      try {
        const response = await fetch(appRoute.init);
        if (!response.ok) {
          setNotif(`Une erreur interne est survenue: ${response.statusText}`);
          nav(appRedir.errorInternal);
          return;
        }
        const data = await response.json();
        Cookies.set('matchaOn', '35135435sdfg64643gerer1334634343s54d654', {
          expires: 1,
        });
        if (data.ip) Cookies.set('IP', data.ip, { expires: 1 });
        Cookies.get('session') ? nav(appRedir.getMe) : nav(appRedir.signin);
      } catch (error) {
        setNotif(`Une erreur est survenue: ${(error as Error).message}`);
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

