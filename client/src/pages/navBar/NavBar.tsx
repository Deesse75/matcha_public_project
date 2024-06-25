import { useEffect, useState } from 'react';
import Menu from './Menu';
import { appRedir } from '../../components/app.configuration/path.config';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavBar = ({
  setOpenAccount,
  setOpenProfile,
  setOpenChat,
  setOpenSearch,
}: {
  setOpenAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const nav = useNavigate();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (Cookies.get('session')) setMenu(true);
  }, []);

  const handleClick = () => {
    if (!Cookies.get('session')) {
      nav(appRedir.signin);
      return;
    } else {
      nav(appRedir.home);
    }
  };
  return (
    <>
      <div className='navbar_container'>
        <div className='title' onClick={handleClick}>
          Matcha
        </div>
        {menu && (
          <Menu
            setOpenAccount={setOpenAccount}
            setOpenProfile={setOpenProfile}
            setOpenChat={setOpenChat}
            setOpenSearch={setOpenSearch}
          />
        )}
      </div>
    </>
  );
};

export default NavBar;
