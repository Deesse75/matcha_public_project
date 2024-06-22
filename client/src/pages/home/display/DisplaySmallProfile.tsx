import { useState, useEffect } from 'react';
import Popularity from './smallStats/Popularity';
import DisplayMiniUserInfo from './DisplayMiniUserInfo';

const DisplaySmallProfile = ({ id }: { id: number }) => {
  const [info, setInfo] = useState({
    username: 'Toto',
    birthdate: '25/08/1975',
    region: 'Aquitaine',
    gender: 'Homme',
    orientation: 'Hétérosexuel(le)',
    title: 'The best humain in the world',
    popularity: 10,
    photo: '/avatar/default_avatar.jpg',
    lastConnection: '18/06/2024',
  });

  // useEffect(() => {
  //   const request = async () => {
  //     try {
  //       const response = await fetch();
  //       const data = await response.json();
  //       if (response.status !== 200) {
  //         return;
  //       }

  //     } catch(error) {};
  //   };
  //   request();
  // }, []);
  return (
    <>
      <div className='small_profile'>
        <div className='small_left'>
          <div className='photo'>
            <img
              src={info.photo}
              alt=''
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className='connected'>{info.lastConnection}</div>
        </div>

        <div className='small_right'>
          <div className='small_part_top'>
            <DisplayMiniUserInfo
              username={info.username}
              birthdate={`30 ans`}
              region={info.region}
              gender={info.gender}
              orientation={info.orientation}
            />
            <Popularity num={info.popularity} />
          </div>
          <div className='small_part_bottom'>{info.title}</div>
        </div>
      </div>
    </>
  );
};

export default DisplaySmallProfile;
