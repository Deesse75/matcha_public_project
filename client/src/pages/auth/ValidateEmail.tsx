import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IsLoading from '../../utils/components/IsLoading';
import { appRedir, appRoute } from '../app.configuration/path.config';

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
        const data = await response.json();
        setNotif(data?.message || response.statusText);
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
