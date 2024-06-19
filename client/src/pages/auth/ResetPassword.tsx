import { Link } from "react-router-dom";
import { appRedir } from "../app.configuration/path.config";
import ResetFormulaire from "./components/ResetFormulaire";
import SignBackground from "./components/SignBackground";

const ResetPassword = () => {
  return (
    <>
      <div className='auth_container'>
        <div className='auth_title'>
          <h1>Réinitialisation du mot de passe</h1>
        </div>
        <div className='reset_container'>
          <ResetFormulaire />
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

export default ResetPassword;
