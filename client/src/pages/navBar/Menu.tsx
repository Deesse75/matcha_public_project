import { IoMenu } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';

const Menu = ({
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
  const handleClick = (value: string) => {
    const values = ['account', 'profile', 'chat', 'search'];
    const setters = [
      setOpenAccount,
      setOpenProfile,
      setOpenChat,
      setOpenSearch,
    ];
    for (const word of values) {
      if (word === value) {
        setters[values.indexOf(word)](true);
      } else {
        setters[values.indexOf(word)](false);
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
