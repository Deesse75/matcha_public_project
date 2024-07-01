import { Link, useNavigate } from 'react-router-dom';
import {
  appRedir,
  appRoute,
} from '../../components/app.configuration/path.config';
import { useContext, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import InputEye from '../../components/app.utilities/components/InputEye';
import usernameValidation, {
  passwordValidation,
} from '../../components/app.utilities/components/inputValidation';
import { OpenPageContext } from '../../components/app.utilities/context/open.context';

const Signin = () => {
  const nav = useNavigate();
  const setNotif = useContext(OpenPageContext).setNotif;
  const refPassword = useRef(null);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    if (!e.currentTarget.username.value || !e.currentTarget.password.value) {
      setMessage('Tous les champs sont requis');
      return;
    }
    if (
      !usernameValidation(e.currentTarget.username.value) ||
      !passwordValidation(e.currentTarget.password.value)
    ) {
      setMessage("Nom d'utilisateur ou mot de passe invalide");
      return;
    }
    setUser({
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    });
  };

  useEffect(() => {
    Cookies.get('matchaOn') ? null : nav(appRedir.loading);
    Cookies.get('session') ? nav(appRedir.getMe) : null;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!user.username || !user.password) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.signin, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user.username,
            password: user.password,
          }),
        });

        const data = await response.json();
        if (response.status !== 200 || !data.token) {
          setNotif(data.message || response.statusText);
          setUser({ username: '', password: '' });
          if (data.redir) nav(data.redir);
          return;
        }
        Cookies.set('session', data.token, { expires: 1 });
        nav(appRedir.getMe);
      } catch (error) {
        setNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
  }, [user.username, user.password]);

  return (
    <>
      <div className='container'>
        <h1 className='title'>Connexion</h1>
        <div className='message'>{message}</div>

        <form className='auth_form' onSubmit={handleSubmit}>
          <div className='input_text'>
            <input
              type='text'
              name='username'
              id='username'
              autoComplete='username'
              placeholder="Nom d'utilisateur"
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
          </div>

          <div className='input_submit'>
            <input
              type='submit'
              name='submit'
              id='submit'
              value='Se connecter'
            />
          </div>
        </form>
        <div className='auth_link'>
          <Link to={appRedir.signup}>S'inscrire</Link>
        </div>
        <div className='auth_link'>
          <Link to={appRedir.forgotPassword}>Mot de passe oublié</Link>
        </div>
      </div>
    </>
  );
};

export default Signin;
