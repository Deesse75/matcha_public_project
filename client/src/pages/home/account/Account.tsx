import { useContext, useState } from 'react';
import { UserContext } from '../../../components/app.utilities/context/user.context';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../../components/app.configuration/path.config';
import AccountUp from './AccountUp';
import NewEmail from './NewEmail';

const Account = () => {
  const me = useContext(UserContext);
  const [openUp, setOpenUp] = useState(false);
  const [openCode, setOpenCode] = useState(false);
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  return (
    <>
      <div className='account_container'>
        {openUp && (
          <>
            <AccountUp
            message={message}
              setMessage={setMessage}
              setOpenUp={setOpenUp}
              setOpenCode={setOpenCode}
            />
          </>
        )}
        {openCode && (
          <>
            <NewEmail setMessage={setMessage} setOpenCode={setOpenCode} />
          </>
        )}
        <h1>Données personnelles</h1>
        <div className='section'>
          <div className='section_name'>Prénom</div>
          <div className='section_value'>{me.user.firstname}</div>
        </div>
        <div className='section'>
          <div className='section_name'>Nom</div>
          <div className='section_value'>{me.user.lastname}</div>
        </div>
        <div className='section'>
          <div className='section_name'>Pseudo</div>
          <div className='section_value'>{me.user.username}</div>
        </div>
        <div className='section'>
          <div className='section_name'>Email</div>
          <div className='section_value'>{me.user.email}</div>
        </div>
        <div className='section_button'>
          <button
            onClick={() => {
              setOpenUp(true);
            }}
          >
            Mettre à jour vos données
          </button>
          <button
            onClick={() => {
              nav(appRedir.delete);
            }}
          >
            Supprimer le compte
          </button>
        </div>
        <div className='section2'>
          <div className='section_plus'>
            <div className='section_name'>Inscrit(e) depuis le</div>
            <div className='section_value'>{me.user.createdAt}</div>
          </div>
          <div className='section_plus'>
            <div className='section_name'>Dernière modification le</div>
            <div className='section_value'>{me.user.updatedAt}</div>
          </div>
          <div className='section_plus'>
            <div className='section_name'>Dernière connexion le</div>
            <div className='section_value'>{me.user.lastConnection}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
