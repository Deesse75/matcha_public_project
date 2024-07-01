import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  appRoute,
  appRedir,
} from '../../../components/app.configuration/path.config';
import { IoClose } from 'react-icons/io5';
import { passwordValidation } from '../../../components/app.utilities/components/inputValidation';
import InputEye from '../../../components/app.utilities/components/InputEye';
import generate from '../../../components/app.utilities/components/generate';
import { OpenPageContext } from '../../../components/app.utilities/context/open.context';

const ReinitPassword = ({
  email,
  setReinit,
}: {
  email: string;
  setReinit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const refPassword = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();
  const setNotif = useContext(OpenPageContext).setNotif;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.password.value) {
      setMessage(
        'Entrez votre nouveau mot de passe',
      );
      return;
    }
    if (!passwordValidation(e.currentTarget.password.value)) {
      setMessage(
        "Le mot de passe est invalide",
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
            newPassword: password,
            email: email,
          }),
        });
        const data = await response.json();
        if (response.status !== 200){
          setNotif(data.message || response.statusText);
          setReinit(false);
          return;
        }
        setNotif(data.message);
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
      <div className='auth_popup'>
        <div className='close'>
          <button
            onClick={() => {
              setReinit(false);
            }}
          >
            <IoClose size={28}/>
          </button>
        </div>
        <h1 className='title'>Réinitialisation</h1>
        <div className='message'>{message}</div>
        <form className='auth_form_popup' onSubmit={handleSubmit}>
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
