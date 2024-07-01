import { useContext, useEffect, useState } from 'react';
import BlockNum from './smallStats/BlockNum';
import LikerNum from './smallStats/LikerNum';
import MatchNum from './smallStats/MatchNum';
import Message from './smallStats/Message';
import Popularity from './smallStats/Popularity';
import PourcentProfile from './smallStats/PourcentProfile';
import ViewerNum from './smallStats/ViewerNum';
import { TfiLayoutMenuSeparated } from 'react-icons/tfi';
import { UserContext } from '../../../components/app.utilities/context/user.context';

const DisplaySmallStats = () => {
  const [open, setOpen] = useState(false);
  const me = useContext(UserContext);

  const handleOver = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = setTimeout(() => {
      setOpen(false);
    }, 3000);
    return () => clearTimeout(close);
  }, [open]);


  return (
    <>
      {open ? (
        <>
          <div className='module_stat_container'>
            <Popularity num={me.stats.popularity} />
            <ViewerNum num={me.stats.viewer} />
            <LikerNum num={me.stats.liker} />
            <MatchNum num={me.stats.match} />
            <BlockNum num={me.stats.block} />
            <PourcentProfile num={me.stats.pourcentProfile} />
            <Message num={me.stats.message} />
          </div>
        </>
      ) : (
        <>
          <div className='mini_bar' onMouseOver={handleOver}>
            <TfiLayoutMenuSeparated size={26} color={'black'} />
          </div>
        </>
      )}
    </>
  );
};

export default DisplaySmallStats;
