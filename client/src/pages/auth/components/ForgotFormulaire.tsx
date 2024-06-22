import { useEffect, useState } from 'react';
import InputUser from '../../../components/app.utilities/components/InputUser';
import {
  appRoute,
  appRedir,
} from '../../../components/app.configuration/path.config';
import { useNavigate } from 'react-router-dom';

const ForgotFormulaire = ({
  email,
  setEmail,
  setNotif,
  setCode,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setNotif: React.Dispatch<React.SetStateAction<string>>;
  setCode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.email.value) {
      setMessage('Veuillez renseigner votre adresse email');
      return;
    }
    if (!isValidEmail) {
      setMessage("L'email que vous avez entré est incorrect");
      return;
    }
    setEmail(e.currentTarget.email.value);
  };

  useEffect(() => {
    if (!email) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.forgotPassword, {
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
          if (data.redir) {
            setNotif(data?.message || response.statusText);
            nav(data.redir);
          } else setMessage(data.message);
          return;
        }
        setCode(true);
      } catch (error) {
        setNotif((error as Error).message);
        nav(appRedir.errorInternal);
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

export default ForgotFormulaire;
