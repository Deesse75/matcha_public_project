import { FcLike } from 'react-icons/fc';

const LikerNum = () => {
  return (
    <>
      <div className='stat'>
        <FcLike size={30} />
        <div className="nbLike">{15}</div>
      </div>
    </>
  );
};

export default LikerNum;
