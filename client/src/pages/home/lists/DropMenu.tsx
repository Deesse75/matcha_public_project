import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { appRoute } from '../../../components/app.configuration/path.config';
import { ListContext } from '../../../components/app.utilities/context/list.context';
import List from './List';

const DropMenu = () => {
  const [matchaTab, setMatchaTab] = useState(true);
  const [viewerTab, setViewerTab] = useState(false);
  const [likerTab, setLikerTab] = useState(false);
  const [matchTab, setMatchTab] = useState(false);
  const [visitedTab, setVisitedTab] = useState(false);
  const [likedTab, setLikedTab] = useState(false);
  const [bannedTab, setBannedTab] = useState(false);
  const list = useContext(ListContext);

  const handleClick = (value: string) => {
    const tab = [
      'matchaTab',
      'viewerTab',
      'likerTab',
      'matchTab',
      'visitedTab',
      'likedTab',
      'bannedTab',
    ];
    const setters = [
      setMatchaTab,
      setViewerTab,
      setLikerTab,
      setMatchTab,
      setVisitedTab,
      setLikedTab,
      setBannedTab,
    ];
    for (const word of tab) {
      if (word === value) {
        setters[tab.indexOf(word)](true);
      } else {
        setters[tab.indexOf(word)](false);
      }
    }
  };

  useEffect(() => {
    const request = async () => {
      try {
        const response = await fetch(appRoute.getList, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
        });
        if (response.status === 200) {
        const data = await response.json();
          list.setMatchaList(data?.matchaList);
          list.setViewerList(data?.viewer);
          list.setLikerList(data?.liker);
          list.setMatchList(data?.match);
          list.setVisitedList(data?.visited);
          list.setLikedList(data?.liked);
          list.setBannedList(data?.banned);
        }
      } catch (error) {
        console.error("Erreur", error);
        return;
      }
    };
    request();
  }, []);

  return (
    <div className='drop_menu_container'>
      <div className='tab'>
        <div
          className='title'
          onClick={() => {
            handleClick('matchaTab');
          }}
        >
          Selection Matcha
        </div>
        {matchaTab && (
          <div className='content'>
            <List listName='matchaList' />
          </div>
        )}
      </div>
      <div className='tab'>
        <div
          className='title'
          onClick={() => {
            handleClick('viewerTab');
          }}
        >
          Vos visiteurs
        </div>
        {viewerTab && (
          <div className='content'>
            <List listName='viewerList' />
          </div>
        )}
      </div>
      <div className='tab'>
        <div
          className='title'
          onClick={() => {
            handleClick('likerTab');
          }}
        >
          Vos admirateurs
        </div>
        {likerTab && (
          <div className='content'>
            <List listName='likerList' />
          </div>
        )}
      </div>
      <div className='tab'>
        <div
          className='title'
          onClick={() => {
            handleClick('matchTab');
          }}
        >
          Matchs
        </div>
        {matchTab && (
          <div className='content'>
            <List listName='matchList' />
          </div>
        )}
      </div>
      <div className='tab'>
        <div
          className='title'
          onClick={() => {
            handleClick('visitedTab');
          }}
        >
          Profils visités
        </div>
        {visitedTab && (
          <div className='content'>
            <List listName='visitedList' />
          </div>
        )}
      </div>
      <div className='tab'>
        <div
          className='title'
          onClick={() => {
            handleClick('likedTab');
          }}
        >
          Profils likés
        </div>
        {likedTab && (
          <div className='content'>
            <List listName='likedList' />
          </div>
        )}
      </div>
      <div className='tab'>
        <div
          className='title'
          onClick={() => {
            handleClick('bannedTab');
          }}
        >
          Profils bloqués
        </div>
        {bannedTab && (
          <div className='content'>
            <List listName='bannedList' />
          </div>
        )}
      </div>
    </div>
  );
};

export default DropMenu;
