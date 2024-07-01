import { useContext, useRef, useState, useEffect } from "react";
import { LuSave } from "react-icons/lu";
import Cookies from "js-cookie";
import { appRoute } from "../../../components/app.configuration/path.config";
import { nameValidation } from "../../../components/app.utilities/components/inputValidation";
import { UserContext } from "../../../components/app.utilities/context/user.context";

const LastnameUp = () => {
  const me = useContext(UserContext);
  const refLastname = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [lastname, setLastname] = useState('');

  const handleClick = () => {
    setMessage('');
    if (!refLastname.current?.value) return;
    if (nameValidation(refLastname.current?.value)) {
      setMessage("Le nom n'est pas valide");
      return;
    }
    setLastname(refLastname.current?.value);
  };

  useEffect(() => {
    if (!lastname) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.updateLastname, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ lastname: lastname }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          setLastname('');
          setMessage('Une erreur interne est survenue');
          return;
        }
        me.setUser(data);
        setLastname('');
        refLastname.current?.value && (refLastname.current.value = '');
      } catch (error) {
        setLastname('');
        setMessage('Une erreur interne est survenue');
      }
    };
    request();
  }, [lastname]);

  return (
    <>
      <div className='section_up'>
        <div className='name'>Nom</div>
        <div className='current_value'>{me.user.lastname}</div>
        <input
          className='new_value'
          type='text'
          name='lastname'
          id='lastname'
          placeholder='Nouveau nom'
          ref={refLastname}
        />
        <div className='save' onClick={handleClick}>
          <LuSave size={24} />
        </div>
      </div>
    </>
  );
};

export default LastnameUp;
