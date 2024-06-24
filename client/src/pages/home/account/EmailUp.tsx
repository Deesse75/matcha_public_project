import { useContext, useRef, useState, useEffect } from "react";
import { LuSave } from "react-icons/lu";
import Cookies from "js-cookie";
import { appRoute } from "../../../components/app.configuration/path.config";
import { emailValidation } from "../../../components/app.utilities/components/inputValidation";
import { UserContext } from "../../../components/app.utilities/context/user.context";

const EmailUp = ({
  setMessage,
  setOpenCode,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setOpenCode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const me = useContext(UserContext);
  const refEmail = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');

  const handleClick = () => {
    setMessage('');
    if (!refEmail.current?.value) {
      setMessage('Le champ est vide');
      return;
    }
    if (emailValidation(refEmail.current.value)) {
      setMessage("L'adresse email n'est pas valide");
      return;
    }
    setEmail(refEmail.current.value);
  };

  useEffect(() => {
    if (!email) return;
    const request = async () => {
      try {
        const response = await fetch(appRoute.updateEmail, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          credentials: 'include',
          body: JSON.stringify({ email: email }),
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
        setOpenCode(true);
        refEmail.current?.value && (refEmail.current.value = '');
      } catch (error) {
        setMessage('Une erreur est survenue');
      }
    };
    request();
  }, [email]);

  return (
    <>
      <div className='section'>
        <div className='name'>Pseudo</div>
        <div className='current_value'>{me.user.email}</div>
        <input
          className='new_value'
          type='email'
          name='email'
          id='email'
          placeholder='Nouvelle adresse email'
          ref={refEmail}
        />
        <div className='save' onClick={handleClick}>
          <LuSave size={24} />
        </div>
      </div>
    </>
  );
};

export default EmailUp;
