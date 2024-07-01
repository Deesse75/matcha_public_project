import { useContext, useEffect, useRef, useState } from 'react';
import { LuSave } from 'react-icons/lu';
import { UserContext } from '../../../components/app.utilities/context/user.context';
import { nameValidation } from '../../../components/app.utilities/components/inputValidation';
import { appRoute } from '../../../components/app.configuration/path.config';
import Cookies from 'js-cookie';
import { OpenPageContext } from '../../../components/app.utilities/context/open.context';

const FirstnameUp = () => {
  const me = useContext(UserContext);
  const setNotif = useContext(OpenPageContext).setNotif;
  const refFirstname = useRef<HTMLInputElement>(null);
  const [firstname, setFirstname] = useState('');

  const handleClick = () => {
    if (!refFirstname.current?.value) return;
    if (nameValidation(refFirstname.current?.value)) {
      setNotif("Le prénom n'est pas valide");
      return;
    }
    setFirstname(refFirstname.current?.value);
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
          body: JSON.stringify({ firstname: firstname }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          setFirstname('');
          setNotif(data.message || response.statusText);
          return;
        }
        me.setUser(data);
        setFirstname('');
        refFirstname.current?.value && (refFirstname.current.value = '');
      } catch (error) {
        setFirstname('');
        setNotif((error as Error).message);
      }
    };
    request();
  }, [firstname]);

  return (
    <>
      <div className='section_up'>
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
