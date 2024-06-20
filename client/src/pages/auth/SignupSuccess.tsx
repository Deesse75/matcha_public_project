import { useNavigate } from 'react-router-dom';
import { appRedir } from '../app.configuration/path.config';
import { IoHome } from 'react-icons/io5';

const SignupSuccess = () => {
  const nav = useNavigate();

  return (
    <>
      <div className='page_success'>
        <div className='title'>Attente de validation</div>
        <div className='text'>
          Afin de valider votre inscription merci de vérifier votre boite mails,
          un lien vous a été envoyé.
        </div>
        <button
          onClick={() => {
            nav(appRedir.signin);
          }}
        >
          <IoHome size={28} />
        </button>
        <button
          onClick={() => {
            nav(appRedir.resendEmail);
          }}
        >
          Recevoir un nouveau lien
        </button>
      </div>
    </>
  );
};

export default SignupSuccess;
