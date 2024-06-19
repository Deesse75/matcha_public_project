import { IoClose } from 'react-icons/io5';
import { appRedir } from '../../app.configuration/path.config';
import { useNavigate } from 'react-router-dom';
import InputCode from '../../../utils/InputCode';
import { useRef } from 'react';

const ConfirmCode = ({
  code,
  setCode,
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const nav = useNavigate();
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
  };

  return (
    <>
      <div
        className='close'
        onClick={() => {
          setCode('');
        }}
      >
        <IoClose size={24} />
      </div>
      <div className='title'>Veuillez taper le code reçu par email.</div>
      <div className='number'>
        <form onSubmit={handleSubmit}>
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
          <input type='submit' name='submit' id='submit' value='Vérifier' />
        </form>
      </div>
    </>
  );
};

export default ConfirmCode;
