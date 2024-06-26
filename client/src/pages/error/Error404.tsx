import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../components/app.configuration/path.config';

const Error404 = () => {
  const nav = useNavigate();

  const handleClick = () => {
    Cookies.get('session') ? nav(appRedir.getMe) : nav(appRedir.signin);
  };

  return (
    <>
      <div className='page_not_found'>
        <div className='title'>ERROR 404 - PAGE NOT FOUND</div>
        <div className='text'>
          La page que vous tentez d'ouvrir est indisponible ou n'existe pas{' '}
        </div>
        <button onClick={handleClick}>Retour a l'acceuil</button>
      </div>
    </>
  );
};

export default Error404;
