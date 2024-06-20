import { IoMenu } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../app.configuration/path.config';

const Menu = () => {
  const nav = useNavigate();
  return (
    <>
      <div className='navbar_menu'>
        <div className='full_menu'>
          <button onClick={() => {}}>Accueil</button>
          <button onClick={() => {}}>Compte</button>
          <button onClick={() => {}}>Profil</button>
          <button onClick={() => {}}>Statistiques</button>
          <button onClick={() => {}}>
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
