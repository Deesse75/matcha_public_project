import MatchaFilter from './lists/MatchaFilter';
import DisplaySmallStats from './display/DisplaySmallStats';

const Dashboard = () => {
  // Recuperer toutes les donnes de l utilisateurs
  // -Listes de profils selectionnes par Matcha
  // -La valeur de chaque stats
  return (
    <>
      <MatchaFilter />
      <DisplaySmallStats />
    </>
  );
};

export default Dashboard;
