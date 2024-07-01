import { useEffect, useContext } from 'react';
import Account from '../account/Account';
import Chat from '../chat/Chat';
import Profile from '../profile/Profile';
import Search from '../search/Search';
import { OpenPageContext } from '../../../components/app.utilities/context/open.context';
import AccountUp from '../account/AccountUp';
import NewEmail from '../account/NewEmail';
import ProfileUp from '../profile/ProfileUp';

const DisplayBody = () => {
  const setter = useContext(OpenPageContext);

  useEffect(() => {
    if (
      !setter.openAccount &&
      !setter.openProfile &&
      !setter.openProfileUp &&
      !setter.openChat &&
      !setter.openSearch &&
      !setter.openAccountUp &&
      !setter.openEmailUp &&
      !setter.openPasswordUp
    )
      setter.setOpenHome(true);
    else setter.setOpenHome(false);
  }, [
    setter.openAccount,
    setter.openProfile,
    setter.openProfileUp,
    setter.openChat,
    setter.openSearch,
    setter.openAccountUp,
    setter.openEmailUp,
    setter.openPasswordUp,
  ]);

  return (
    <>
      <div className='display_body'>
        {setter.openHome && <div>Page d accueil</div>}
        {setter.openAccount && (
          <div className='display_body_container'>
            <Account />
          </div>
        )}
        {setter.openProfile && (
          <div className='display_body_container'>
            <Profile />
          </div>
        )}
        {setter.openChat && (
          <div className='display_body_container'>
            <Chat />
          </div>
        )}
        {setter.openSearch && (
          <div className='display_body_container'>
            <Search />
          </div>
        )}
        {setter.openAccountUp && (
          <>
            <div className='display_body_container'>
              <AccountUp />
            </div>
          </>
        )}
        {setter.openProfileUp && (
          <>
            <div className='display_body_container'>
              <ProfileUp />
            </div>
          </>
        )}
        {setter.openEmailUp && (
          <>
            <div className='display_body_container'>
              <NewEmail />
            </div>
          </>
        )}
        {setter.openPasswordUp && (
          <>
            <div className='display_body_container'>
              <NewPass />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DisplayBody;
