import DisplayBody from './display/DisplayBody';
import DisplaySmallStats from './display/DisplaySmallStats';
import DropMenu from './lists/DropMenu';

const Home = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // Recuperer toutes les donnes de l utilisateurs
  // -Listes de profils selectionnes par Matcha
  // -La valeur de chaque stats
  return (
    <>
      <div className='home_page'>
        <div className='statistic_container'>
          <DisplaySmallStats />
        </div>
        <div className='body_container'>
          <DisplayBody />
          <DropMenu />
        </div>
      </div>
    </>
  );
};

export default Home;
