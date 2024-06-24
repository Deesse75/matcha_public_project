import { Link, useNavigate } from 'react-router-dom';
import {
  appRedir,
  appRoute,
} from '../../components/app.configuration/path.config';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import InputEye from '../../components/app.utilities/components/InputEye';
import usernameValidation, {
  emailValidation,
  nameValidation,
  passwordValidation,
} from '../../components/app.utilities/components/inputValidation';
import generate from '../../components/app.utilities/components/generate';

const Signup = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const nav = useNavigate();
  const refPassword = useRef(null);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !e.currentTarget.firstname.value ||
      !e.currentTarget.lastname.value ||
      !e.currentTarget.username.value ||
      !e.currentTarget.email.value ||
      !e.currentTarget.password.value
    ) {
      setMessage('Tous les champs sont requis');
      return;
    }
    if (
      !usernameValidation(e.currentTarget.username.value) ||
      !nameValidation(e.currentTarget.firstname.value) ||
      !nameValidation(e.currentTarget.lastname.value) ||
      !emailValidation(e.currentTarget.email.value) ||
      !passwordValidation(e.currentTarget.password.value)
    ) {
      setMessage('Errue: Un ou plusieurs champs sont invalides');
      return;
    }
    setUser({
      firstname: e.currentTarget.firstname.value,
      lastname: e.currentTarget.lastname.value,
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });
  };

  useEffect(() => {
    Cookies.get('matchaOn') ? null : nav(appRedir.loading);
    Cookies.get('session') ? nav(appRedir.getMe) : null;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (
      !user.firstname ||
      !user.lastname ||
      !user.username ||
      !user.email ||
      user.password
    )
      return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.signup, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            password: user.password,
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

        setNotif(data.message);
      } catch (error) {
        setNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
  }, [user.firstname, user.lastname, user.username, user.password, user.email]);

  return (
    <>
      <div className='signup_container'>
        <h1 className='title'>Inscription</h1>
        <div className='message'>{message}</div>

        <div className='signup_form'>
          <form className='signin_form' onSubmit={handleSubmit}>
            <div className='input_text'>
              <input
                type='text'
                name='firstname'
                id='firstname'
                placeholder='Prénom'
              />
            </div>

            <div className='input_text'>
              <input
                type='text'
                name='lastname'
                id='lastname'
                placeholder='Nom'
              />
            </div>

            <div className='input_text'>
              <input
                type='text'
                name='username'
                id='username'
                placeholder="Nom d'utilisateur"
              />
            </div>

            <div className='input_text'>
              <input
                type='email'
                name='email'
                id='email'
                placeholder="votre.email@domaine.fr"
              />
            </div>

            <div className='input_password'>
              <input
                type='password'
                name='password'
                id='password'
                ref={refPassword}
                placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
              />
              <InputEye refInput={refPassword} />
              <div
                className='generate'
                onClick={() => {
                  generate(refPassword);
                }}
              >
                Random Pass
              </div>
            </div>

            <div className='input_submit'>
              <input
                type='submit'
                name='submit'
                id='submit'
                value="S'inscrire"
              />
            </div>
          </form>
        </div>
        <div className='signup_link'>
          <Link to={appRedir.signin}>Déjà un compte ? Se connecter</Link>
        </div>
        <div className='signup_link'>
          <Link to={appRedir.resendEmail}>
            Recevoir un nouveau lien de confirmation d'email
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
