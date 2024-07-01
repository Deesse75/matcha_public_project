import { useContext } from 'react';
import EmailUp from './EmailUp';
import FirstnameUp from './FirstnameUp';
import LastnameUp from './LastnameUp';
import PasswordUp from './PasswordUp';
import UsernameUp from './UsernameUp';
import { OpenPageContext } from '../../../components/app.utilities/context/open.context';

const AccountUp = () => {
  const setter = useContext(OpenPageContext);

  return (
    <>
        <h1 className='display_title'>Mise à jour de vos données</h1>
        <div className='account'>
          <FirstnameUp />
          <LastnameUp />
          <UsernameUp />
          <EmailUp />
          <PasswordUp />
          <div className='section_button'>
            <button
              onClick={() => {
                setter.setOpenAccountUp(false);
                setter.setOpenAccount(true);
              }}
            >
              Retour
            </button>
          </div>
        </div>
    </>
  );
};

export default AccountUp;
