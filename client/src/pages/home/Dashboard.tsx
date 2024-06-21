import DropMenu from './lists/DropMenu';
import MatchaFilter from './lists/MatchaFilter';
import Stats from './statistic/Stats';

const Dashboard = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // Recuperer toutes les donnes de l utilisateurs
  // -Listes de profils selectionnes par Matcha
  // -La valeur de chaque stats
  return (
    <>
    <div className="dashboard">
      <Stats />
      <div className="list_container">
      <MatchaFilter />
      <DropMenu />
      </div>
    </div>
    </>
  );
};

export default Dashboard;
