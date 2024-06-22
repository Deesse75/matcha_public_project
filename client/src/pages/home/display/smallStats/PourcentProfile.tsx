import { CgProfile } from 'react-icons/cg';


const PourcentProfile = ({ num }: { num: number }) => {
  return (
    <>
      <div className='stat_container'>
        <CgProfile size={35} />
        {num > 0 ? (
          <div className='nb_stat_container'>{num}</div>
        ) : (
          <div className='nb_stat_container'>-</div>
        )}
      </div>
    </>
  );
};

export default PourcentProfile;
