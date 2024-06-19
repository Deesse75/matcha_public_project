import { useRef, useState } from 'react';
import { PiWarningCircleLight } from 'react-icons/pi';
import usernameValidation, {
  emailValidation,
  nameValidation,
  passwordValidation,
} from './inputValidation';
import InputEye from './InputEye';
import generate from './generate';
import RulesInfo from './RulesInfo';

type Props = {
  id: string;
  type: string;
  placeholder: string;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
};

const InputUser = ({ id, type, placeholder, setIsValid }: Props) => {
  const refValue = useRef<HTMLInputElement>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [message, setMessage] = useState('');
  const [gen, setGen] = useState(false);
  const [rules, setRules] = useState(false);

  const handleFocus = () => {};

  const handleBlur = () => {
    let validation = false;
    if (!refValue.current?.value) return;
    if (id === 'firstname' || id === 'lastname') {
      validation = nameValidation(refValue.current.value);
    } else if (id === 'username') {
      validation = usernameValidation(refValue.current.value);
    } else if (id === 'email') {
      validation = emailValidation(refValue.current.value);
    } else if (id === 'password' || id === 'password2') {
      validation = passwordValidation(refValue.current.value);
    } else {
      setMessage('Erreur inconnue de validation');
      return;
    }
    setIsValid(validation);
    setIsInvalid(!validation);
  };

  const handleChange = () => {
    setMessage('');
    setIsValid(false);
  };

  return (
    <>
      <div className='input_user_container'>
        <div className='message'>{message}</div>
        <div className='input_container'></div>
        <input
          type={type}
          name={id}
          id={id}
          autoComplete='off'
          ref={refValue}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className='input_warning'>
          {isInvalid && (
            <PiWarningCircleLight
              size={20}
              color='red'
              onMouseOver={() => {
                setRules(true);
              }}
              onMouseLeave={() => {setRules(false);}}
            />
          )}
          {rules && (<>
          <RulesInfo id={id} />
          </>)}
        </div>
        <div className='input_eye'>
          {type === 'password' && (
            <>
              <InputEye refInput={refValue} />
            </>
          )}
        </div>
        {id === 'password2' && (
          <>
            <div className='generate'>
              <button
                onClick={() => {
                  generate(refValue);
                }}
                onMouseOver={() => {
                  setGen(true);
                }}
                onMouseLeave={() => {
                  setGen(false);
                }}
              >
                Pass
              </button>
              {gen && (
                <>
                  <div className='gen_info'>
                    Générer un mot de passe aléatoire
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InputUser;
