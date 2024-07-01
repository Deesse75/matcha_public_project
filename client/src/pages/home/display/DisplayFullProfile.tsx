import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { appRoute } from '../../../components/app.configuration/path.config';
import Popularity from './smallStats/Popularity';
import DisplayMiniUserInfo from './DisplayMiniUserInfo';
import DisplayPhotos from './DisplayPhotos';
import { MiniProfile, fullProfileInitial, miniProfileInitial } from '../interfaces/profile.interfaces';

const DisplayFullProfile = ({ id }: { id: number }) => {
  const [message, setMessage] = useState('');
  const [fullProfile, setFullProfile] = useState({ ...fullProfileInitial });
  const [miniProfile, setMiniProfile] = useState<MiniProfile>({ ...miniProfileInitial });

  useEffect(() => {
    if (id <= 0) {
      setMessage('Une erreur est survenue lors de la récupération du profil');
      return;
    }
    const request = async () => {
      try {
        const response = await fetch(appRoute.getOneProfile + `?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
        });
        if (!response.ok) {
          setMessage(response.statusText);
          return;
        }
        const data = await response.json();
        if (!data) {
          setMessage('Une erreur est survenue');
          return;
        }
        setFullProfile(data.fullProfile);
        setMiniProfile({
          id: fullProfile.id,
          username: fullProfile.username,
          birthdate: fullProfile.birthdate,
          region: fullProfile.region,
          gender: fullProfile.gender,
          orientation: fullProfile.orientation,
          title: fullProfile.title,
          popularity: fullProfile.popularity,
          photo1: fullProfile.photo1,
          lastConnection: fullProfile.lastConnection,
        })
      } catch (error) {
        setMessage((error as Error).message);
        return;
      }
    };
    request();
  }, []);

  return (
    <>
      <div className='message'>{message}</div>
      <div className='display'>
        <div className='display_top'>
          {/* <DisplayPhotos /> */}
          <DisplayMiniUserInfo
            miniProfile={miniProfile}
          />
          <Popularity num={fullProfile.popularity} />
        </div>
        {/* <div className='display_middle'>
            <Bio />
            <ProfilePlus />
            <ProfileStats />
        </div>
        <div className='display_bottom'>
          <LikeButton />
          <ChatButton />
          <BlockButton />
          <NextButton />
        </div> */}
      </div>
    </>
  );
};

export default DisplayFullProfile;
