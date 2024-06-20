import { IoHome } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../app.configuration/path.config';
import Cookies from 'js-cookie';

const ResetSuccess = () => {
  const nav = useNavigate();

  const handleClick = () => {
    Cookies.get('session') ? nav(appRedir.getMe) : nav(appRedir.signin);
  };

  return (
    <>
      <div className='page_success'>
        <div className='title'>Mise à jour</div>
        <div className='text'>
          Votre mot de passe à été correctement modifié.
        </div>
        <button onClick={handleClick}>
          <IoHome size={28} />
        </button>
      </div>
    </>
  );
};

export default ResetSuccess;
