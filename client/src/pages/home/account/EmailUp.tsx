import { useContext, useRef, useState, useEffect } from 'react';
import { LuSave } from 'react-icons/lu';
import Cookies from 'js-cookie';
import { appRoute } from '../../../components/app.configuration/path.config';
import { UserContext } from '../../../components/app.utilities/context/user.context';
import { emailValidation } from '../../../components/app.utilities/components/inputValidation';

const EmailUp = () => {
  const me = useContext(UserContext);
  const refEmail = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleClick = () => {
    setMessage('');
    if (!refEmail.current?.value) return;
    if (emailValidation(refEmail.current?.value)) {
      setMessage("L'adresse email n'est pas valide");
      return;
    }
    setEmail(refEmail.current?.value);
  };

  useEffect(() => {
    if (!email) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.updateEmail, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ email: email }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          setEmail('');
          setMessage('Une erreur interne est survenue');
          return;
        }
        setEmail('');
        setEmailUp(true);
        refEmail.current?.value && (refEmail.current.value = '');
      } catch (error) {
        setEmail('');
        setMessage('Une erreur interne est survenue');
      }
    };
    request();
  }, [email]);

  return (
    <>
      <div className='section_up'>
        <div className='name'>Email</div>
        <div className='current_value'>{me.user.email}</div>
        <input
          className='new_value'
          type='text'
          name='email'
          id='email'
          placeholder='Nouvelle asresse email'
          ref={refEmail}
        />
        <div className='save' onClick={handleClick}>
          <LuSave size={24} />
        </div>
      </div>
    </>
  );
};

export default EmailUp;
