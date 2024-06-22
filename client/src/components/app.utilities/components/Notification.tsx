import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Notification = ({
  notif,
  setNotif,
}: {
  notif: string;
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {

  useEffect(() => {
    if (!notif) return;
    const notifCount = setTimeout(() => {
      setNotif('');
    }, 5000);
    return () => {
      clearTimeout(notifCount);
    };
  }, [notif]);

  return (
    <>
      {notif && (
        <div className='notif_container'>
          <div className='notification'>
            <div
              className='close'
              onClick={() => {
                setNotif('');
              }}
            >
              <IoClose color='white' size={28} />
            </div>
            {notif}
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
