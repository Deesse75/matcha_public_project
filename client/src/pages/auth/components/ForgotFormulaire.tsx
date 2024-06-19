import { useState } from 'react';
import InputUser from '../../../utils/InputUser';
import ConfirmCode from './ConfirmCode';

const ForgotFormulaire = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('j');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail) return;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputUser
          id='email'
          type='email'
          placeholder='Adresse email'
          setIsValid={setIsValidEmail}
        />
        <input
          type='submit'
          name='submit'
          id='submit'
          value='Recevoir un lien'
        />
      </form>
      {code && (
        <>
          <div className='confirm_code_container'>
            <ConfirmCode code={code} setCode={setCode} />
          </div>
        </>
      )}
    </>
  );
};

export default ForgotFormulaire;
