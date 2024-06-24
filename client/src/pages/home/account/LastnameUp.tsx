import { useContext, useRef, useState, useEffect } from "react";
import { LuSave } from "react-icons/lu";
import Cookies from "js-cookie";
import { appRoute } from "../../../components/app.configuration/path.config";
import { nameValidation } from "../../../components/app.utilities/components/inputValidation";
import { UserContext } from "../../../components/app.utilities/context/user.context";

const LastnameUp = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const me = useContext(UserContext);
  const refLastname = useRef<HTMLInputElement>(null);
  const [lastname, setLastname] = useState('');

  const handleClick = () => {
    setMessage('');
    if (!refLastname.current?.value) {
      setMessage('Le champ est vide');
      return;
    }
    if (nameValidation(refLastname.current.value)) {
      setMessage("Le nom n'est pas valide");
      return;
    }
    setLastname(refLastname.current.value);
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
          credentials: 'include',
          body: JSON.stringify({ lastname: lastname }),
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
        });
        refLastname.current?.value && (refLastname.current.value = '');
      } catch (error) {
        setMessage('Une erreur est survenue');
      }
    };
    request();
  }, [lastname]);

  return (
    <>
      <div className='section'>
        <div className='name'>Nom</div>
        <div className='current_value'>{me.user.lastname}</div>
        <input
          className='new_value'
          type='text'
          name='lastname'
          id='lastname'
          placeholder="Nouveau nom"
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
