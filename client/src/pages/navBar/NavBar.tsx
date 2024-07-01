import { useEffect, useState } from 'react';
import Menu from './Menu';
import { appRedir } from '../../components/app.configuration/path.config';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavBar = () => {
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
        <div className='navbar_container2'>
          <div className='title' onClick={handleClick}>
            Matcha
          </div>
        </div>
        {menu && <Menu />}
      </div>
    </>
  );
};

export default NavBar;
