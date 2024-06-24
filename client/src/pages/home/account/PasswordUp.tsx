import { useRef, useState, useEffect } from 'react';
import { LuSave } from 'react-icons/lu';
import Cookies from 'js-cookie';
import { appRoute } from '../../../components/app.configuration/path.config';
import { passwordValidation } from '../../../components/app.utilities/components/inputValidation';

const PasswordUp = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const refNewPassword = useRef<HTMLInputElement>(null);
  const refCurrentPassword = useRef<HTMLInputElement>(null);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleClick = () => {
    setMessage('');
    if (!refNewPassword.current?.value || !refCurrentPassword.current?.value) {
      setMessage('Veuillez remplir tous les champs');
      return;
    }
    if (passwordValidation(refNewPassword.current.value)) {
      setMessage("Le mot de passe n'est pas valide");
      return;
    }
    setNewPassword(refNewPassword.current.value);
    setCurrentPassword(refCurrentPassword.current.value);
  };

  useEffect(() => {
    if (!newPassword) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.updatePassword, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          credentials: 'include',
          body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword,
          }),
        });
        if (!response.ok) {
          setMessage(response.statusText);
          return;
        }
        const data = await response.json();
        if (!data) {
          setMessage('Une erreur est survenue');
          return;
        }
        refNewPassword.current?.value && (refNewPassword.current.value = '');
        refCurrentPassword.current?.value &&
          (refCurrentPassword.current.value = '');
        setMessage(data.message);
      } catch (error) {
        setMessage('Une erreur est survenue');
      }
    };
    request();
  }, [newPassword]);

  return (
    <>
      <div className='section'>
        <div className='name'>Mot de passe</div>
        <input
          className='current_pass'
          type='password'
          name='password'
          id='password'
          placeholder='Entrez votre mot de passe actuel'
          ref={refCurrentPassword}
        />
        <input
          className='new_pass'
          type='password'
          name='password'
          id='password'
          placeholder='Entrez votre nouveau mot de passe'
          ref={refNewPassword}
        />
        <div className='save' onClick={handleClick}>
          <LuSave size={24} />
        </div>
      </div>
    </>
  );
};

export default PasswordUp;
