import { GiMatchTip } from 'react-icons/gi';

const MatchNum = () => {
  return (
    <>
      <div className='stat'>
        <GiMatchTip size={35} />

        <div className='nbLike'>{15}</div>
      </div>
    </>
  );
};

export default MatchNum;
