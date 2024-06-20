import { useEffect, useState } from 'react';
import InputUser from '../../../utils/components/InputUser';

const SigninFormulaire = () => {
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [message, setMessage] = useState('');
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
    if (!user.username || user.password) return;
    const request = async () => {

    };
    request();
  }, [user.password, user.username]);

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
