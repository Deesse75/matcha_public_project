import { useState } from 'react';
import { IoMailOpenOutline, IoMailOutline } from 'react-icons/io5';

const Message = () => {
  const [nbNotif, setNbNotif] = useState(0);
  return (
    <>
      <div className='chat_notif_container'>
        {nbNotif ? (
          <>
            <div className='notif_on'>
              <IoMailOutline size={28} />
              <div className='notif_num'>{nbNotif}</div>
            </div>
          </>
        ) : (
          <>
            <div className='notif_off'>
              <IoMailOpenOutline size={28} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Message;
