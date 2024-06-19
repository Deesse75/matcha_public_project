import { useState } from 'react';
import InputUser from '../../../utils/InputUser';

const SignupFormulaire = () => {
  const [isValidFirstname, setIsValidFirstname] = useState(false);
  const [isValidLastname, setIsValidLastname] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !isValidFirstname ||
      !isValidLastname ||
      !isValidUsername ||
      !isValidEmail ||
      !isValidPassword
    )
      return;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputUser
          id='firstname'
          type='text'
          placeholder='Prénom'
          setIsValid={setIsValidFirstname}
        />
        <InputUser
          id='lastname'
          type='text'
          placeholder='Nom'
          setIsValid={setIsValidLastname}
        />
        <InputUser
          id='username'
          type='text'
          placeholder='Pseudo'
          setIsValid={setIsValidUsername}
        />
        <InputUser
          id='email'
          type='email'
          placeholder='Adresse email'
          setIsValid={setIsValidEmail}
        />
        <InputUser
          id='password2'
          type='password'
          placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
          setIsValid={setIsValidPassword}
        />
        <input type='submit' name='submit' id='submit' value="S'inscrire" />
      </form>
    </>
  );
};

export default SignupFormulaire;
