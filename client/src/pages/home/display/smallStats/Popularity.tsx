import { FaRegStar } from "react-icons/fa";

const Popularity = ({num}: {num: number}) => {
  return (
    <>
      <div className='stat_container'>
        <FaRegStar size={35} />
        {num > 0 ? (
          <div className='nb_stat_container'>{num}</div>
        ) : (
          <div className='nb_stat_container'>-</div>
        )}
      </div>
    </>
  );
};

export default Popularity;
