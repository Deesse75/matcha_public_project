import { Link, useNavigate } from 'react-router-dom';
import {
  appRedir,
  appRoute,
} from '../../components/app.configuration/path.config';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { emailValidation } from '../../components/app.utilities/components/inputValidation';

const ResendLinkEmail = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.email.value) {
      setMessage('Veuillez renseigner votre adresse email');
      return;
    }
    if (!emailValidation(e.currentTarget.email.value)) {
      setMessage("L'adresse email que vous avez entrée est incorrecte");
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
        const response = await fetch(appRoute.resendEmail, {
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

        setNotif(data?.message || response.statusText);
        nav(appRedir.signin);
      } catch (error) {
        setNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
  }, [email]);

  return (
    <>
      <div className='resend_container'>
        <h1 className='title'>
          Recevoir un nouveau lien de confirmation d'email
        </h1>
        <div className='message'>{message}</div>

        <form className='resend_form' onSubmit={handleSubmit}>
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
        <div className='resend_link'>
          <Link to={appRedir.signin}>Se connecter</Link>
        </div>
        <div className='resend_link'>
          <Link to={appRedir.signup}>S'inscrire</Link>
        </div>
      </div>
    </>
  );
};

export default ResendLinkEmail;
