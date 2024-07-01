import { useContext } from 'react';
import { UserContext } from '../../../components/app.utilities/context/user.context';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../../components/app.configuration/path.config';
import { OpenPageContext } from '../../../components/app.utilities/context/open.context';

const Account = () => {
  const me = useContext(UserContext);
  const nav = useNavigate();
  const setter = useContext(OpenPageContext);

  return (
    <>
      <h1 className='display_title'>Données personnelles</h1>
      <div className='account'>
        <div className='section'>
          <div className='section_name'>Prénom :</div>
          <div className='section_value'>{me.user.firstname}</div>
        </div>
        <div className='section'>
          <div className='section_name'>Nom :</div>
          <div className='section_value'>{me.user.lastname}</div>
        </div>
        <div className='section'>
          <div className='section_name'>Pseudo :</div>
          <div className='section_value'>{me.user.username}</div>
        </div>
        <div className='section'>
          <div className='section_name'>Email :</div>
          <div className='section_value'>{me.user.email}</div>
        </div>
        <div className='section_button'>
          <button
            onClick={() => {
              setter.setOpenAccountUp(true);
              setter.setOpenAccount(false);
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
