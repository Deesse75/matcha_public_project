import { useEffect } from 'react';

const ErrorNotif = ({
  notif,
  setNotif,
}: {
  notif: string;
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useEffect(() => {
    const notifCount = setTimeout(() => {
      setNotif('');
    }, 3000);
    return () => {
      clearTimeout(notifCount);
    };
  }, []);

  return (
    <>
      {notif && (
        <>
          <div className='error_notif'>
            {notif}
          </div>
        </>
      )}
    </>
  );
};

export default ErrorNotif;
