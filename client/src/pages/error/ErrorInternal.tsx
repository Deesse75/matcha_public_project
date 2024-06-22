import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../components/app.configuration/path.config';
import Cookies from 'js-cookie';

const ErrorInternal = () => {
  const nav = useNavigate();

  const handleClick = () => {
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    if (Cookies.get('session')) {
      nav(appRedir.getMe);
    } else {
      nav(appRedir.signin);
    }
  };
  return (
    <>
      <div className='page_not_found'>
        <div className='title'>ERROR interne</div>
        <div className='text'>
          Une erreur interne est survenue, veuillez réessayer.
        </div>
        <button onClick={handleClick}>Retour a l'acceuil</button>
      </div>
    </>
  );
};

export default ErrorInternal;
