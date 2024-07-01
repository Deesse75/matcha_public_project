import { useNavigate } from 'react-router-dom';
import {
  appRedir,
  appRoute,
} from '../../../components/app.configuration/path.config';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const DeleteAccount = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [deleteAccount, setDeleteAccount] = useState(false);
  const nav = useNavigate();

  const handleClick = (value: string) => {
    value === 'yes' ? setDeleteAccount(true) : nav(appRedir.getMe);
  };

  useEffect(() => {
    Cookies.get('matchaOn') ? null : nav(appRedir.loading);
    // Cookies.get('session') ? null : nav(appRedir.signin);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!deleteAccount) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.deleteAccount, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
        });
        const data = await response.json();
        if (response.status !== 200) {
          setNotif(data.message || response.statusText);
          if (data.redir) nav(data.redir);
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
  }, []);

  return (
    <>
      <div className='container'>
        <div className="title">Supprimer votre compte</div>
        <div className="delete_button">
          <button onClick={() => {handleClick('yes')}}>Confirmer</button>
          <button onClick={() => {handleClick('no')}}>Annuler</button>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
