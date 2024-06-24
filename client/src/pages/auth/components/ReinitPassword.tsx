import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  appRoute,
  appRedir,
} from '../../../components/app.configuration/path.config';
import { IoClose } from 'react-icons/io5';
import { passwordValidation } from '../../../components/app.utilities/components/inputValidation';
import InputEye from '../../../components/app.utilities/components/InputEye';
import generate from '../../../components/app.utilities/components/generate';

const ReinitPassword = ({
  email,
  setNotif,
  setReinit,
}: {
  email: string;
  setNotif: React.Dispatch<React.SetStateAction<string>>;
  setReinit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const refPassword = useRef<HTMLInputElement>(null);
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
    if (!passwordValidation(e.currentTarget.password.value)) {
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
        if (!response.ok) {
          setNotif(response.statusText);
          setReinit(false);
          return;
        }

        const data = await response.json();
        if (!data || !data.token) {
          setNotif(response.statusText);
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
      <div className='reinit_container'>
        <div className='close'>
          <button
            onClick={() => {
              setReinit(false);
            }}
          >
            <IoClose size={28} style={{ color: '#020247' }} />
          </button>
        </div>
        <h1 className='title'>Réinitialisation du mot de passe.</h1>
        <div className='message'>{message}</div>
        <form className='reinit_form' onSubmit={handleSubmit}>
          <div className='input_password'>
            <input
              type='password'
              name='password'
              id='password'
              ref={refPassword}
              placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
            />
            <InputEye refInput={refPassword} />
            <div
              className='generate'
              onClick={() => {
                generate(refPassword);
              }}
            >
              Random Pass
            </div>
          </div>

          <div className='input_submit'>
            <input
              type='submit'
              name='submit'
              id='submit'
              value='Mettre à jour'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ReinitPassword;
