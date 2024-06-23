import { useEffect, useState } from 'react';
import Account from '../account/Account';
import Chat from '../chat/Chat';
import Profile from '../profile/Profile';
import Search from '../search/Search';

const DisplayBody = ({
  openAccount,
  openProfile,
  openChat,
  openSearch,
}: {
  openAccount: boolean;
  openProfile: boolean;
  openChat: boolean;
  openSearch: boolean;
}) => {
  const [openBody, setOpenBody] = useState(true);

  useEffect(() => {
    if (!openAccount && !openProfile && !openChat && !openSearch)
      setOpenBody(true);
    else setOpenBody(false);
  }, [openAccount, openProfile, openChat, openSearch]);

  return (
    <>
      <div className='display_body'>
        {openBody && (<div>Page d accueil</div>)}
        {openAccount && (
          <div>
            <Account />
          </div>
        )}
        {openProfile && (
          <div>
            <Profile />
          </div>
        )}
        {openChat && (
          <div>
            <Chat />
          </div>
        )}
        {openSearch && (
          <div>
            <Search />
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayBody;
