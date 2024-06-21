import { useEffect, useState } from 'react';
import InputUser from '../../../utils/components/InputUser';
import { useNavigate } from 'react-router-dom';
import { appRoute, appRedir } from '../../app.configuration/path.config';
import { IoClose } from 'react-icons/io5';

const ReinitPassword = ({
  email,
  setNotif,
  setReinit,
}: {
  email: string;
  setNotif: React.Dispatch<React.SetStateAction<string>>;
  setReinit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.password.value) {
      setMessage(
        'Veuillez renseigner votre nouveau mot de passe ou utiliser le PassRandom pour en générer un automatiquement',
      );
      return;
    }
    if (!isValidPassword) {
      setMessage(
        "Le mot de passe est invalide, survolez les warnings pour plus d'informations",
      );
      return;
    }
    setPassword(e.currentTarget.password.value);
  };

  useEffect(() => {
    if (!password) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.reinitPassword, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: password,
            email: email,
          }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          setNotif(data?.message || response.statusText);
          setReinit(false);
          return;
        }
        setNotif(data?.message || response.statusText);
        nav(appRedir.signin);
      } catch (error) {
        setNotif((error as Error).message);
        nav(appRedir.errorServer);
      }
    };
    request();
  }, [password]);

  return (
    <>
      <div className='change_password_container'>
        <div className='close'>
          <button
            onClick={() => {
              setReinit(false);
            }}
          >
            <IoClose size={28} />
          </button>
        </div>
        <div className='title'>
          Veuillez renseigner votre nouveau mot de passe.
        </div>
        <div className='message'>{message}</div>
        <form onSubmit={handleSubmit}>
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
            value='Réinitialiser'
          />
        </form>
      </div>
    </>
  );
};

export default ReinitPassword;
