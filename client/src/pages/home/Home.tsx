import DisplayBody from './display/DisplayBody';
import DisplaySmallStats from './display/DisplaySmallStats';
import DropMenu from './lists/DropMenu';

const Home = ({openAccount, openProfile, openChat, openSearch}: {
  openAccount: boolean;
  openProfile: boolean;
  openChat: boolean;
  openSearch: boolean;
}) => {
  return (
    <>
      <div className='home_page'>
        <div className='statistic_container'>
          <DisplaySmallStats />
        </div>
        <div className='body_container'>
          <DisplayBody
            openAccount={openAccount}
            openProfile={openProfile}
            openChat={openChat}
            openSearch={openSearch}
          />
          <DropMenu />
        </div>
      </div>
    </>
  );
};

export default Home;
