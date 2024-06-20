import { useEffect, useState } from 'react';
import InputUser from '../../../utils/components/InputUser';
import { appRoute, appRedir } from '../../app.configuration/path.config';
import { useNavigate } from 'react-router-dom';

const ResendEmailFormulaire = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.email.value) {
      setMessage(
        'Veuillez renseigner votre adresse email',
      );
      return;
    }
    if (!isValidEmail) {
      setMessage(
        "L'adresse email que vous avez entrée est incorrecte",
      );
      return;
    }
    setEmail(e.currentTarget.email.value);
  };

  useEffect(() => {
    if (!email) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.resendEmail, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          setMessage(data.message || response.statusText);
          if (data.redir) nav(data.redir);
          return;
        }
        nav(appRedir.signupSuccess);
      } catch (error) {
        setMessage((error as Error).message);
        nav(appRedir.errorServer);
      }
    };
    request();
  }, [email]);


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
    </>
  );
};

export default ResendEmailFormulaire;
