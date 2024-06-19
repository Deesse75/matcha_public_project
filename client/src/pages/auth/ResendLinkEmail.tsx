import { Link } from "react-router-dom";
import { appRedir } from "../app.configuration/path.config";
import SignBackground from "./components/SignBackground";
import ResendEmailFormulaire from "./components/ResendEmailFormulaire";

const ResendLinkEmail = () => {
  return (
    <>
      <div className='auth_container'>
        <div className='auth_title'>
          <h1>Recevoir un nouveau lien de confirmation d'email</h1>
        </div>
        <div className='resend_container'>
          <ResendEmailFormulaire />
        </div>
        <div className='auth_link_redir'>
          <button>
            <Link to={appRedir.signin}>Se connecter</Link>
          </button>
          <button>
            <Link to={appRedir.signup}>S'inscrire</Link>
          </button>
        </div>
        <div className='auth_bg_container'>
          <SignBackground />
        </div>
      </div>
    </>
  );
};

export default ResendLinkEmail;
