import { FaRegStar } from "react-icons/fa";

const Popularity = () => {
  return (
    <>
      <div className='stat'>
        <FaRegStar size={30} />
      <div className="nbStar">{10}</div>
      </div>
    </>
  );
};

export default Popularity;
