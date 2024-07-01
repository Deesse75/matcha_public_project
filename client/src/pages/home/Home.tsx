import DisplaySmallStats from './display/DisplaySmallStats';
import DropMenu from './lists/DropMenu';
import DisplayBody from './display/DisplayBody';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../components/app.configuration/path.config';

const Home = () => {
  const nav = useNavigate();

  useEffect(() => {
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    if (!Cookies.get('session')) {
      nav(appRedir.signout);
      return;
    }
  }, []);
  return (
    <>
      <div className='home_page'>
        <div className='statistic_container'>
          <DisplaySmallStats />
        </div>
        <div className='home_body_container'>
          <DisplayBody />
          <DropMenu />
        </div>
      </div>
    </>
  );
};

export default Home;
