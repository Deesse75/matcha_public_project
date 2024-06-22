import { ImEye } from 'react-icons/im';

const ViewerNum = ({ num }: { num: number }) => {
  return (
    <>
      <div className='stat_container'>
        <ImEye size={35} />
        {num > 0 ? (
          <div className='nb_stat_container'>{num}</div>
        ) : (
          <div className='nb_stat_container'>-</div>
        )}
      </div>
    </>
  );
};

export default ViewerNum;
