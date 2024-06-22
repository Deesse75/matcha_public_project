import { useEffect, useState } from 'react';
import BlockNum from './smallStats/BlockNum';
import LikerNum from './smallStats/LikerNum';
import MatchNum from './smallStats/MatchNum';
import Message from './smallStats/Message';
import Popularity from './smallStats/Popularity';
import PourcentProfile from './smallStats/PourcentProfile';
import ViewerNum from './smallStats/ViewerNum';
import { TfiLayoutMenuSeparated } from 'react-icons/tfi';

const DisplaySmallStats = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
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
            <Popularity num={0} />
            <ViewerNum num={1500} />
            <LikerNum num={1} />
            <MatchNum num={2} />
            <BlockNum num={56} />
            <PourcentProfile num={25} />
            <Message num={3} />
          </div>
        </>
      ) : (
        <>
          <div
            className='mini_bar'
            onMouseOver={handleClick}
          >
            <TfiLayoutMenuSeparated size={30} color={'white'} />
          </div>
        </>
      )}
    </>
  );
};

export default DisplaySmallStats;
