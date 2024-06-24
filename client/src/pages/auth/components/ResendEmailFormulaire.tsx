import { useEffect, useState } from 'react';
import InputUser from '../../../components/app.utilities/components/InputUser';
import {
  appRoute,
  appRedir,
} from '../../../components/app.configuration/path.config';
import { useNavigate } from 'react-router-dom';

const ResendEmailFormulaire = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const nav = useNavigate();


  return (
    <>
      <div className='resend_container'>
        <div className='message'>{message}</div>
      </div>
    </>
  );
};

export default ResendEmailFormulaire;
