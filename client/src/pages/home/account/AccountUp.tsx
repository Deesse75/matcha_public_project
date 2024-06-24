import EmailUp from './EmailUp';
import FirstnameUp from './FirstnameUp';
import LastnameUp from './LastnameUp';
import PasswordUp from './PasswordUp';
import UsernameUp from './UsernameUp';
import { IoClose } from 'react-icons/io5';

const AccountUp = ({
  message,
  setMessage,
  setOpenUp,
  setOpenCode,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setOpenUp: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className='accountUp_container'>
        <div className='close'>
          <button
            onClick={() => {
              setOpenUp(false);
            }}
          >
            <IoClose size={28} />
          </button>
        </div>
        <h1>Mise à jour de vos données</h1>
        <div className='message'>{message}</div>
        <FirstnameUp setMessage={setMessage} />
        <LastnameUp setMessage={setMessage} />
        <UsernameUp setMessage={setMessage} />
        <EmailUp setOpenCode={setOpenCode} setMessage={setMessage} />
        <PasswordUp setMessage={setMessage} />
      </div>
    </>
  );
};

export default AccountUp;
