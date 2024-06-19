import { useState } from 'react';
import InputUser from '../../../utils/InputUser';

const ResetFormulaire = () => {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidPassword) return;
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputUser
          id='password2'
          type='password'
          placeholder='Entrez votre nouveau mot de passe'
          setIsValid={setIsValidPassword}
        />
        <input
          type='submit'
          name='submit'
          id='submit'
          value='Réinitialiser'
        />
      </form>
    </>
  );
};

export default ResetFormulaire;
