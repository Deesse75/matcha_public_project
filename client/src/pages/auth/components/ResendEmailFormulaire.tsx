import { useState } from "react";
import InputUser from "../../../utils/InputUser";

const ResendEmailFormulaire = () => {
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isValidEmail) return;
    };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputUser
          id='email'
          type='email'
          placeholder='Adresse email'
          setIsValid={setIsValidEmail}
        />
        <input
          type='submit'
          name='submit'
          id='submit'
          value='Recevoir un lien'
        />
      </form>
    </>
  );
};

export default ResendEmailFormulaire;
