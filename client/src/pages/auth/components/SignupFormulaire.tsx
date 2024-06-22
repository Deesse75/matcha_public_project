import { useEffect, useState } from 'react';
import InputUser from '../../../components/app.utilities/components/InputUser';
import {
  appRedir,
  appRoute,
} from '../../../components/app.configuration/path.config';
import { useNavigate } from 'react-router-dom';

const SignupFormulaire = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isValidFirstname, setIsValidFirstname] = useState(false);
  const [isValidLastname, setIsValidLastname] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [message, setMessage] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const nav = useNavigate();
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
      !isValidFirstname ||
      !isValidLastname ||
      !isValidUsername ||
      !isValidEmail ||
      !isValidPassword
    ) {
      setMessage(
        "Certains champs sont invalide, survolez les warnings pour plus d'informations",
      );
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
        const data = await response.json();
        if (response.status !== 201) {
          if (data.redir) {
            setNotif(data?.message || response.statusText);
            nav(data.redir);
          } else setMessage(data.message);
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
  }, [user.firstname, user.lastname, user.username, user.password, user.email]);

  return (
    <>
      <div className='sign_formulaire'>
        <div className='message'>{message}</div>
        <form onSubmit={handleSubmit}>
          <InputUser
            id='firstname'
            type='text'
            placeholder='Prénom'
            setIsValid={setIsValidFirstname}
          />
          <InputUser
            id='lastname'
            type='text'
            placeholder='Nom'
            setIsValid={setIsValidLastname}
          />
          <InputUser
            id='username'
            type='text'
            placeholder='Pseudo'
            setIsValid={setIsValidUsername}
          />
          <InputUser
            id='email'
            type='email'
            placeholder='Adresse email'
            setIsValid={setIsValidEmail}
          />
          <InputUser
            id='password2'
            type='password'
            placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
            setIsValid={setIsValidPassword}
          />
          <input
            className='input_submit'
            type='submit'
            name='submit'
            id='submit'
            value="S'inscrire"
          />
        </form>
      </div>
    </>
  );
};

export default SignupFormulaire;
