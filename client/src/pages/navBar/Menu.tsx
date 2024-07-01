import { IoMenu } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { useContext } from 'react';
import { OpenPageContext } from '../../components/app.utilities/context/open.context';

const Menu = () => {
  const pages = ['accueil', 'account', 'profile', 'chat', 'search'];
  const setter = useContext(OpenPageContext);
  const setPages = [
    setter.setOpenHome,
    setter.setOpenAccount,
    setter.setOpenProfile,
    setter.setOpenChat,
    setter.setOpenSearch,
  ];

  const handleClick = (selectedPage: string) => {
    for (const str of pages) {
      if (str === selectedPage) {
        setPages[pages.indexOf(str)](true);
        setter.setOpenAccountUp(false);
        setter.setOpenProfileUp(false);
        setter.setOpenEmailUp(false);
        setter.setOpenPasswordUp(false);
      } else {
        setPages[pages.indexOf(str)](false);
      }
    }
  };

  return (
    <>
      <div className='navbar_menu'>
        <div className='full_menu'>
          <button
            onClick={() => {
              handleClick('accueil');
            }}
          >
            Accueil
          </button>
          <button
            onClick={() => {
              handleClick('account');
            }}
          >
            Compte
          </button>
          <button
            onClick={() => {
              handleClick('profile');
            }}
          >
            Profil
          </button>
          <button
            onClick={() => {
              handleClick('chat');
            }}
          >
            Chat
          </button>
          <button
            onClick={() => {
              handleClick('search');
            }}
          >
            <FaSearch />
          </button>
        </div>
        <div className='small_menu'>
          <IoMenu size={24} />
        </div>
      </div>
    </>
  );
};

export default Menu;
