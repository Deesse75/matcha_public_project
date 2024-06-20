import { Link } from 'react-router-dom';
import SignBackground from './components/SignBackground';
import { appRedir } from '../app.configuration/path.config';
import SignupFormulaire from './components/SignupFormulaire';

const Signup = () => {
  return (
    <>
      <div className='auth_container'>
        <div className='sign_container'>
          <h1>Inscription</h1>
          <SignupFormulaire />
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
