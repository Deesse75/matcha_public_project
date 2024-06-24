import { useContext, useRef, useState } from 'react';
import { LuSave } from 'react-icons/lu';
import { UserContext } from '../../../components/app.utilities/context/user.context';
import { nameValidation } from '../../../components/app.utilities/components/inputValidation';

const FirstnameUp = () => {
  const me = useContext(UserContext);
  const refFirstname = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    if (!refFirstname?.current?.value) {
      setMessage('Le champ est vide');
      return;
    }
    if (nameValidation(refFirstname.current.value)) {
      setMessage("Le prénom n'est pas valide");
      return;
    }
  };

  return (
    <>
      <div className='section'>
        <div className='section_name'>Prénom</div>
        <div className='section_value'>{me.user.firstname}</div>
        <input
          className='new_value'
          type='text'
          name='firstname'
          id='firstname'
          ref={refFirstname}
        />
        <div className='save' onClick={handleClick}>
          <LuSave size={24} />
        </div>
      </div>
      <div className='message'>{message}</div>
    </>
  );
};

export default FirstnameUp;
