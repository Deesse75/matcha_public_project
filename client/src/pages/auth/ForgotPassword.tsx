import { Link, useNavigate } from 'react-router-dom';
import {
  appRedir,
  appRoute,
} from '../../components/app.configuration/path.config';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ConfirmCode from './components/ConfirmCode';
import ReinitPassword from './components/ReinitPassword';
import { emailValidation } from '../../components/app.utilities/components/inputValidation';

const ForgotPassword = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const nav = useNavigate();
  const [code, setCode] = useState(false);
  const [reinit, setReinit] = useState(true);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

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
        if (!response.ok) {
          setNotif(response.statusText);
          nav(appRedir.errorInternal);
          return;
        }

        const data = await response.json();
        if (!data) {
          setNotif(response.statusText);
          nav(appRedir.errorInternal);
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

  return (
    <>
      <div className='forgot_container'>
        <h1 className='title'>Mot de passe oublié</h1>
        <div className='message'>{message}</div>

        <form className='forgot_form' onSubmit={handleSubmit}>
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

        <div className='forgot_link'>
          <Link to={appRedir.signin}>Se connecter</Link>
        </div>
        <div className='forgot_link'>
          <Link to={appRedir.signup}>S'inscrire</Link>
        </div>

        {code && (
          <ConfirmCode
            email={email}
            setNotif={setNotif}
            setReinit={setReinit}
            setCode={setCode}
          />
        )}
        {reinit && (
          <ReinitPassword
            email={email}
            setNotif={setNotif}
            setReinit={setReinit}
          />
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
