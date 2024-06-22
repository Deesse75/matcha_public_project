import { FcLike } from 'react-icons/fc';

const LikerNum = ({ num }: { num: number }) => {
  return (
    <>
      <div className='stat_container'>
        <FcLike size={35} />
        {num > 0 ? (
          <div className='nb_stat_container'>{num}</div>
        ) : (
          <div className='nb_stat_container'>-</div>
        )}
      </div>
    </>
  );
};

export default LikerNum;
