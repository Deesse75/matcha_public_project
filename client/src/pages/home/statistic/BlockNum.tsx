import { FaBan } from 'react-icons/fa';

const BlockNum = () => {
  return (
    <>
      <div className='stat'>
        <FaBan size={26} />

        <div className='nbLike'>{15}</div>
      </div>
    </>
  );
};

export default BlockNum;
