import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { appRoute } from '../../../components/app.configuration/path.config';

const DisplayFullProfile = ({ id }: { id: number }) => {
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState({
    id: '0',
    username: '',
    birthdate: '',
    gender: '',
    orientation: '',
    region: '',
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
        const data = await response.json();
        if (response.status !== 200) {
          setMessage(data?.message || response.statusText);
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
        CECI EST LE PROFIL DE 
        <div>{profile.username}</div>
      </div>
    </>
  );
};

export default DisplayFullProfile;
