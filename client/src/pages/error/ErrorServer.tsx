import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { appRedir } from '../app.configuration/path.config';

const ErrorServer = () => {
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
      <div className='page_error'>
        <div className='title'>ERROR SERVER</div>
        <button onClick={handleClick}>Retour</button>
      </div>
    </>
  );
};

export default ErrorServer;
