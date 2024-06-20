import { useState } from 'react';
import InputUser from '../../../utils/components/InputUser';

const ResetFormulaire = () => {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidPassword) return;
  };
  return (
    <>
      <div className='sign_formulaire'>
        <div className='message'>{message}</div>
        <form onSubmit={handleSubmit}>
          <InputUser
            id='password2'
            type='password'
            placeholder='Entrez votre nouveau mot de passe'
            setIsValid={setIsValidPassword}
          />
          <input
            className='input_submit'
            type='submit'
            name='submit'
            id='submit'
            value='Réinitialiser'
          />
        </form>
      </div>
    </>
  );
};

export default ResetFormulaire;
