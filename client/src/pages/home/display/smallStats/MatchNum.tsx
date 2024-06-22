import { GiMatchTip } from 'react-icons/gi';

const MatchNum = ({ num }: { num: number }) => {
  return (
    <>
      <div className='stat_container'>
        <GiMatchTip size={35} />
        {num > 0 ? (
          <div className='nb_stat_container'>{num}</div>
        ) : (
          <div className='nb_stat_container'>-</div>
        )}
      </div>
    </>
  );
};

export default MatchNum;
