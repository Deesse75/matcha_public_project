import { useRef, useState, useEffect } from 'react';
import { LuSave } from 'react-icons/lu';
import Cookies from 'js-cookie';
import { appRoute } from '../../../components/app.configuration/path.config';
import { passwordValidation } from '../../../components/app.utilities/components/inputValidation';
import InputEye from '../../../components/app.utilities/components/InputEye';
import generate from '../../../components/app.utilities/components/generate';
import { FaRandom } from 'react-icons/fa';

const PasswordUp = () => {
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
      <div className='section_up'>
        <div className='name'>Mot de passe</div>
        <div className='pass_section'>
          <div className='pass'>
            <input
              type='password'
              name='password'
              id='password'
              ref={refCurrentPassword}
              placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
            />
            <InputEye refInput={refCurrentPassword} />
          </div>
          <div className='pass'>
            <input
              type='password'
              name='password'
              id='password'
              ref={refNewPassword}
              placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
            />
            <div
              className='generate'
              onClick={() => {
                generate(refNewPassword);
              }}
            >
              <FaRandom size={18} />
            </div>
            <InputEye refInput={refNewPassword} />
          </div>
        </div>
        <div className='save' onClick={handleClick}>
          <LuSave size={24} />
        </div>
      </div>
    </>
  );
};

export default PasswordUp;
