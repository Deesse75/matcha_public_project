import { Link } from "react-router-dom";
import SignBackground from "./components/SignBackground";
import SigninFormulaire from "./components/SigninFormulaire";
import { appRedir } from "../app.configuration/path.config";

const Signin = () => {
  return (
    <>
      <div className='auth_container'>
        <div className='auth_title'>
          <h1>Connexion</h1>
        </div>
        <div className='signin_container'>
          <SigninFormulaire />
        </div>
        <div className='auth_link_redir'>
          <button>
            <Link to={appRedir.signup}>S'inscrire</Link>
          </button>
          <button>
            <Link to={appRedir.forgot}>Mot de passe oublié</Link>
          </button>
        </div>
        <div className='auth_bg_container'>
          <SignBackground />
        </div>
      </div>
    </>
  );
};

export default Signin;
