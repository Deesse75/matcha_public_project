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
    <div className='eye_container' onClick={handleClick}>
      {visiblePassword ? (
        <>
          <AiOutlineEye size={26} color='#020247' />
        </>
      ) : (
        <>
          <AiOutlineEyeInvisible size={26} color='#473B02' />
        </>
      )}
    </div>
  );
};

export default InputEye;
