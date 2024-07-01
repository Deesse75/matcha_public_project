import { Link, useNavigate } from 'react-router-dom';
import {
  appRedir,
  appRoute,
} from '../../components/app.configuration/path.config';
import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ConfirmCode from './components/ConfirmCode';
import ReinitPassword from './components/ReinitPassword';
import { emailValidation } from '../../components/app.utilities/components/inputValidation';
import { OpenPageContext } from '../../components/app.utilities/context/open.context';

const ForgotPassword = () => {
  const nav = useNavigate();
  const setNotif = useContext(OpenPageContext).setNotif;
  const [code, setCode] = useState(false);
  const [reinit, setReinit] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [reset, setReset] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.email.value) {
      setMessage('Veuillez renseigner votre adresse email');
      return;
    }
    if (!emailValidation(e.currentTarget.email.value)) {
      setMessage("L'email que vous avez entré est incorrect");
      return;
    }
    setEmail(e.currentTarget.email.value);
  };

  useEffect(() => {
    Cookies.get('matchaOn') ? null : nav(appRedir.loading);
    Cookies.get('session') ? nav(appRedir.getMe) : null;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!email) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.forgotPassword, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          setNotif(data.message || response.statusText);
          if (data.redir) nav(data.redir);
          return;
        }
        setCode(true);
      } catch (error) {
        setNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
  }, [email]);

  useEffect(() => {
    if (reinit) {
      setReset(true);
      return;
    }
    if (!reinit && reset) {
      setEmail('');
      setReset(false);
      return;
    }
  }, [reinit]);

  return (
    <>
      <div className='container'>
        <h1 className='title'>Mot de passe oublié</h1>
        <div className='message'>{message}</div>

        <form className='auth_form_mini' onSubmit={handleSubmit}>
          <div className='input_text'>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='votre.email@domaine.fr'
            />
          </div>

          <div className='input_submit'>
            <input
              type='submit'
              name='submit'
              id='submit'
              value='Recevoir un lien'
            />
          </div>
        </form>

        <div className='auth_link'>
          <Link to={appRedir.signin}>Se connecter</Link>
        </div>
        <div className='auth_link'>
          <Link to={appRedir.signup}>S'inscrire</Link>
        </div>

        {code && (
          <ConfirmCode
            email={email}
            setReinit={setReinit}
            setCode={setCode}
          />
        )}
        {reinit && (
          <ReinitPassword
            email={email}
            setReinit={setReinit}
          />
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
