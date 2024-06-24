import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { appRoute } from '../../../components/app.configuration/path.config';
import Popularity from './smallStats/Popularity';
import DisplayMiniUserInfo from './DisplayMiniUserInfo';
import DisplayPhotos from './DisplayPhotos';

export type ProfileType = {
  id: string;
  username: string;
  birthdate: string;
  gender: string;
  orientation: string;
  region: string;
  tall: number;
  physique: string;
  diet: string;
  popularity: number;
  title: string;
  bio: string;
  pourcentFill: number;
  lastConnection: string;
}
const DisplayFullProfile = ({ id }: { id: number }) => {
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState({
    id: '0',
    username: '',
    birthdate: '',
    gender: '',
    orientation: '',
    region: '',
    tall: 0,
    physique: '',
    diet: '',
    popularity: 0,
    title: '',
    bio: '',
    pourcentFill: 0,
    lastConnection: '',
  });

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
        setProfile(data.profile);
      } catch (error) {
        setMessage((error as Error).message);
        return;
      }
    };
    request();
  }, []);

  return (
    <>
      <div className='display'>
        <div className='display_top'>
          <DisplayPhotos />
          <DisplayMiniUserInfo profile={profile} />
          <Popularity num={profile.popularity} />
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
        <div>{profile.username}</div>
      </div>
    </>
  );
};

export default DisplayFullProfile;
