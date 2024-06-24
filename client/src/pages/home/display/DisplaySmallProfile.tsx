import Popularity from './smallStats/Popularity';
import DisplayMiniUserInfo from './DisplayMiniUserInfo';
import { ListType } from '../../../components/app.utilities/context/list.context';

const DisplaySmallProfile = ({ profile }: { profile: ListType }) => {
  return (
    <>
      <div className='small_profile'>
        <div className='small_left'>
          <div className='photo'>
            <img
              src={profile.photo}
              alt='Photo de profil'
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className='connected'>{profile.lastConnection}</div>
        </div>

        <div className='small_right'>
          <div className='small_part_top'>
            <DisplayMiniUserInfo
              username={profile.username}
              birthdate={`30 ans`}
              region={profile.region}
              gender={profile.gender}
              orientation={profile.orientation}
            />
            <Popularity num={profile.popularity} />
          </div>
          <div className='small_part_bottom'>{profile.title}</div>
        </div>
      </div>
    </>
  );
};

export default DisplaySmallProfile;
