import BlockNum from './BlockNum';
import LikerNum from './LikerNum';
import MatchNum from './MatchNum';
import Message from './Message';
import Popularity from './Popularity';
import PourcentProfile from './PourcentProfile';
import ViewerNum from './ViewerNum';

const Stats = () => {
  return (
    <>
      <div className='statistics_container'>
        <Popularity />
        <ViewerNum />
        <LikerNum />
        <MatchNum />
        <BlockNum />
        <PourcentProfile />
        <Message />
      </div>
    </>
  );
};

export default Stats;
