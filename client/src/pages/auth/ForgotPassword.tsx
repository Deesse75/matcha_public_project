import { Link } from "react-router-dom";
import { appRedir } from "../app.configuration/path.config";
import ForgotFormulaire from "./components/ForgotFormulaire";
import SignBackground from "./components/SignBackground";

const ForgotPassword = () => {
  return (
    <>
      <div className='auth_container'>
        <div className='auth_title'>
          <h1>Mot de passe oublié</h1>
        </div>
        <div className='forgot_container'>
          <ForgotFormulaire />
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

export default ForgotPassword;
