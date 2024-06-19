import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const InputEye = ({
  refInput,
}: {
  refInput: React.RefObject<HTMLInputElement>;
}) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleClick = () => {
    setVisiblePassword(!visiblePassword);
    if (refInput.current) {
      refInput.current.type = visiblePassword ? 'password' : 'text';
    }
  };

  return (
    <div className='div_eye' onClick={handleClick}>
      {visiblePassword ? (
        <>
          <AiOutlineEye size={26} color='#333333' />
        </>
      ) : (
        <>
          <AiOutlineEyeInvisible size={26} color='#777777' />
        </>
      )}
    </div>
  );
};

export default InputEye;
