import { useContext, useRef, useState, useEffect } from "react";
import { LuSave } from "react-icons/lu";
import Cookies from "js-cookie";
import { appRoute } from "../../../components/app.configuration/path.config";
import usernameValidation from "../../../components/app.utilities/components/inputValidation";
import { UserContext } from "../../../components/app.utilities/context/user.context";

const UsernameUp = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const me = useContext(UserContext);
  const refUsername = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState('');

  const handleClick = () => {
    setMessage('');
    if (!refUsername.current?.value) {
      setMessage('Le champ est vide');
      return;
    }
    if (usernameValidation(refUsername.current.value)) {
      setMessage("Le nom d'utilisateur n'est pas valide");
      return;
    }
    setUsername(refUsername.current.value);
  };

  useEffect(() => {
    if (!username) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.updateUsername, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          credentials: 'include',
          body: JSON.stringify({ username: username }),
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
        refUsername.current?.value && (refUsername.current.value = '');
      } catch (error) {
        setMessage('Une erreur est survenue');
      }
    };
    request();
  }, [username]);

  return (
    <>
      <div className='section'>
        <div className='name'>Pseudo</div>
        <div className='current_value'>{me.user.username}</div>
        <input
          className='new_value'
          type='text'
          name='username'
          id='username'
          placeholder="Nouveau pseudo"
          ref={refUsername}
        />
        <div className='save' onClick={handleClick}>
          <LuSave size={24} />
        </div>
      </div>
    </>
  );
};

export default UsernameUp;
