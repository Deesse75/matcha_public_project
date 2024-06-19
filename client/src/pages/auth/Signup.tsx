import { Link } from 'react-router-dom';
import SignBackground from './components/SignBackground';
import { appRedir } from '../app.configuration/path.config';
import SignupFormulaire from './components/SignupFormulaire';

const Signup = () => {
  return (
    <>
      <div className='auth_container'>
        <div className='auth_title'>
          <h1>Inscription</h1>
        </div>
        <div className='signup_container'>
          <SignupFormulaire />
        </div>
        <div className='auth_link_redir'>
          <button>
            <Link to={appRedir.signin}>Déjà un compte ? Se connecter</Link>
          </button>
          <button>
            <Link to={appRedir.resendEmail}>Recevoir un nouveau lien de confirmation d'email</Link>
          </button>
        </div>
        <div className='auth_bg_container'>
          <SignBackground />
        </div>
      </div>
    </>
  );
};

export default Signup;
