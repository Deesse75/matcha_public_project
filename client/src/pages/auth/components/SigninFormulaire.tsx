import { useState } from 'react';
import InputUser from '../../../utils/InputUser';

const SigninFormulaire = () => {
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidUsername || !isValidPassword) return;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputUser
          id='username'
          type='text'
          placeholder='Pseudo'
          setIsValid={setIsValidUsername}
        />
        <InputUser
          id='password'
          type='password'
          placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
          setIsValid={setIsValidPassword}
        />
        <input type="submit" name="submit" id="submit" value='Se connecter' />
      </form>
    </>
  );
};

export default SigninFormulaire;
