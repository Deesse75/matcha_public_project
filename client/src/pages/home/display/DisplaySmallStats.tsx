import BlockNum from '../statistic/BlockNum';
import LikerNum from '../statistic/LikerNum';
import MatchNum from '../statistic/MatchNum';
import Popularity from '../statistic/Popularity';
import PourcentProfil from '../statistic/PourcentProfil';
import ViewerNum from '../statistic/ViewerNum';

const DisplaySmallStats = () => {
  return (
    <>
      <div className='small_stats'>
        <div>
          <PourcentProfil />
        </div>
        <div>
          <Popularity />
        </div>
        <div>
          <LikerNum />
        </div>
        <div>
          <MatchNum />
        </div>
        <div>
          <ViewerNum />
        </div>
        <div>
          <BlockNum />
        </div>
      </div>
    </>
  );
};

export default DisplaySmallStats;
