import { Link } from 'react-router-dom';
import { appRedir } from '../app.configuration/path.config';
import ForgotFormulaire from './components/ForgotFormulaire';
import SignBackground from './components/SignBackground';

const ForgotPassword = () => {
  return (
    <>
      <div className='auth_container'>
        <div className='sign_container'>
          <h1>Mot de passe oublié</h1>
          <ForgotFormulaire />
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
