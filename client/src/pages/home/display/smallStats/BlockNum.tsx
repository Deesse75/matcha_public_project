import { FaBan } from 'react-icons/fa';

const BlockNum = ({ num }: { num: number }) => {
  return (
    <>
      <div className='stat_container'>
        <FaBan size={35} />
        {num > 0 ? (
          <div className='nb_stat_container'>{num}</div>
        ) : (
          <div className='nb_stat_container'>-</div>
        )}
      </div>
    </>
  );
};

export default BlockNum;
