import { Link, useNavigate } from 'react-router-dom';
import SignBackground from './components/SignBackground';
import SigninFormulaire from './components/SigninFormulaire';
import { appRedir } from '../../components/app.configuration/path.config';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Signin = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const nav = useNavigate();

  useEffect(() => {
    Cookies.get('matchaOn') ? null : nav(appRedir.loading);
    Cookies.get('session') ? nav(appRedir.getMe) : null;
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className='auth_container'>
        <div className='sign_container'>
          <h1>Connexion</h1>
          <SigninFormulaire setNotif={setNotif} />
          <div className='auth_link_redir'>
            <Link to={appRedir.signup}>S'inscrire</Link>
          </div>
          <div className='auth_link_redir'>
            <Link to={appRedir.forgotPassword}>Mot de passe oublié</Link>
          </div>
        </div>
        <div className='auth_bg_container'>
          <SignBackground />
        </div>
      </div>
    </>
  );
};

export default Signin;
