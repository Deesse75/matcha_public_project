import { useContext, useEffect, useRef, useState } from 'react';
import { LuSave } from 'react-icons/lu';
import { UserContext } from '../../../components/app.utilities/context/user.context';
import { nameValidation } from '../../../components/app.utilities/components/inputValidation';
import { appRoute } from '../../../components/app.configuration/path.config';
import Cookies from 'js-cookie';

const FirstnameUp = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const me = useContext(UserContext);
  const refFirstname = useRef<HTMLInputElement>(null);
  const [firstname, setFirstname] = useState('');

  const handleClick = () => {
    setMessage('');
    if (!refFirstname.current?.value) {
      setMessage('Le champ est vide');
      return;
    }
    if (nameValidation(refFirstname.current.value)) {
      setMessage("Le prénom n'est pas valide");
      return;
    }
    setFirstname(refFirstname.current.value);
  };

  useEffect(() => {
    if (!firstname) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.updateFirstname, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          credentials: 'include',
          body: JSON.stringify({ firstname: firstname }),
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
        me.userDispatch({
          type: 'SET_USER_ON',
          payload: data.user,
        })
        refFirstname.current?.value && (refFirstname.current.value = '');
      } catch (error) {
        setMessage('Une erreur est survenue');
      }
    };
    request();
  }, [firstname]);

  return (
    <>
      <div className='section'>
        <div className='name'>Prénom</div>
        <div className='current_value'>{me.user.firstname}</div>
        <input
          className='new_value'
          type='text'
          name='firstname'
          id='firstname'
          placeholder='Nouveau prénom'
          ref={refFirstname}
        />
        <div className='save' onClick={handleClick}>
          <LuSave size={24} />
        </div>
      </div>
    </>
  );
};

export default FirstnameUp;
