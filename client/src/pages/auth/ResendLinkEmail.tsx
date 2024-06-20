import { Link } from 'react-router-dom';
import { appRedir } from '../app.configuration/path.config';
import SignBackground from './components/SignBackground';
import ResendEmailFormulaire from './components/ResendEmailFormulaire';

const ResendLinkEmail = () => {
  return (
    <>
      <div className='auth_container'>
        <div className='sign_container'>
          <h1>Recevoir un nouveau lien de confirmation d'email</h1>
          <ResendEmailFormulaire />
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

export default ResendLinkEmail;
