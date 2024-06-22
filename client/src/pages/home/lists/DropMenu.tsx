import { useState } from 'react';
import MatchaFilter from './MatchaFilter';

const DropMenu = () => {
  const [matchaFilter, setMatchFilter] = useState(true);
  const [viewer, setViewer] = useState(false);
  const [liker, setLiker] = useState(false);
  const [match, setMatch] = useState(false);
  const [visited, setVisited] = useState(false);
  const [liked, setLiked] = useState(false);
  const [banned, setBanned] = useState(false);

  const handleClick = (value: string) => {
    const tab = ['matchaFilter', 'viewer', 'liker', 'match', 'visited', 'liked', 'banned'];
    const setters = [setMatchFilter, setViewer, setLiker, setMatch, setVisited, setLiked, setBanned];
    for (const word of tab) {
      if (word === value) {
        setters[tab.indexOf(word)](true);
      } else {
        setters[tab.indexOf(word)](false);
      }
    }
  };

  return (
    <div className='drop_menu_container'>
      <div className='tab'>
        <div className='title' onClick={() => {handleClick('matchaFilter')}}>Selection Matcha</div>
        {matchaFilter && <div className='content'><MatchaFilter /></div>}
      </div>
      <div className='tab'>
        <div className='title' onClick={() => {handleClick('viewer')}}>Vos visiteurs</div>
       {viewer && <div className='content'>Contenu viewers</div>}
      </div>
      <div className='tab'>
        <div className='title' onClick={() => {handleClick('liker')}}>Vos admirateurs</div>
       {liker && <div className='content'></div>}
      </div>
      <div className='tab'>
        <div className='title' onClick={() => {handleClick('match')}}>Matchs</div>
       {match && <div className='content'></div>}
      </div>
      <div className='tab'>
        <div className='title' onClick={() => {handleClick('visited')}}>Profils visités</div>
       {visited && <div className='content'></div>}
      </div>
      <div className='tab'>
        <div className='title' onClick={() => {handleClick('liked')}}>Profils likés</div>
       {liked && <div className='content'></div>}
      </div>
      <div className='tab'>
        <div className='title' onClick={() => {handleClick('banned')}}>Profils bloqués</div>
       {banned && <div className='content'></div>}
      </div>
    </div>
  );
};

export default DropMenu;
