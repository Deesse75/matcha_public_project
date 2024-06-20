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
      return;
    }
    setIsValid(validation);
    setIsInvalid(!validation);
  };

  const handleChange = () => {
    setIsValid(false);
  };

  return (
    <>
      <div className='input_user_container'>
        <div className='input_container'>
          <input
          className='input_user'
            type={type}
            name={id}
            id={id}
            placeholder={placeholder}
            autoComplete='off'
            ref={refValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {id === 'password2' && (
            <>
              <div
                className='generate'
                onClick={() => {
                  generate(refValue);
                }}
              >
                Random Pass
              </div>
            </>
          )}
          {type === 'password' && (
            <>
              <div className='input_eye'>
                <InputEye refInput={refValue} />
              </div>
            </>
          )}

          <div className='input_warning'>
            {isInvalid && (
              <PiWarningCircleLight
                size={26}
                color='#640202'
                onMouseOver={() => {
                  setRules(true);
                }}
                onMouseLeave={() => {
                  setRules(false);
                }}
              />
            )}
            {rules && (
              <>
                <RulesInfo id={id} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InputUser;
