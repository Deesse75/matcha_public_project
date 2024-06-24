import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IsLoading from '../../components/app.utilities/components/IsLoading';
import {
  appRedir,
  appRoute,
} from '../../components/app.configuration/path.config';

const ValidateEmail = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const url = window.location.href;
  const nav = useNavigate();

  useEffect(() => {
    if (!url) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.validateEmail, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url }),
        });
        if (!response.ok) {
          setNotif(response.statusText);
          nav(appRedir.errorInternal);
          return;
        }

        const data = await response.json();
        if (!data) {
          setNotif(response.statusText);
          nav(appRedir.errorInternal);
          return;
        }
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
