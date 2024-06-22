import { IoMailOpenOutline, IoMailOutline } from 'react-icons/io5';

const Message = ({ num }: { num: number }) => {
  return (
    <>
      <div className='stat_container'>
        {num ? (
          <>
              <IoMailOutline size={35} />
              <div className='nb_stat_container'>{num}</div>
          </>
        ) : (
          <>
              <IoMailOpenOutline size={35} />
          <div className='nb_stat_container'>-</div>
          </>
        )}
      </div>
    </>
  );
};

export default Message;
