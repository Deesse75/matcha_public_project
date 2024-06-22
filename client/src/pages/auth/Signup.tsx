import { Link, useNavigate } from 'react-router-dom';
import SignBackground from './components/SignBackground';
import { appRedir } from '../../components/app.configuration/path.config';
import SignupFormulaire from './components/SignupFormulaire';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Signup = ({
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
          <h1>Inscription</h1>
          <SignupFormulaire setNotif={setNotif} />
          <div className='auth_link_redir'>
            <Link to={appRedir.signin}>Déjà un compte ? Se connecter</Link>
          </div>
          <div className='auth_link_redir'>
            <Link to={appRedir.resendEmail}>
              Recevoir un nouveau lien de confirmation d'email
            </Link>
          </div>
        </div>
        <div className='auth_bg_container'>
          <SignBackground />
        </div>
      </div>
    </>
  );
};

export default Signup;
