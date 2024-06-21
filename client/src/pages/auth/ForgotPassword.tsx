import { Link, useNavigate } from 'react-router-dom';
import { appRedir } from '../app.configuration/path.config';
import ForgotFormulaire from './components/ForgotFormulaire';
import SignBackground from './components/SignBackground';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ConfirmCode from './components/ConfirmCode';
import ReinitPassword from './components/ReinitPassword';

const ForgotPassword = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const nav = useNavigate();
  const [code, setCode] = useState(false);
  const [reinit, setReinit] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    Cookies.get('matchaOn') ? null : nav(appRedir.loading);
    Cookies.get('session') ? nav(appRedir.getMe) : null;
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className='auth_container'>
        <div className='sign_container'>
          <h1>Mot de passe oublié</h1>
          <ForgotFormulaire
            email={email}
            setEmail={setEmail}
            setNotif={setNotif}
            setCode={setCode}
          />
          {code && (
            <ConfirmCode
              email={email}
              setNotif={setNotif}
              setReinit={setReinit}
              setCode={setCode}
            />
          )}
          {reinit && (
            <ReinitPassword
              email={email}
              setNotif={setNotif}
              setReinit={setReinit}
            />
          )}

          <div className='auth_link_redir'>
            <Link to={appRedir.signin}>Se connecter</Link>
          </div>
          <div className='auth_link_redir'>
            <Link to={appRedir.signup}>S'inscrire</Link>
          </div>
        </div>
        <div className='auth_bg_container'>
          <SignBackground />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
