import { useState } from 'react';
import InputUser from '../../../utils/components/InputUser';
import ConfirmCode from './ConfirmCode';

const ForgotFormulaire = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail) return;
  };

  return (
    <>
      <div className='sign_formulaire'>
        <div className='message'>{message}</div>
        <form onSubmit={handleSubmit}>
          <InputUser
            id='email'
            type='email'
            placeholder='Adresse email'
            setIsValid={setIsValidEmail}
          />
          <input
            className='input_submit'
            type='submit'
            name='submit'
            id='submit'
            value='Recevoir un lien'
          />
        </form>
      </div>
      {code && (
        <>
          <ConfirmCode code={code} setCode={setCode} />
        </>
      )}
    </>
  );
};

export default ForgotFormulaire;
