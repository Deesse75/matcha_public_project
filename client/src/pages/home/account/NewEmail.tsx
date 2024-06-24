import { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import { appRoute } from "../../../components/app.configuration/path.config";
import InputCode from "../../../components/app.utilities/components/InputCode";

const NewEmail = ({
  setMessage,
  setOpenCode,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setOpenCode: React.Dispatch<React.SetStateAction<boolean>>;
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
      setMessage('Le code est incorrect');
      setOpenCode(false);
      return;
    }
    const newCode: string = `${refInput.ref1.current?.value}${refInput.ref2.current?.value}${refInput.ref3.current?.value}${refInput.ref4.current?.value}${refInput.ref5.current?.value}${refInput.ref6.current?.value}`;
    if (!newCode || newCode.length !== 6) {
      setMessage('Le code est incorrect');
      setOpenCode(false);
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
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({
            newCode: newCode,
          }),
        });

        if (!response.ok) {
          setMessage(response.statusText);
          setOpenCode(false);
          return;
        }

        const data = await response.json();
        if (!data) {
          setMessage(response.statusText);
          setOpenCode(false);
          return;
        }
        setMessage(data.message);
        setOpenCode(false);
      } catch (error) {
        setMessage((error as Error).message);
        setOpenCode(false);
      }
    };
    request();
  }, [newCode]);

  return (
    <>
      <div className='receive_code_container'>
        <div className='close'>
          <button
            onClick={() => {
              setOpenCode(false);
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

export default NewEmail;
