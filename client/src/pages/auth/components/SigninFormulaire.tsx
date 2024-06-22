import { useEffect, useState } from 'react';
import InputUser from '../../../components/app.utilities/components/InputUser';
import {
  appRedir,
  appRoute,
} from '../../../components/app.configuration/path.config';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SigninFormulaire = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [message, setMessage] = useState('');
  const nav = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.username.value || !e.currentTarget.password.value) {
      setMessage('Tous les champs sont requis');
      return;
    }
    if (!isValidUsername || !isValidPassword) {
      setMessage(
        "Certains champs sont invalide, survolez les warnings pour plus d'informations",
      );
      return;
    }
    setUser({
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    });
  };

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
        if (response.status !== 200) {
          if (data.redir) {
            setNotif(data?.message || response.statusText);
            nav(data.redir);
          } else setMessage(data.message);
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
      <div className='sign_formulaire'>
        <div className='message'>{message}</div>
        <form onSubmit={handleSubmit}>
          <InputUser
            id='username'
            type='text'
            placeholder='Entrez votre pseudo'
            setIsValid={setIsValidUsername}
          />
          <InputUser
            id='password'
            type='password'
            placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
            setIsValid={setIsValidPassword}
          />
          <input
            className='input_submit'
            type='submit'
            name='submit'
            id='submit'
            value='Se connecter'
          />
        </form>
      </div>
    </>
  );
};

export default SigninFormulaire;
