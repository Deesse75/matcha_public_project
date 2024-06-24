import { IoClose } from 'react-icons/io5';
import InputCode from '../../../components/app.utilities/components/InputCode';
import { useEffect, useRef, useState } from 'react';
import { appRoute } from '../../../components/app.configuration/path.config';

const ConfirmCode = ({
  email,
  setNotif,
  setReinit,
  setCode,
}: {
  email: string;
  setNotif: React.Dispatch<React.SetStateAction<string>>;
  setReinit: React.Dispatch<React.SetStateAction<boolean>>;
  setCode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [newCode, setNewCode] = useState('');
  const refInput = {
    ref1: useRef<HTMLInputElement>(null),
    ref2: useRef<HTMLInputElement>(null),
    ref3: useRef<HTMLInputElement>(null),
    ref4: useRef<HTMLInputElement>(null),
    ref5: useRef<HTMLInputElement>(null),
    ref6: useRef<HTMLInputElement>(null),
    ref7: useRef<HTMLInputElement>(null),
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    if (
      refInput.ref1.current?.value === '' ||
      refInput.ref2.current?.value === '' ||
      refInput.ref3.current?.value === '' ||
      refInput.ref4.current?.value === '' ||
      refInput.ref5.current?.value === '' ||
      refInput.ref6.current?.value === ''
    ) {
      setNotif('Le code est incorrect');
      setCode(false);
      return;
    }
    const newCode: string = `${refInput.ref1.current?.value}${refInput.ref2.current?.value}${refInput.ref3.current?.value}${refInput.ref4.current?.value}${refInput.ref5.current?.value}${refInput.ref6.current?.value}`;
    if (!newCode || newCode.length !== 6) {
      setNotif('Le code est incorrect');
      setCode(false);
      return;
    }
    setNewCode(newCode);
  };

  useEffect(() => {
    if (!newCode) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.validatePassCode, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newCode: newCode,
            email: email,
          }),
        });

        if (!response.ok) {
          setNotif(response.statusText);
          setCode(false);
          return;
        }

        const data = await response.json();
        if (!data) {
          setNotif(response.statusText);
          setCode(false);
          return;
        }

        setReinit(true);
        setCode(false);
      } catch (error) {
        setNotif((error as Error).message);
        setCode(false);
      }
    };
    request();
  }, [newCode]);

  return (
    <>
      <div className='change_password_container'>
        <div className='close'>
          <button
            onClick={() => {
              setCode(false);
            }}
          >
            <IoClose size={28} />
          </button>
        </div>
        <div className='title'>Veuillez taper le code reçu par email.</div>
        <form onSubmit={handleSubmit}>
          <div className='number'>
            <InputCode
              id={1}
              currentRef={refInput.ref1}
              nextRef={refInput.ref2}
            />
            <InputCode
              id={2}
              currentRef={refInput.ref2}
              nextRef={refInput.ref3}
            />
            <InputCode
              id={3}
              currentRef={refInput.ref3}
              nextRef={refInput.ref4}
            />
            <InputCode
              id={4}
              currentRef={refInput.ref4}
              nextRef={refInput.ref5}
            />
            <InputCode
              id={5}
              currentRef={refInput.ref5}
              nextRef={refInput.ref6}
            />
            <InputCode
              id={6}
              currentRef={refInput.ref6}
              nextRef={refInput.ref7}
            />
          </div>
          <input
            className='input_submit'
            type='submit'
            name='submit'
            id='submit'
            value='Vérifier'
          />
        </form>
      </div>
    </>
  );
};

export default ConfirmCode;
