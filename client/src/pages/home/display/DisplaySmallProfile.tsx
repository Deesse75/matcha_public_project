import Popularity from './smallStats/Popularity';
import DisplayMiniUserInfo from './DisplayMiniUserInfo';
import { MiniProfile } from '../interfaces/profile.interfaces';

const DisplaySmallProfile = ({ miniProfile }: { miniProfile: MiniProfile }) => {
  return (
    <>
      <div className='small_profile'>
        <div className='small_left'>
          <div className='photo'>
            <img
              src={miniProfile.photo1}
              alt='Photo de profil'
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className='connected'>{miniProfile.lastConnection}</div>
        </div>

        <div className='small_right'>
          <div className='small_part_top'>
            <DisplayMiniUserInfo miniProfile={miniProfile} />
            <Popularity num={miniProfile.popularity} />
          </div>
          <div className='small_part_bottom'>{miniProfile.title}</div>
        </div>
      </div>
    </>
  );
};

export default DisplaySmallProfile;
