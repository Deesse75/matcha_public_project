import { useEffect, useState } from 'react';
import InputUser from '../../../utils/components/InputUser';
import { useNavigate } from 'react-router-dom';
import { appRoute, appRedir } from '../../app.configuration/path.config';
import Cookies from 'js-cookie';

const ResetFormulaire = () => {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();
  const resetToken = Cookies.get('reset');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.password.value) {
      setMessage(
        'Veuillez renseigner votre nouveau mot de passe ou utiliser le PassRandom pour en générer un automatiquement',
      );
      return;
    }
    if (!isValidPassword) {
      setMessage("Le mot de passe est invalide, survolez les warnings pour plus d'informations");
      return;
    }
    setPassword(e.currentTarget.password.value);
  };

  useEffect(() => {
    if (!password) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.reset, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: password,
            resetToken: resetToken,
          }),
        });
        const data = await response.json();
        Cookies.remove('reset');
        if (response.status !== 200) {
          setMessage(data.message || response.statusText);
          if (data.redir) nav(data.redir);
          return;
        }
        nav(appRedir.resetSuccess);
      } catch (error) {
        setMessage((error as Error).message);
        nav(appRedir.errorServer);
      }
    };
    request();
  }, [password]);

  return (
    <>
      <div className='sign_formulaire'>
        <div className='message'>{message}</div>
        <form onSubmit={handleSubmit}>
          <InputUser
            id='password2'
            type='password'
            placeholder='Entrez votre nouveau mot de passe'
            setIsValid={setIsValidPassword}
          />
          <input
            className='input_submit'
            type='submit'
            name='submit'
            id='submit'
            value='Réinitialiser'
          />
        </form>
      </div>
    </>
  );
};

export default ResetFormulaire;
