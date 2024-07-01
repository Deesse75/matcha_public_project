import { useContext, useRef, useState, useEffect } from "react";
import { LuSave } from "react-icons/lu";
import Cookies from "js-cookie";
import { appRoute } from "../../../components/app.configuration/path.config";
import { UserContext } from "../../../components/app.utilities/context/user.context";
import usernameValidation from "../../../components/app.utilities/components/inputValidation";

const UsernameUp = () => {
  const me = useContext(UserContext);
  const refUsername = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  const handleClick = () => {
    setMessage('');
    if (!refUsername.current?.value) return;
    if (usernameValidation(refUsername.current?.value)) {
      setMessage("Le prénom n'est pas valide");
      return;
    }
    setUsername(refUsername.current?.value);
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
          body: JSON.stringify({ username: username }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          setUsername('');
          setMessage('Une erreur interne est survenue');
          return;
        }
        me.setUser(data);
        setUsername('');
        refUsername.current?.value && (refUsername.current.value = '');
      } catch (error) {
        setUsername('');
        setMessage('Une erreur interne est survenue');
      }
    };
    request();
  }, [username]);

  return (
    <>
      <div className='section_up'>
        <div className='name'>Pseudo</div>
        <div className='current_value'>{me.user.username}</div>
        <input
          className='new_value'
          type='text'
          name='username'
          id='username'
          placeholder='Nouveau pseudo'
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
