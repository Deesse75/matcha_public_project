import { useContext, useEffect, useState } from 'react';
import BlockNum from './smallStats/BlockNum';
import LikerNum from './smallStats/LikerNum';
import MatchNum from './smallStats/MatchNum';
import Message from './smallStats/Message';
import Popularity from './smallStats/Popularity';
import PourcentProfile from './smallStats/PourcentProfile';
import ViewerNum from './smallStats/ViewerNum';
import { TfiLayoutMenuSeparated } from 'react-icons/tfi';
import Cookies from 'js-cookie';
import { appRoute } from '../../../components/app.configuration/path.config';
import { UserContext } from '../../../components/app.utilities/context/user.context';

const DisplaySmallStats = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const {stats, setStats} = useContext(UserContext);

  const handleClick = () => {
    setMessage('');
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = setTimeout(() => {
      setOpen(false);
    }, 3000);
    return () => clearTimeout(close);
  }, [open]);

  useEffect(() => {
    const request = async () => {
      try {
        const response = await fetch(appRoute.stats, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
        });
        const data = await response.json();
        if (response.status !== 200) {
          setMessage(data.message || response.statusText);
          return;
        }
        setStats(data.stats);
      } catch (error) {
        setMessage((error as Error).message);
      }
    };
    request();
  }, []);

  return (
    <>
      {open ? (
        <>
          <div className='module_stat_container'>
            <Popularity num={stats.popularity} />
            <ViewerNum num={stats.viewer} />
            <LikerNum num={stats.liker} />
            <MatchNum num={stats.match} />
            <BlockNum num={stats.block} />
            <PourcentProfile num={stats.pourcentProfile} />
            <Message num={stats.message} />
          </div>
        </>
      ) : (
        <>
          {message ? (
            <>
              <div>{message}</div>
            </>
          ) : (
            <>
              <div className='mini_bar' onMouseOver={handleClick}>
                <TfiLayoutMenuSeparated size={30} color={'white'} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DisplaySmallStats;
